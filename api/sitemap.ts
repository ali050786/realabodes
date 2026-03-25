import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const BASE_URL = 'https://realabodes.in';

// Static pages with their SEO priority and update frequency
const STATIC_PAGES = [
  { url: '/',         changefreq: 'weekly',  priority: '1.0' },
  { url: '/projects', changefreq: 'weekly',  priority: '0.9' },
  { url: '/blog',     changefreq: 'weekly',  priority: '0.8' },
  { url: '/about',    changefreq: 'monthly', priority: '0.7' },
  { url: '/contact',  changefreq: 'monthly', priority: '0.7' },
];

function toW3CDate(dateStr?: string): string {
  if (!dateStr) return new Date().toISOString().split('T')[0];
  try {
    return new Date(dateStr).toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

function buildSitemap(
  projects: { slug: string; updated_at?: string }[],
  blogs: { slug: string; updated_at?: string; date?: string }[]
): string {
  const today = new Date().toISOString().split('T')[0];

  const staticUrls = STATIC_PAGES.map(
    page => `
  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  ).join('');

  const projectUrls = projects.map(
    p => `
  <url>
    <loc>${BASE_URL}/project/${p.slug}</loc>
    <lastmod>${toW3CDate(p.updated_at)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  ).join('');

  const blogUrls = blogs.map(
    b => `
  <url>
    <loc>${BASE_URL}/blog/${b.slug}</loc>
    <lastmod>${toW3CDate(b.updated_at || b.date)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
  ).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${staticUrls}
${projectUrls}
${blogUrls}
</urlset>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const supabaseUrl  = process.env.VITE_SUPABASE_URL  || process.env.SUPABASE_URL  || '';
    const supabaseKey  = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

    if (!supabaseUrl || !supabaseKey) {
      // Fallback: return static-only sitemap if env vars not available
      const staticSitemap = buildSitemap([], []);
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
      return res.status(200).send(staticSitemap);
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch slugs from DB — only published/active entries
    const [{ data: projects }, { data: blogs }] = await Promise.all([
      supabase
        .from('projects')
        .select('slug, updated_at')
        .order('updated_at', { ascending: false }),
      supabase
        .from('blogs')
        .select('slug, updated_at, date')
        .eq('published', true)
        .order('updated_at', { ascending: false }),
    ]);

    const sitemap = buildSitemap(projects || [], blogs || []);

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    // Cache for 1 hour — fresh enough for new posts, cheap for Google
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    return res.status(200).send(sitemap);

  } catch (error) {
    console.error('Sitemap generation error:', error);
    // Return a minimal valid sitemap on error rather than crashing
    const fallback = buildSitemap([], []);
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    return res.status(200).send(fallback);
  }
}
