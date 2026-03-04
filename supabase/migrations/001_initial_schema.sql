CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE patients (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name  VARCHAR(100) NOT NULL
               CHECK (char_length(full_name) >= 2 AND full_name ~ '^[a-zA-Z\s''\-\.]+$'),
  email      VARCHAR(255) NOT NULL
               CHECK (email ~* '^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$'),
  phone      VARCHAR(20) NOT NULL CHECK (phone ~ '^\+?[1-9]\d{9,14}$'),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE appointments (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id       UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  service_type     VARCHAR(100) NOT NULL
                     CHECK (service_type IN ('general','cosmetic','implants','invisalign','emergency','cleaning','whitening')),
  appointment_date DATE NOT NULL CHECK (appointment_date >= CURRENT_DATE),
  appointment_time TIME NOT NULL,
  status           VARCHAR(20) NOT NULL DEFAULT 'pending'
                     CHECK (status IN ('pending','confirmed','cancelled','completed')),
  notes            TEXT CHECK (char_length(notes) <= 1000),
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE time_slots (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slot_date      DATE NOT NULL,
  slot_time      TIME NOT NULL,
  is_booked      BOOLEAN NOT NULL DEFAULT false,
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  UNIQUE (slot_date, slot_time)
);

CREATE TABLE clinic_settings (
  id                 UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clinic_name        VARCHAR(200) NOT NULL DEFAULT 'My Dental Clinic',
  tagline            VARCHAR(300),
  address            TEXT,
  phone              VARCHAR(20),
  email              VARCHAR(255),
  google_maps_url    TEXT,
  business_hours     JSONB NOT NULL DEFAULT '{
    "monday":    {"open":"09:00","close":"17:00","closed":false},
    "tuesday":   {"open":"09:00","close":"17:00","closed":false},
    "wednesday": {"open":"09:00","close":"17:00","closed":false},
    "thursday":  {"open":"09:00","close":"17:00","closed":false},
    "friday":    {"open":"09:00","close":"17:00","closed":false},
    "saturday":  {"open":"09:00","close":"13:00","closed":false},
    "sunday":    {"open":"09:00","close":"13:00","closed":true}
  }',
  notification_email BOOLEAN DEFAULT true,
  updated_at         TIMESTAMPTZ DEFAULT NOW()
);
INSERT INTO clinic_settings (clinic_name) VALUES ('My Dental Clinic');

-- RLS
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE clinic_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin manages patients"    ON patients    FOR ALL    USING (auth.role() = 'authenticated');
CREATE POLICY "Public inserts patient"    ON patients    FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin manages appts"       ON appointments FOR ALL   USING (auth.role() = 'authenticated');
CREATE POLICY "Public books appt"         ON appointments FOR INSERT WITH CHECK (status = 'pending');
CREATE POLICY "Public reads slots"        ON time_slots  FOR SELECT USING (true);
CREATE POLICY "Admin manages slots"       ON time_slots  FOR ALL    USING (auth.role() = 'authenticated');
CREATE POLICY "Admin manages settings"    ON clinic_settings FOR ALL USING (auth.role() = 'authenticated');

CREATE INDEX idx_appts_date     ON appointments(appointment_date);
CREATE INDEX idx_appts_status   ON appointments(status);
CREATE INDEX idx_appts_patient  ON appointments(patient_id);
CREATE INDEX idx_slots_date     ON time_slots(slot_date);
CREATE INDEX idx_patients_email ON patients(email);
