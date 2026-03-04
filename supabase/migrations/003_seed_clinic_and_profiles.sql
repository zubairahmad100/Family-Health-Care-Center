-- 003: Profiles, clinic staff link, and auto-add new users to clinic
-- Clinic data is already seeded in 002 (Special Smiles). This migration adds
-- user profiles and links authenticated users to the clinic.

-- Ensure clinic exists with app data (idempotent: update single row from 001/002)
INSERT INTO clinic_settings (
  clinic_name,
  tagline,
  address,
  phone,
  fax,
  email,
  google_maps_url,
  business_hours,
  notification_email,
  updated_at
SELECT
  'Special Smiles, Ltd.',
  'Comprehensive oral healthcare for individuals with intellectual, psychological or developmental disabilities who require general anesthesia.',
  '2301 E. Allegheny Avenue, Suite 120, Philadelphia, PA 19134',
  '+12676396250',
  '267-639-6270',
  'front.desk@specialsmilesltd.com',
  NULL,
  '{
    "monday":    {"open":"07:00","close":"15:30","closed":false},
    "tuesday":   {"open":"07:00","close":"15:30","closed":false},
    "wednesday": {"open":"07:00","close":"15:30","closed":false},
    "thursday":  {"open":"07:00","close":"15:30","closed":false},
    "friday":    {"open":"07:00","close":"15:30","closed":false},
    "saturday":  {"open":"09:00","close":"13:00","closed":true},
    "sunday":    {"open":"09:00","close":"13:00","closed":true}
  }'::jsonb,
  true,
  NOW()
WHERE NOT EXISTS (
  SELECT 1
  FROM clinic_settings
  WHERE clinic_name = 'Special Smiles, Ltd.'
    AND address = '2301 E. Allegheny Avenue, Suite 120, Philadelphia, PA 19134'
);

-- Profiles: one row per auth user (synced from auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name  VARCHAR(200),
  email      VARCHAR(255),
  role       VARCHAR(50) NOT NULL DEFAULT 'staff'
    CHECK (role IN ('admin','staff','viewer')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Link users to clinic(s); new users are added via trigger below
CREATE TABLE IF NOT EXISTS clinic_staff (
  id                 UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id            UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  clinic_settings_id  UUID NOT NULL REFERENCES clinic_settings(id) ON DELETE CASCADE,
  role               VARCHAR(50) NOT NULL DEFAULT 'staff'
    CHECK (role IN ('admin','staff','viewer')),
  created_at         TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, clinic_settings_id)
);

CREATE INDEX IF NOT EXISTS idx_clinic_staff_user    ON clinic_staff(user_id);
CREATE INDEX IF NOT EXISTS idx_clinic_staff_clinic ON clinic_staff(clinic_settings_id);

-- RLS for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow insert for own profile (used by handle_new_user trigger on signup)
CREATE POLICY "Insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);
-- Allow service role to insert (e.g. backfill or API)
CREATE POLICY "Service role insert profile"
  ON profiles FOR INSERT
  TO service_role
  WITH CHECK (true);

-- RLS for clinic_staff
ALTER TABLE clinic_staff ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own clinic staff rows"
  ON clinic_staff FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role manages clinic staff"
  ON clinic_staff FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Function: create profile and add new user to default clinic
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  default_clinic_id UUID;
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.email,
    'staff'
  );

  SELECT id INTO default_clinic_id FROM public.clinic_settings LIMIT 1;
  IF default_clinic_id IS NOT NULL THEN
    INSERT INTO public.clinic_staff (user_id, clinic_settings_id, role)
    VALUES (NEW.id, default_clinic_id, 'staff')
    ON CONFLICT (user_id, clinic_settings_id) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;

-- Trigger: run when a new auth user is created (signup)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Optional: backfill existing auth users into profiles and clinic (run once)
-- Uncomment and run manually if you already have users before this migration:
/*
INSERT INTO public.profiles (id, full_name, email, role)
SELECT id, COALESCE(raw_user_meta_data->>'full_name', split_part(email, '@', 1)), email, 'staff'
FROM auth.users
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  email = EXCLUDED.email,
  updated_at = NOW();

INSERT INTO public.clinic_staff (user_id, clinic_settings_id, role)
SELECT u.id, (SELECT id FROM public.clinic_settings LIMIT 1), 'staff'
FROM auth.users u
ON CONFLICT (user_id, clinic_settings_id) DO NOTHING;
*/
