-- ─────────────────────────────────────────────────────────────────────────────
-- SEO Settings Migration
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ─────────────────────────────────────────────────────────────────────────────

-- The site_settings table already exists. We just INSERT default SEO values
-- using ON CONFLICT DO NOTHING so existing values are preserved.

-- ── Home Page ────────────────────────────────────────────────────────────────
INSERT INTO site_settings (key, value) VALUES
  ('seo_home_title',       'Best Real Estate Agent in Pimpri Chinchwad, PCMC')
ON CONFLICT (key) DO NOTHING;

INSERT INTO site_settings (key, value) VALUES
  ('seo_home_description', 'Real Abodes is Pimpri Chinchwad''s most trusted real estate agent. Explore premium residential & commercial properties in PCMC, Pune. Expert guidance, transparent deals.')
ON CONFLICT (key) DO NOTHING;

INSERT INTO site_settings (key, value) VALUES
  ('seo_home_keywords',    'real estate Pimpri Chinchwad, property in PCMC, flats in Pimpri, apartments Chinchwad, real estate agent Pune, buy home PCMC')
ON CONFLICT (key) DO NOTHING;

-- ── Projects Page ─────────────────────────────────────────────────────────────
INSERT INTO site_settings (key, value) VALUES
  ('seo_projects_title',       'Properties & Projects – Browse Real Estate in PCMC')
ON CONFLICT (key) DO NOTHING;

INSERT INTO site_settings (key, value) VALUES
  ('seo_projects_description', 'Browse premium residential and commercial projects in Pimpri Chinchwad, Pune. Filter by location, budget, and type to find your perfect home with Real Abodes.')
ON CONFLICT (key) DO NOTHING;

INSERT INTO site_settings (key, value) VALUES
  ('seo_projects_keywords',    'properties in Pimpri Chinchwad, new projects PCMC, flats for sale Pune, residential plots PCMC, commercial property Pimpri')
ON CONFLICT (key) DO NOTHING;

-- ── About Page ────────────────────────────────────────────────────────────────
INSERT INTO site_settings (key, value) VALUES
  ('seo_about_title',       'About Us – Our Story & Mission')
ON CONFLICT (key) DO NOTHING;

INSERT INTO site_settings (key, value) VALUES
  ('seo_about_description', 'Learn about Real Abodes – Pimpri Chinchwad''s most trusted real estate agency. Meet our team, discover our values, and understand why thousands of families trust us for their dream homes.')
ON CONFLICT (key) DO NOTHING;

INSERT INTO site_settings (key, value) VALUES
  ('seo_about_keywords',    'about Real Abodes, real estate agency Pimpri Chinchwad, PCMC property experts, trusted real estate agent Pune')
ON CONFLICT (key) DO NOTHING;

-- ── Contact Page ──────────────────────────────────────────────────────────────
INSERT INTO site_settings (key, value) VALUES
  ('seo_contact_title',       'Contact Us – Get in Touch')
ON CONFLICT (key) DO NOTHING;

INSERT INTO site_settings (key, value) VALUES
  ('seo_contact_description', 'Contact Real Abodes today. Visit our office in Pimpri Chinchwad, call us, or send a message. Our experts are ready to help you find your perfect property in PCMC, Pune.')
ON CONFLICT (key) DO NOTHING;

INSERT INTO site_settings (key, value) VALUES
  ('seo_contact_keywords',    'contact Real Abodes, real estate agent contact Pimpri Chinchwad, property inquiry PCMC Pune')
ON CONFLICT (key) DO NOTHING;

-- ── Blog Page ─────────────────────────────────────────────────────────────────
INSERT INTO site_settings (key, value) VALUES
  ('seo_blog_title',       'Real Estate Blog – Tips, Guides & Market Insights')
ON CONFLICT (key) DO NOTHING;

INSERT INTO site_settings (key, value) VALUES
  ('seo_blog_description', 'Read the Real Abodes blog for the latest real estate tips, property buying guides, market trends, and insights for homebuyers in Pimpri Chinchwad and Pune.')
ON CONFLICT (key) DO NOTHING;

INSERT INTO site_settings (key, value) VALUES
  ('seo_blog_keywords',    'real estate blog, property buying guide, PCMC market insights, home buying tips Pune, real estate news Pimpri Chinchwad')
ON CONFLICT (key) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- Verify the inserts (run this after the above to confirm)
-- ─────────────────────────────────────────────────────────────────────────────
-- SELECT key, value FROM site_settings WHERE key LIKE 'seo_%' ORDER BY key;
