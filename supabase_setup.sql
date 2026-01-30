-- Create a table for site settings (key-value pairs)
CREATE TABLE IF NOT EXISTS site_settings (
  key VARCHAR(255) PRIMARY KEY,
  value TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert default contact email setting if it doesn't exist
INSERT INTO site_settings (key, value)
VALUES ('contact_email', 'admin@example.com')
ON CONFLICT (key) DO NOTHING;

-- Create a table for contact form submissions
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new', -- new, read, replied
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policies for site_settings
-- Allow everyone to read settings (public)
CREATE POLICY "Allow public read access" ON site_settings
  FOR SELECT USING (true);

-- Allow everyone to update settings (for development without auth)
CREATE POLICY "Allow public update" ON site_settings
  FOR UPDATE USING (true);

-- Allow everyone to insert settings (upsert needs insert permission)
CREATE POLICY "Allow public insert" ON site_settings
  FOR INSERT WITH CHECK (true);

-- Policies for contact_messages
-- Allow public to insert messages (submitting the form)
CREATE POLICY "Allow public insert" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Allow everyone to view messages (for admin view without auth)
CREATE POLICY "Allow public select" ON contact_messages
  FOR SELECT USING (true);
