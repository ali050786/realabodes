import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://realabodes.in';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;
const SITE_NAME = 'Real Abodes';

export const DEFAULT_SEO_DESCRIPTION =
  "Real Abodes – Pimpri Chinchwad's most trusted real estate agent. Explore premium residential & commercial properties in PCMC, Pune. Expert guidance, transparent deals.";
const DEFAULT_KEYWORDS =
  'real estate Pimpri Chinchwad, property in PCMC, flats in Pimpri, apartments Chinchwad, real estate agent Pune, new projects PCMC, residential plots Pimpri Chinchwad, commercial property Pune';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  twitterHandle?: string;
  structuredData?: object | object[];
  noIndex?: boolean;
  // Article-specific
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleAuthor?: string;
  articleSection?: string;
}

export const SEO = ({
  title,
  description = DEFAULT_SEO_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonical,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  twitterHandle = '@realabodes',
  structuredData,
  noIndex = false,
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor,
  articleSection,
}: SEOProps) => {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} – Best Real Estate Agent in Pimpri Chinchwad`;

  const canonicalUrl = canonical
    ? `${BASE_URL}${canonical}`
    : typeof window !== 'undefined'
      ? window.location.href
      : BASE_URL;

  const absoluteOgImage = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`;

  // Support single or array of structured data schemas
  const schemas = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  return (
    <Helmet>
      {/* ── Standard ─────────────────────────────── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={canonicalUrl} />

      {/* ── Geo / Local SEO ──────────────────────── */}
      <meta name="geo.region" content="IN-MH" />
      <meta name="geo.placename" content="Pimpri-Chinchwad, Maharashtra, India" />
      <meta name="geo.position" content="18.6298;73.7997" />
      <meta name="ICBM" content="18.6298, 73.7997" />

      {/* ── Open Graph ───────────────────────────── */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />

      {/* Article-specific OG */}
      {ogType === 'article' && articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {ogType === 'article' && articleModifiedTime && (
        <meta property="article:modified_time" content={articleModifiedTime} />
      )}
      {ogType === 'article' && articleAuthor && (
        <meta property="article:author" content={articleAuthor} />
      )}
      {ogType === 'article' && articleSection && (
        <meta property="article:section" content={articleSection} />
      )}

      {/* ── Twitter Card ─────────────────────────── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteOgImage} />

      {/* ── Structured Data (JSON-LD) ─────────────── */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Pre-built Structured Data Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** LocalBusiness / RealEstateAgent schema – used on Home & Contact pages */
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Real Abodes',
  url: BASE_URL,
  logo: `${BASE_URL}/favicon.ico`,
  image: DEFAULT_OG_IMAGE,
  description: DEFAULT_SEO_DESCRIPTION,
  telephone: '+91-9175622021',
  email: 'info@realabodes.in',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Pimpri-Chinchwad',
    addressLocality: 'Pune',
    addressRegion: 'Maharashtra',
    postalCode: '411018',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 18.6298,
    longitude: 73.7997,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
  sameAs: [
    'https://www.facebook.com/realabodes',
    'https://www.instagram.com/realabodes',
    'https://twitter.com/realabodes',
  ],
  areaServed: [
    'Pimpri-Chinchwad', 'Pune', 'Wakad', 'Hinjewadi',
    'Baner', 'Aundh', 'Kothrud', 'Ravet', 'Tathawade', 'Punawale',
  ],
};

/** WebSite schema with SearchAction – used on Home page */
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: BASE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/projects?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

/** BreadcrumbList schema */
export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${BASE_URL}${item.url}`,
  })),
});

/** Article schema – used on Blog detail pages */
export const articleSchema = (post: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  publishedAt?: string;
  updatedAt?: string;
  author?: string;
  category?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  description: post.description,
  image: post.image
    ? post.image.startsWith('http') ? post.image : `${BASE_URL}${post.image}`
    : DEFAULT_OG_IMAGE,
  url: `${BASE_URL}/blog/${post.slug}`,
  datePublished: post.publishedAt,
  dateModified: post.updatedAt || post.publishedAt,
  author: {
    '@type': 'Person',
    name: post.author || 'Real Abodes Team',
  },
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    logo: { '@type': 'ImageObject', url: `${BASE_URL}/favicon.ico` },
  },
  articleSection: post.category,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${BASE_URL}/blog/${post.slug}`,
  },
});

/** RealEstateListing schema – used on Project detail pages */
export const propertySchema = (project: {
  name: string;
  description: string;
  slug: string;
  image?: string;
  location?: string;
  price?: string;
  status?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'RealEstateListing',
  name: project.name,
  description: project.description,
  url: `${BASE_URL}/project/${project.slug}`,
  image: project.image || DEFAULT_OG_IMAGE,
  address: {
    '@type': 'PostalAddress',
    addressLocality: project.location || 'Pimpri-Chinchwad',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  ...(project.price && {
    offers: {
      '@type': 'Offer',
      price: project.price,
      priceCurrency: 'INR',
      availability:
        project.status === 'Available'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/PreOrder',
    },
  }),
});
