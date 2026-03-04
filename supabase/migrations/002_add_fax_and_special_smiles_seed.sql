-- Add fax to clinic_settings
ALTER TABLE clinic_settings ADD COLUMN IF NOT EXISTS fax VARCHAR(20);

-- Seed Special Smiles, Ltd. contact info (update existing row)
UPDATE clinic_settings SET
  clinic_name = 'Special Smiles, Ltd.',
  tagline = 'Comprehensive oral healthcare for individuals with intellectual, psychological or developmental disabilities who require general anesthesia.',
  address = '2301 E. Allegheny Avenue, Suite 120, Philadelphia, PA 19134',
  phone = '+12676396250',
  fax = '267-639-6270',
  email = 'front.desk@specialsmilesltd.com',
  business_hours = '{
    "monday":    {"open":"07:00","close":"15:30","closed":false},
    "tuesday":   {"open":"07:00","close":"15:30","closed":false},
    "wednesday": {"open":"07:00","close":"15:30","closed":false},
    "thursday":  {"open":"07:00","close":"15:30","closed":false},
    "friday":    {"open":"07:00","close":"15:30","closed":false},
    "saturday":  {"open":"09:00","close":"13:00","closed":true},
    "sunday":    {"open":"09:00","close":"13:00","closed":true}
  }'::jsonb,
  updated_at = NOW()
WHERE id = (SELECT id FROM clinic_settings LIMIT 1);
