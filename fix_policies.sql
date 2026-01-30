-- DROP existing policies to ensure a clean slate and avoid conflicts
DROP POLICY IF EXISTS "Allow public read access" ON site_settings;
DROP POLICY IF EXISTS "Allow authenticated update" ON site_settings;
DROP POLICY IF EXISTS "Allow public update" ON site_settings;
DROP POLICY IF EXISTS "Allow public insert" ON site_settings;

DROP POLICY IF EXISTS "Allow public insert" ON contact_messages;
DROP POLICY IF EXISTS "Allow authenticated select" ON contact_messages;
DROP POLICY IF EXISTS "Allow public select" ON contact_messages;

-- Create tables if they don't exist ensures this script is idempotent
CREATE TABLE IF NOT EXISTS site_settings (
  key VARCHAR(255) PRIMARY KEY,
  value TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- NEW PERMISSIVE POLICIES (No Authentication Required for Demo)

-- 1. Site Settings Policies
CREATE POLICY "Enable read access for all users" ON site_settings
    FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON site_settings
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" ON site_settings
    FOR UPDATE USING (true);

-- 2. Contact Messages Policies
CREATE POLICY "Enable insert access for all users" ON contact_messages
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON contact_messages
    FOR SELECT USING (true);
