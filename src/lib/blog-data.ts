export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  readTime: string;
  published?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "future-of-luxury-living-2026",
    title: "The Future of Luxury Living: Trends to Watch in 2026",
    excerpt: "Explore the emerging trends that are redefining high-end residential spaces, from sustainable smart homes to wellness-integrated environments.",
    content: `
      <h2>Redefining Opulence through Sustainability</h2>
      <p>The concept of luxury is shifting. It's no longer just about gold taps and marble floors; it's about conscious living. In 2026, we are seeing a massive surge in <strong>biophilic design</strong>, where nature is not just a view but an integral part of the architecture.</p>
      
      <p>Eco-luxury is the new standard. Homeowners are demanding energy-efficient systems that don't compromise on comfort. Solar skins, geothermal heating, and smart water management systems are becoming standard in ultra-luxury developments.</p>

      <h2>The Wellness Sanctuary</h2>
      <p>Your home is your sanctuary. The new wave of luxury homes integrates wellness into the very fabric of the building. Think circadian lighting systems that adjust to your natural sleep-wake cycle, air purification systems that rival hospital standards, and dedicated spaces for meditation and movement.</p>
      
      <blockquote>"True luxury is silence, space, and time. And the modern home is designed to give you exactly that."</blockquote>

      <h2>Smart Homes, but Invisible</h2>
      <p>Technology is everywhere, but it should be seen and not heard (or rather, felt and not seen). The trend is towards <em>calm technology</em>—tech that works in the background to enhance your life without demanding your attention. Voice-controlled everything, but with privacy at the core.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1600596542815-e32c8cc13bc9?q=80&w=2600&auto=format&fit=crop",
    date: "January 24, 2026",
    author: "Sarah Jenkins",
    category: "Market Trends",
    tags: ["Luxury", "Sustainability", "Wellness"],
    readTime: "5 min read",
  },
  {
    id: "2",
    slug: "investing-in-premium-real-estate",
    title: "Why Premium Real Estate Remains a Safe Haven",
    excerpt: "In volatile economic times, tangible assets like luxury real estate offer stability and appreciation. Here's why smart investors are looking at top-tier properties.",
    content: `
      <h2>Stability in Volatility</h2>
      <p>History has shown that while stock markets fluctuate, prime real estate in desirable locations holds its value. Whether it's a penthouse in New York or a villa in Dubai, the demand for exclusive properties often outstrips supply.</p>

      <h2>The Rental Yield Advantage</h2>
      <p>Beyond capital appreciation, luxury properties are commanding record-high rental yields. With the rise of the global nomad and executive relocations, the market for high-end short and medium-term rentals is booming.</p>
      
      <h2>Location, Location, Lifestyle</h2>
      <p>Investment today is driven by lifestyle. Properties that offer access to world-class amenities, privacy, and security are not just homes; they are assets that appreciate because they offer a quality of life that is scarce.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2600&auto=format&fit=crop",
    date: "January 20, 2026",
    author: "Michael Ross",
    category: "Real Estate Tips",
    tags: ["Investment", "Finance", "Property"],
    readTime: "4 min read",
  },
  {
    id: "3",
    slug: "timeless-interior-design",
    title: "Creating Timeless Interiors: A Guide to Classic Elegance",
    excerpt: "Trends come and go, but style is eternal. Learn how to curate a home that feels fresh today and relevant ten years from now.",
    content: `
      <h2>The Foundation: Quality Materials</h2>
      <p>Timeless design starts with the bones of the house. Hardwood floors, natural stone, and quality craftsmanship never go out of style. Avoid trendy materials that might look dated in a few years.</p>
      
      <h2>Neutral Palettes with Textural Depth</h2>
      <p>A neutral color palette doesn't have to be boring. Layering textures—linens, wools, wood grains—adds warmth and interest without the visual noise of bold patterns. It creates a calming backdrop for your life.</p>

      <h2>Invest in Statement Pieces</h2>
      <p>Instead of filling a room with clutter, choose a few high-quality pieces that speak to you. A vintage armchair, a hand-knotted rug, or a piece of original art can ground a room and give it soul.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2600&auto=format&fit=crop",
    date: "January 15, 2026",
    author: "Elena Vasquez",
    category: "Interior Design",
    tags: ["Design", "Interiors", "Style"],
    readTime: "6 min read",
  },
  {
    id: "4",
    slug: "smart-home-integration",
    title: "Seamless Smart Home Integration for Modern Families",
    excerpt: "How to automate your home without making it feel like a spaceship. Practical tips for families who want convenience without complexity.",
    content: `
      <h2>Unified Control Systems</h2>
      <p>The key to a successful smart home is a single interface. Instead of five different apps for lights, music, and heating, use a unified system like Control4 or Savant. This makes technology accessible to every family member, not just the tech-savvy ones.</p>
      
      <h2>Security and Peace of Mind</h2>
      <p>Modern smart security goes beyond cameras. We're talking about leak detection sensors, smart locks that allow remote access for service personnel, and perimeter monitoring that alerts you before a breach occurs.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1558002038-1091a1661116?q=80&w=2600&auto=format&fit=crop",
    date: "January 10, 2026",
    author: "David Chen",
    category: "Technology",
    tags: ["Smart Home", "Automation", "Family"],
    readTime: "3 min read",
  },
  {
    id: "5",
    slug: "architecture-of-light",
    title: "The Architecture of Light: Shaping Space with Illumination",
    excerpt: "Light is the fourth dimension of architecture. Discover how lighting design can transform the mood and functionality of your living spaces.",
    content: `
      <h2>Layering Light</h2>
      <p>A well-lit room needs three layers of light: ambient (general illumination), task (for reading or cooking), and accent (to highlight art or features). Relying on just overhead downlights creates a flat, clinical atmosphere.</p>
      
      <h2>Daylight Harvesting</h2>
      <p>Maximizing natural light is not just about big windows; it's about orientation and control. Automated shades that adjust with the sun can protect your interiors from UV damage while maintaining views and natural brightness.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2600&auto=format&fit=crop",
    date: "January 05, 2026",
    author: "Sophia Lemoine",
    category: "Architecture",
    tags: ["Lighting", "Design", "Architecture"],
    readTime: "7 min read",
  }
];

export const uniqueCategories = Array.from(new Set(blogPosts.map(post => post.category)));
