// Project data with comprehensive information for UX
export interface ProjectImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  icon?: string;
}

export interface ProjectPhase {
  name: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  description: string;
  date?: string;
}

export interface Amenity {
  name: string;
  icon: string;
  category: 'lifestyle' | 'sports' | 'convenience' | 'safety' | 'sustainability';
}

export interface ProximityItem {
  name: string;
  distance: string;
  type: 'education' | 'healthcare' | 'shopping' | 'transport' | 'leisure' | 'business';
  duration?: string;
}

export interface FloorPlan {
  name: string;
  type: string;
  size: string;
  bedrooms: number;
  bathrooms: number;
  image?: string;
  price?: string;
}

export interface Specification {
  category: string;
  items: { label: string; value: string }[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  status: 'completed' | 'in-progress' | 'planning';
  featured: boolean;
  thumbnail: string;
  thumbnailAlt?: string;
  thumbnailCaption?: string;
  heroImage: string;
  heroImageAlt?: string;
  heroImageCaption?: string;
  images: ProjectImage[];
  shortDescription: string;
  fullDescription: string;
  location: string;
  address: string;
  year: string;
  client: string;
  duration: string;
  metrics: ProjectMetric[];
  phases: ProjectPhase[];
  tags: string[];
  highlights: string[];
  amenities: Amenity[];
  proximity: ProximityItem[];
  floorPlans: FloorPlan[];
  specifications: Specification[];
  faqs: FAQ[];
  priceRange?: string;
  reraNumber?: string;
  videoUrl?: string;
  virtualTourUrl?: string;
  brochureUrl?: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  relatedProjects: string[];
}

export const categories = [
  'All Projects',
  'Apartments',
  'Commercial and Apartments',
  'Commercials',
  'Villas',
  'Plots',
] as const;

export const statusFilters = [
  'All Status',
  'Completed',
  'In Progress',
  'Planning',
] as const;

export const budgetRanges = [
  'All Budgets',
  '₹30 Lakh - ₹50 Lakh',
  '₹50 Lakh - ₹75 Lakh',
  '₹75 Lakh - ₹1 Crore',
  '₹1 Crore - ₹2 Crore',
  'Above ₹2 Crore',
] as const;

export const serviceAreas = [
  'All Locations',
  'Wakad',
  'Hinjewadi',
  'Baner',
  'Balewadi',
  'Pimple Saudagar',
  'Ravet',
  'Tathawade',
  'Punawale',
  'Chikhali',
  'Moshi',
] as const;

export const commonAmenities: Amenity[] = [
  { name: 'Swimming Pool', icon: 'pool', category: 'lifestyle' },
  { name: 'Gymnasium', icon: 'dumbbell', category: 'sports' },
  { name: 'Clubhouse', icon: 'home', category: 'lifestyle' },
  { name: 'Children\'s Play Area', icon: 'baby', category: 'lifestyle' },
  { name: 'Landscaped Gardens', icon: 'trees', category: 'lifestyle' },
  { name: 'Jogging Track', icon: 'footprints', category: 'sports' },
  { name: 'Tennis Court', icon: 'tennis', category: 'sports' },
  { name: 'Basketball Court', icon: 'basketball', category: 'sports' },
  { name: '24/7 Security', icon: 'shield', category: 'safety' },
  { name: 'CCTV Surveillance', icon: 'camera', category: 'safety' },
  { name: 'Power Backup', icon: 'zap', category: 'convenience' },
  { name: 'Covered Parking', icon: 'car', category: 'convenience' },
  { name: 'EV Charging', icon: 'plug', category: 'sustainability' },
  { name: 'Rainwater Harvesting', icon: 'droplets', category: 'sustainability' },
  { name: 'Solar Panels', icon: 'sun', category: 'sustainability' },
  { name: 'Spa & Sauna', icon: 'sparkles', category: 'lifestyle' },
  { name: 'Business Center', icon: 'briefcase', category: 'convenience' },
  { name: 'Concierge Services', icon: 'bell', category: 'convenience' },
  { name: 'Multipurpose Hall', icon: 'layout', category: 'lifestyle' },
  { name: 'Library', icon: 'book', category: 'lifestyle' },
  { name: 'Yoga & Meditation', icon: 'heart', category: 'lifestyle' },
  { name: 'Indoor Games', icon: 'gamepad', category: 'sports' },
  { name: 'Mini Theatre', icon: 'film', category: 'lifestyle' },
  { name: 'Cafeteria', icon: 'coffee', category: 'convenience' },
];

export const projects: Project[] = [
  {
    id: '1',
    slug: 'azure-residence',
    title: 'Azure Residence',
    subtitle: 'Luxury Living Redefined',
    category: 'Apartments',
    status: 'completed',
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
    images: [
      { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80', alt: 'Main facade', caption: 'Exterior view at sunset' },
      { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80', alt: 'Living space', caption: 'Open-plan living area' },
      { url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80', alt: 'Pool area', caption: 'Infinity pool terrace' },
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', alt: 'Bedroom', caption: 'Master suite with view' },
      { url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80', alt: 'Kitchen', caption: 'Gourmet kitchen' },
    ],
    shortDescription: 'A collection of 48 bespoke residences featuring panoramic views and world-class amenities.',
    fullDescription: 'Azure Residence represents the pinnacle of luxury living, offering an exclusive collection of 48 meticulously designed homes. Each residence has been crafted with an unwavering commitment to quality, featuring floor-to-ceiling windows, premium finishes, and intelligent home systems. The development seamlessly blends indoor and outdoor living, with private terraces overlooking landscaped gardens and a stunning infinity pool.',
    location: 'Wakad, Pune',
    address: 'Near Hinjewadi IT Park, Wakad, Pune 411057',
    year: '2024',
    client: 'Azure Developments',
    duration: '24 months',
    priceRange: '₹65 Lakh - ₹2.5 Cr',
    reraNumber: 'RERA/2024/RES/1234',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    brochureUrl: '#',
    metrics: [
      { label: 'Total Units', value: '48' },
      { label: 'Floor Area', value: '25,000 m²' },
      { label: 'Floors', value: '12' },
      { label: 'Occupancy', value: '95%' },
    ],
    phases: [
      { name: 'Concept & Design', status: 'completed', description: 'Architectural vision and planning', date: 'Q1 2022' },
      { name: 'Construction', status: 'completed', description: 'Building and structural work', date: 'Q2 2022 - Q4 2023' },
      { name: 'Interior Finishing', status: 'completed', description: 'Premium interior installations', date: 'Q1 2024' },
      { name: 'Handover', status: 'completed', description: 'Keys delivered to residents', date: 'Q2 2024' },
    ],
    tags: ['Luxury', 'Smart Home', 'Sustainable', 'Gated Community'],
    highlights: [
      'Smart home automation in every unit',
      'Private rooftop gardens',
      '24/7 concierge services',
      'Electric vehicle charging stations',
    ],
    amenities: [
      { name: 'Infinity Pool', icon: 'pool', category: 'lifestyle' },
      { name: 'State-of-art Gymnasium', icon: 'dumbbell', category: 'sports' },
      { name: 'Premium Clubhouse', icon: 'home', category: 'lifestyle' },
      { name: 'Children\'s Play Area', icon: 'baby', category: 'lifestyle' },
      { name: 'Landscaped Gardens', icon: 'trees', category: 'lifestyle' },
      { name: 'Jogging Track', icon: 'footprints', category: 'sports' },
      { name: 'Tennis Court', icon: 'tennis', category: 'sports' },
      { name: '24/7 Security', icon: 'shield', category: 'safety' },
      { name: 'CCTV Surveillance', icon: 'camera', category: 'safety' },
      { name: 'Power Backup', icon: 'zap', category: 'convenience' },
      { name: 'Covered Parking', icon: 'car', category: 'convenience' },
      { name: 'EV Charging Stations', icon: 'plug', category: 'sustainability' },
      { name: 'Rainwater Harvesting', icon: 'droplets', category: 'sustainability' },
      { name: 'Spa & Wellness Center', icon: 'sparkles', category: 'lifestyle' },
      { name: 'Business Lounge', icon: 'briefcase', category: 'convenience' },
      { name: 'Concierge Services', icon: 'bell', category: 'convenience' },
      { name: 'Banquet Hall', icon: 'layout', category: 'lifestyle' },
      { name: 'Yoga Pavilion', icon: 'heart', category: 'lifestyle' },
      { name: 'Private Cinema', icon: 'film', category: 'lifestyle' },
      { name: 'Rooftop Lounge', icon: 'coffee', category: 'lifestyle' },
    ],
    proximity: [
      { name: 'Symbiosis International School', distance: '2.5 km', duration: '8 min', type: 'education' },
      { name: 'Indira College', distance: '1.2 km', duration: '4 min', type: 'education' },
      { name: 'Ruby Hall Clinic', distance: '4 km', duration: '12 min', type: 'healthcare' },
      { name: 'Aditya Birla Hospital', distance: '1.8 km', duration: '6 min', type: 'healthcare' },
      { name: 'Westend Mall', distance: '3 km', duration: '10 min', type: 'shopping' },
      { name: 'Phoenix Mall', distance: '2 km', duration: '7 min', type: 'shopping' },
      { name: 'Hinjewadi Metro Station', distance: '800 m', duration: '3 min walk', type: 'transport' },
      { name: 'Pune International Airport', distance: '25 km', duration: '40 min', type: 'transport' },
      { name: 'Hinjewadi IT Park', distance: '5 km', duration: '15 min', type: 'business' },
      { name: 'Rajiv Gandhi IT Park', distance: '8 km', duration: '20 min', type: 'business' },
      { name: 'Oxford Golf Resort', distance: '6 km', duration: '15 min', type: 'leisure' },
      { name: 'Lavasa Hill City', distance: '60 km', duration: '90 min', type: 'leisure' },
    ],
    floorPlans: [
      { name: 'Studio Haven', type: 'Studio', size: '450 sq.ft', bedrooms: 0, bathrooms: 1, price: '₹65 Lakh' },
      { name: 'Urban Suite', type: '1 BHK', size: '650 sq.ft', bedrooms: 1, bathrooms: 1, price: '₹85 Lakh' },
      { name: 'Family Comfort', type: '2 BHK', size: '950 sq.ft', bedrooms: 2, bathrooms: 2, price: '₹1.25 Cr' },
      { name: 'Executive Living', type: '3 BHK', size: '1400 sq.ft', bedrooms: 3, bathrooms: 3, price: '₹1.85 Cr' },
      { name: 'Penthouse Royale', type: 'Penthouse', size: '2500 sq.ft', bedrooms: 4, bathrooms: 4, price: '₹2.5 Cr' },
    ],
    specifications: [
      {
        category: 'Structure',
        items: [
          { label: 'Foundation', value: 'RCC framed structure with earthquake resistant design' },
          { label: 'Walls', value: 'AAC blocks with premium plastering' },
          { label: 'Ceiling Height', value: '3.2 meters (10.5 ft)' },
        ],
      },
      {
        category: 'Flooring',
        items: [
          { label: 'Living & Dining', value: 'Imported Italian marble' },
          { label: 'Bedrooms', value: 'Engineered wooden flooring' },
          { label: 'Bathrooms', value: 'Anti-skid vitrified tiles' },
          { label: 'Balcony', value: 'Designer ceramic tiles' },
        ],
      },
      {
        category: 'Kitchen',
        items: [
          { label: 'Platform', value: 'Granite/Quartz countertop' },
          { label: 'Cabinets', value: 'Modular kitchen with soft-close fittings' },
          { label: 'Sink', value: 'Stainless steel double bowl' },
          { label: 'Appliances', value: 'Chimney, hob, and oven provision' },
        ],
      },
      {
        category: 'Bathrooms',
        items: [
          { label: 'Fittings', value: 'Premium Kohler/Grohe sanitary ware' },
          { label: 'Tiles', value: 'Floor-to-ceiling designer tiles' },
          { label: 'Shower', value: 'Rain shower with mixer' },
          { label: 'Vanity', value: 'Designer vanity with mirror cabinet' },
        ],
      },
      {
        category: 'Electrical',
        items: [
          { label: 'Wiring', value: 'Concealed copper wiring with MCB' },
          { label: 'Switches', value: 'Modular switches (Legrand/Schneider)' },
          { label: 'Lighting', value: 'LED lights with smart control provision' },
          { label: 'AC', value: 'VRV air conditioning system' },
        ],
      },
      {
        category: 'Doors & Windows',
        items: [
          { label: 'Main Door', value: 'Designer wooden door with digital lock' },
          { label: 'Internal Doors', value: 'Flush doors with premium finish' },
          { label: 'Windows', value: 'Double glazed UPVC with mosquito mesh' },
          { label: 'Balcony', value: 'Sliding glass doors with safety rails' },
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the possession date for Azure Residence?',
        answer: 'Azure Residence has already been completed and handed over. Immediate possession is available for remaining units.',
      },
      {
        question: 'Are there any payment plans available?',
        answer: 'Yes, we offer flexible payment plans including 20:80, construction-linked, and customized payment options. Our team can help you choose the best plan.',
      },
      {
        question: 'What amenities are included in the maintenance?',
        answer: 'The maintenance covers all common amenities including pool, gym, clubhouse, security, landscaping, and common area utilities.',
      },
      {
        question: 'Is home loan assistance available?',
        answer: 'Yes, we have tie-ups with leading banks offering competitive interest rates. Our sales team can assist with the loan process.',
      },
      {
        question: 'Are pets allowed in Azure Residence?',
        answer: 'Yes, Azure Residence is a pet-friendly community with designated pet zones and walking areas.',
      },
      {
        question: 'What is the maintenance cost?',
        answer: 'The maintenance charges are ₹4.50 per sqft per month, which includes all common amenities and services.',
      },
    ],
    testimonial: {
      quote: 'Living at Azure has exceeded all our expectations. The attention to detail and quality of life here is unmatched.',
      author: 'Mohammed Al-Rashid',
      role: 'Resident',
    },
    relatedProjects: ['2', '3'],
  },
  {
    id: '2',
    slug: 'oasis-towers',
    title: 'Oasis Towers',
    subtitle: 'Where Business Meets Excellence',
    category: 'Commercials',
    status: 'completed',
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
    images: [
      { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80', alt: 'Tower exterior', caption: 'Twin towers at dusk' },
      { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80', alt: 'Office interior', caption: 'Modern workspace design' },
      { url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80', alt: 'Meeting room', caption: 'Executive boardroom' },
      { url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&q=80', alt: 'Open office', caption: 'Collaborative workspace' },
    ],
    shortDescription: 'Twin Grade A office towers offering 85,000 sq.ft of premium workspace in the heart of the business district.',
    fullDescription: 'Oasis Towers stands as a landmark of modern business architecture, comprising twin 45-story towers connected by a stunning sky bridge. The development offers flexible floor plates, cutting-edge building management systems, and IGBC Gold certification. With direct metro access and a curated retail podium, Oasis Towers creates a complete business ecosystem.',
    location: 'Baner, Pune',
    address: 'Baner-Pashan Link Road, Baner, Pune 411045',
    year: '2023',
    client: 'Oasis Holdings',
    duration: '36 months',
    priceRange: '₹8,500 - ₹12,000 per sq.ft/year',
    reraNumber: 'RERA/P52100012345',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    brochureUrl: '#',
    metrics: [
      { label: 'Office Space', value: '85,000 m²' },
      { label: 'Floors', value: '45' },
      { label: 'Parking', value: '2,500 spaces' },
      { label: 'Tenants', value: '120+' },
    ],
    phases: [
      { name: 'Foundation', status: 'completed', description: 'Deep foundation and basement', date: 'Q2 2020' },
      { name: 'Structure', status: 'completed', description: 'Core and shell construction', date: 'Q3 2020 - Q4 2021' },
      { name: 'Fit-out', status: 'completed', description: 'Interior finishing and MEP', date: 'Q1 2022 - Q2 2023' },
      { name: 'Operations', status: 'completed', description: 'Full operational status', date: 'Q3 2023' },
    ],
    tags: ['LEED Gold', 'Smart Building', 'Metro Access', 'Sky Bridge'],
    highlights: [
      'LEED Gold certified',
      'Direct metro connectivity',
      'Sky bridge observation deck',
      'Fortune 500 tenants',
    ],
    amenities: [
      { name: 'Executive Lounge', icon: 'armchair', category: 'lifestyle' },
      { name: 'Premium Gymnasium', icon: 'dumbbell', category: 'sports' },
      { name: 'Sky Bridge', icon: 'bridge', category: 'lifestyle' },
      { name: 'Rooftop Helipad', icon: 'plane', category: 'convenience' },
      { name: 'Conference Center', icon: 'presentation', category: 'convenience' },
      { name: 'Food Court', icon: 'utensils', category: 'convenience' },
      { name: 'Retail Podium', icon: 'shopping-bag', category: 'convenience' },
      { name: '24/7 Security', icon: 'shield', category: 'safety' },
      { name: 'CCTV Surveillance', icon: 'camera', category: 'safety' },
      { name: 'Fire Safety System', icon: 'flame', category: 'safety' },
      { name: 'Full Power Backup', icon: 'zap', category: 'convenience' },
      { name: 'Multi-level Parking', icon: 'car', category: 'convenience' },
      { name: 'EV Charging', icon: 'plug', category: 'sustainability' },
      { name: 'Solar Power', icon: 'sun', category: 'sustainability' },
      { name: 'Smart BMS', icon: 'cpu', category: 'convenience' },
      { name: 'High-speed Elevators', icon: 'arrow-up', category: 'convenience' },
    ],
    proximity: [
      { name: 'Baner Metro Station', distance: 'Direct access', duration: '0 min', type: 'transport' },
      { name: 'Pune International Airport', distance: '18 km', duration: '35 min', type: 'transport' },
      { name: 'Phoenix Mall', distance: '3 km', duration: '8 min', type: 'shopping' },
      { name: 'Westend Mall', distance: '5 km', duration: '12 min', type: 'shopping' },
      { name: 'Sahyadri Hospital', distance: '4 km', duration: '10 min', type: 'healthcare' },
      { name: 'Baner Hills', distance: '2 km', duration: '5 min', type: 'leisure' },
      { name: 'Maratha Chamber of Commerce', distance: '1 km', duration: '3 min', type: 'business' },
      { name: 'Premium Hotels', distance: '500 m', duration: '2 min walk', type: 'leisure' },
    ],
    floorPlans: [
      { name: 'Standard Office', type: 'Office', size: '5,000 sq.ft', bedrooms: 0, bathrooms: 2, price: '₹42 Lakh/year' },
      { name: 'Executive Suite', type: 'Office', size: '10,000 sq.ft', bedrooms: 0, bathrooms: 4, price: '₹95 Lakh/year' },
      { name: 'Full Floor', type: 'Office', size: '20,000 sq.ft', bedrooms: 0, bathrooms: 8, price: '₹2.1 Cr/year' },
      { name: 'Retail Unit', type: 'Retail', size: '2,000 sq.ft', bedrooms: 0, bathrooms: 1, price: '₹28 Lakh/year' },
    ],
    specifications: [
      {
        category: 'Building Systems',
        items: [
          { label: 'Facade', value: 'Double-glazed curtain wall with UV protection' },
          { label: 'Ceiling', value: 'Suspended ceiling 2.8m finished height' },
          { label: 'Floors', value: 'Raised access flooring system' },
        ],
      },
      {
        category: 'HVAC',
        items: [
          { label: 'System', value: 'Variable Refrigerant Volume (VRV) system' },
          { label: 'Control', value: 'Individual zone temperature control' },
          { label: 'Air Quality', value: 'HEPA filtration with fresh air intake' },
        ],
      },
      {
        category: 'Electrical & IT',
        items: [
          { label: 'Power', value: '100W per sqm provision' },
          { label: 'Data', value: 'Fiber optic infrastructure' },
          { label: 'Backup', value: '100% backup with UPS' },
        ],
      },
      {
        category: 'Elevators',
        items: [
          { label: 'Passenger', value: '24 high-speed elevators (8 m/s)' },
          { label: 'Service', value: '4 service elevators' },
          { label: 'VIP', value: '2 dedicated VIP elevators' },
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the minimum lease term?',
        answer: 'The minimum lease term is 3 years for office spaces and 5 years for retail units, with options for renewal.',
      },
      {
        question: 'Is fit-out included in the rent?',
        answer: 'Base building fit-out is included. Custom fit-out can be arranged through our approved contractors or tenant\'s choice.',
      },
      {
        question: 'What are the operating hours?',
        answer: 'The building operates 24/7 with full services available during business hours (8 AM - 10 PM) and security round the clock.',
      },
      {
        question: 'Is there a grace period for rent?',
        answer: 'New tenants receive a 3-month fit-out period rent-free for spaces above 1,000 sqm.',
      },
    ],
    testimonial: {
      quote: 'Oasis Towers offers everything a modern business needs - prime location, world-class facilities, and exceptional management.',
      author: 'Sarah Al-Zahrani',
      role: 'CEO, Tech Innovations Ltd',
    },
    relatedProjects: ['1', '4'],
  },
  {
    id: '3',
    slug: 'palm-gardens',
    title: 'Palm Gardens',
    subtitle: 'A Sanctuary of Serenity',
    category: 'Villas',
    status: 'in-progress',
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
    images: [
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', alt: 'Villa exterior', caption: 'Contemporary villa design' },
      { url: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80', alt: 'Garden', caption: 'Lush private gardens' },
      { url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80', alt: 'Interior', caption: 'Master suite' },
    ],
    shortDescription: 'An exclusive gated community of 32 villas, each with private pools and landscaped gardens.',
    fullDescription: 'Palm Gardens offers the ultimate in private residential living with 32 individually designed villas set within 15 acres of landscaped grounds. Each home features a private pool, temperature-controlled wine cellar, and home cinema. The community includes a clubhouse, spa, tennis courts, and a private school within walking distance.',
    location: 'Balewadi, Pune',
    address: 'Near Balewadi High Street, Balewadi, Pune 411045',
    year: '2025',
    client: 'Palm Developments',
    duration: '30 months',
    priceRange: '₹2.5 Cr - ₹8 Cr',
    reraNumber: 'RERA/P52100045678',
    brochureUrl: '#',
    metrics: [
      { label: 'Villas', value: '32' },
      { label: 'Land Area', value: '15 hectares' },
      { label: 'Pool Size', value: '12m avg' },
      { label: 'Completion', value: '75%' },
    ],
    phases: [
      { name: 'Site Preparation', status: 'completed', description: 'Land clearing and infrastructure', date: 'Q1 2023' },
      { name: 'Villa Construction', status: 'in-progress', description: '28 of 32 villas under construction', date: 'Q2 2023 - Present' },
      { name: 'Landscaping', status: 'in-progress', description: 'Gardens and common areas', date: 'Q4 2024 - Present' },
      { name: 'Handover', status: 'upcoming', description: 'Expected completion', date: 'Q2 2025' },
    ],
    tags: ['Gated Community', 'Private Pools', 'Villa', 'Family'],
    highlights: [
      'Private pools for each villa',
      'Smart irrigation systems',
      'Community clubhouse & spa',
      'Walking distance to school',
    ],
    amenities: [
      { name: 'Private Pool (each villa)', icon: 'pool', category: 'lifestyle' },
      { name: 'Community Pool', icon: 'waves', category: 'lifestyle' },
      { name: 'Clubhouse', icon: 'home', category: 'lifestyle' },
      { name: 'Spa & Wellness', icon: 'sparkles', category: 'lifestyle' },
      { name: 'Tennis Courts', icon: 'tennis', category: 'sports' },
      { name: 'Basketball Court', icon: 'basketball', category: 'sports' },
      { name: 'Children\'s Playground', icon: 'baby', category: 'lifestyle' },
      { name: 'Gated Security', icon: 'shield', category: 'safety' },
      { name: 'Smart Home Systems', icon: 'smartphone', category: 'convenience' },
      { name: 'Wine Cellar (each villa)', icon: 'wine', category: 'lifestyle' },
      { name: 'Home Cinema (each villa)', icon: 'film', category: 'lifestyle' },
      { name: 'BBQ Area', icon: 'flame', category: 'lifestyle' },
      { name: 'Guest Parking', icon: 'car', category: 'convenience' },
      { name: 'Landscaped Gardens', icon: 'trees', category: 'lifestyle' },
    ],
    proximity: [
      { name: 'Vibgyor International School', distance: '800 m', duration: '3 min', type: 'education' },
      { name: 'Sahyadri Super Specialty Hospital', distance: '5 km', duration: '12 min', type: 'healthcare' },
      { name: 'Balewadi High Street', distance: '2 km', duration: '6 min', type: 'shopping' },
      { name: 'Hinjewadi Metro (Planned)', distance: '1.5 km', duration: '5 min', type: 'transport' },
      { name: 'Oxford Golf Resort', distance: '4 km', duration: '10 min', type: 'leisure' },
      { name: 'Hinjewadi IT Park', distance: '8 km', duration: '18 min', type: 'business' },
    ],
    floorPlans: [
      { name: 'Villa Oasis', type: '4 BHK Villa', size: '3,500 sq.ft', bedrooms: 4, bathrooms: 5, price: '₹2.5 Cr' },
      { name: 'Villa Serenity', type: '5 BHK Villa', size: '4,500 sq.ft', bedrooms: 5, bathrooms: 6, price: '₹4 Cr' },
      { name: 'Villa Prestige', type: '6 BHK Villa', size: '5,800 sq.ft', bedrooms: 6, bathrooms: 7, price: '₹6 Cr' },
      { name: 'Villa Royal', type: '7 BHK Mansion', size: '8,000 sq.ft', bedrooms: 7, bathrooms: 9, price: '₹8 Cr' },
    ],
    specifications: [
      {
        category: 'Structure',
        items: [
          { label: 'Foundation', value: 'Isolated footings with damp proofing' },
          { label: 'Walls', value: 'Double-wall construction with insulation' },
          { label: 'Roof', value: 'Insulated flat roof with landscaping option' },
        ],
      },
      {
        category: 'Exterior',
        items: [
          { label: 'Facade', value: 'Premium stone cladding' },
          { label: 'Pool', value: '12m infinity edge with heating' },
          { label: 'Garden', value: 'Automated smart irrigation' },
          { label: 'Driveway', value: 'Granite paving with lighting' },
        ],
      },
      {
        category: 'Interior',
        items: [
          { label: 'Flooring', value: 'Imported marble and wooden flooring' },
          { label: 'Height', value: '3.6m double-height living areas' },
          { label: 'Wine Cellar', value: 'Climate-controlled 500 bottle capacity' },
          { label: 'Home Cinema', value: 'Acoustic treatment with 4K projection' },
        ],
      },
    ],
    faqs: [
      {
        question: 'When is the expected handover date?',
        answer: 'The first batch of 12 villas will be handed over in Q2 2025, with remaining villas following in Q3-Q4 2025.',
      },
      {
        question: 'Can I customize my villa?',
        answer: 'Yes, buyers can customize interiors, pool design, and landscaping within approved guidelines. Early buyers get more customization options.',
      },
      {
        question: 'What is included in the price?',
        answer: 'Price includes the villa, private pool, landscaped garden, smart home system, and all interior finishes as per specifications.',
      },
    ],
    relatedProjects: ['1', '5'],
  },
  {
    id: '4',
    slug: 'crystal-hotel',
    title: 'Crystal Hotel & Spa',
    subtitle: 'Five-Star Excellence',
    category: 'Commercials',
    status: 'completed',
    featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80',
    images: [
      { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80', alt: 'Hotel exterior', caption: 'Beachfront facade' },
      { url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80', alt: 'Lobby', caption: 'Grand lobby atrium' },
      { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80', alt: 'Suite', caption: 'Presidential suite' },
    ],
    shortDescription: 'A 280-room luxury beachfront resort with world-class spa and dining experiences.',
    fullDescription: 'Crystal Hotel & Spa delivers an unparalleled hospitality experience on the shores of the Arabian Sea. The resort features 280 luxuriously appointed rooms and suites, a 25,000 sq.ft wellness center, and five signature restaurants helmed by award-winning chefs. The architecture draws inspiration from traditional Indian design while embracing contemporary luxury.',
    location: 'Alibaug, Maharashtra',
    address: 'Alibaug Beach Road, Alibaug 402201',
    year: '2023',
    client: 'Crystal Hospitality Group',
    duration: '28 months',
    priceRange: '₹8,000 - ₹75,000 per night',
    metrics: [
      { label: 'Rooms', value: '280' },
      { label: 'Restaurants', value: '5' },
      { label: 'Spa Size', value: '3,000 m²' },
      { label: 'Beach', value: '400m private' },
    ],
    phases: [
      { name: 'Design', status: 'completed', description: 'Concept and detailed design', date: 'Q1 2021' },
      { name: 'Construction', status: 'completed', description: 'Building and infrastructure', date: 'Q2 2021 - Q3 2022' },
      { name: 'FF&E', status: 'completed', description: 'Furniture and equipment', date: 'Q4 2022' },
      { name: 'Opening', status: 'completed', description: 'Soft opening achieved', date: 'Q1 2023' },
    ],
    tags: ['5-Star', 'Beachfront', 'Spa', 'Resort'],
    highlights: [
      'Private 400m beach',
      'Michelin-starred dining',
      'Infinity-edge pools',
      'Helipad access',
    ],
    amenities: [
      { name: 'Private Beach', icon: 'umbrella', category: 'lifestyle' },
      { name: 'Infinity Pools (3)', icon: 'pool', category: 'lifestyle' },
      { name: 'World-class Spa', icon: 'sparkles', category: 'lifestyle' },
      { name: '5 Signature Restaurants', icon: 'utensils', category: 'convenience' },
      { name: 'Beach Club', icon: 'sun', category: 'lifestyle' },
      { name: 'Water Sports Center', icon: 'waves', category: 'sports' },
      { name: 'Tennis Courts', icon: 'tennis', category: 'sports' },
      { name: 'Fitness Center', icon: 'dumbbell', category: 'sports' },
      { name: 'Kids Club', icon: 'baby', category: 'lifestyle' },
      { name: 'Business Center', icon: 'briefcase', category: 'convenience' },
      { name: 'Helipad', icon: 'plane', category: 'convenience' },
      { name: 'Yacht Marina', icon: 'anchor', category: 'lifestyle' },
    ],
    proximity: [
      { name: 'Alibaug Jetty', distance: '5 km', duration: '10 min', type: 'transport' },
      { name: 'Pune', distance: '150 km', duration: '3 hrs', type: 'business' },
      { name: 'Murud Beach', distance: '2 km', duration: '5 min', type: 'leisure' },
      { name: 'Alibaug Market', distance: '4 km', duration: '8 min', type: 'shopping' },
    ],
    floorPlans: [
      { name: 'Deluxe Room', type: 'Room', size: '480 sq.ft', bedrooms: 1, bathrooms: 1, price: '₹8,000/night' },
      { name: 'Sea View Suite', type: 'Suite', size: '800 sq.ft', bedrooms: 1, bathrooms: 1, price: '₹18,000/night' },
      { name: 'Family Suite', type: 'Suite', size: '1,300 sq.ft', bedrooms: 2, bathrooms: 2, price: '₹35,000/night' },
      { name: 'Presidential Suite', type: 'Suite', size: '2,700 sq.ft', bedrooms: 3, bathrooms: 3, price: '₹75,000/night' },
    ],
    specifications: [
      {
        category: 'Rooms',
        items: [
          { label: 'Bedding', value: 'King-size premium mattress with Egyptian cotton' },
          { label: 'Bathroom', value: 'Marble with rain shower and soaking tub' },
          { label: 'Technology', value: 'Smart room controls, 65" OLED TV' },
        ],
      },
      {
        category: 'Dining',
        items: [
          { label: 'Main Restaurant', value: 'International buffet (300 seats)' },
          { label: 'Specialty', value: '4 à la carte restaurants' },
          { label: 'Bars', value: '3 bars including beach bar' },
        ],
      },
    ],
    faqs: [
      {
        question: 'What dining options are available?',
        answer: 'The resort features 5 restaurants offering international, Arabic, Asian, seafood, and Mediterranean cuisine, plus 3 bars.',
      },
      {
        question: 'Is the resort family-friendly?',
        answer: 'Yes, we have a dedicated kids club, family suites, children\'s pool, and family-friendly activities.',
      },
    ],
    testimonial: {
      quote: 'Crystal Hotel has redefined luxury hospitality in the region. An exceptional achievement.',
      author: 'Travel & Leisure Magazine',
      role: '2024 Best New Hotel',
    },
    relatedProjects: ['2', '5'],
  },
  {
    id: '5',
    slug: 'urban-quarter',
    title: 'Urban Quarter',
    subtitle: 'Live, Work, Play',
    category: 'Commercial and Apartments',
    status: 'planning',
    featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80',
    images: [
      { url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80', alt: 'Development', caption: 'Mixed-use masterplan' },
      { url: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1200&q=80', alt: 'Plaza', caption: 'Central plaza design' },
      { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80', alt: 'Retail', caption: 'Retail promenade' },
    ],
    shortDescription: 'A visionary 30-acre mixed-use development combining residential, retail, and entertainment.',
    fullDescription: 'Urban Quarter is set to transform the city skyline with a 30-acre integrated development. The masterplan includes 500 residential units, 4,00,000 sq.ft of retail space, a boutique hotel, and extensive public realm featuring parks, plazas, and water features. Sustainability is central to the design, targeting net-zero carbon operations.',
    location: 'Pimpri-Chinchwad, Pune',
    address: 'PCMC Smart City Zone, Pimpri 411018',
    year: '2027',
    client: 'Urban Development Authority',
    duration: '48 months',
    priceRange: '₹55 Lakh - ₹1.8 Cr (Residential)',
    metrics: [
      { label: 'Site Area', value: '30 acres' },
      { label: 'Residences', value: '500' },
      { label: 'Retail', value: '4,00,000 sq.ft' },
      { label: 'Investment', value: '₹1,200 Cr' },
    ],
    phases: [
      { name: 'Masterplanning', status: 'completed', description: 'Vision and framework', date: 'Q4 2024' },
      { name: 'Detailed Design', status: 'in-progress', description: 'Architecture and engineering', date: 'Q1 2025 - Present' },
      { name: 'Phase 1 Construction', status: 'upcoming', description: 'Residential tower and retail', date: 'Q4 2025' },
      { name: 'Full Completion', status: 'upcoming', description: 'All phases delivered', date: 'Q4 2027' },
    ],
    tags: ['Net Zero', 'Transit-Oriented', 'Public Realm', 'Landmark'],
    highlights: [
      'Net-zero carbon target',
      'Metro station integration',
      '3 hectares of public parks',
      'Smart city infrastructure',
    ],
    amenities: [
      { name: 'Central Park', icon: 'trees', category: 'lifestyle' },
      { name: 'Water Features', icon: 'droplets', category: 'lifestyle' },
      { name: 'Amphitheatre', icon: 'mic', category: 'lifestyle' },
      { name: 'Premium Mall', icon: 'shopping-bag', category: 'convenience' },
      { name: 'Boutique Hotel', icon: 'building', category: 'lifestyle' },
      { name: 'Metro Station', icon: 'train', category: 'convenience' },
      { name: 'Smart Parking', icon: 'car', category: 'convenience' },
      { name: 'District Cooling', icon: 'thermometer', category: 'sustainability' },
      { name: 'Solar Canopies', icon: 'sun', category: 'sustainability' },
      { name: 'Green Roofs', icon: 'leaf', category: 'sustainability' },
    ],
    proximity: [
      { name: 'Dammam Metro Station', distance: 'On-site', duration: '0 min', type: 'transport' },
      { name: 'King Fahd Airport', distance: '20 km', duration: '25 min', type: 'transport' },
      { name: 'Corniche', distance: '3 km', duration: '10 min', type: 'leisure' },
      { name: 'King Fahd University', distance: '8 km', duration: '15 min', type: 'education' },
    ],
    floorPlans: [
      { name: 'Studio', type: 'Studio', size: '550 sq.ft', bedrooms: 0, bathrooms: 1, price: '₹55 Lakh' },
      { name: '1 Bedroom', type: '1 BHK', size: '750 sq.ft', bedrooms: 1, bathrooms: 1, price: '₹78 Lakh' },
      { name: '2 Bedroom', type: '2 BHK', size: '1,100 sq.ft', bedrooms: 2, bathrooms: 2, price: '₹1.15 Cr' },
      { name: '3 Bedroom', type: '3 BHK', size: '1,550 sq.ft', bedrooms: 3, bathrooms: 3, price: '₹1.8 Cr' },
    ],
    specifications: [
      {
        category: 'Sustainability',
        items: [
          { label: 'Energy', value: 'Net-zero carbon operations' },
          { label: 'Water', value: '100% recycled water for landscaping' },
          { label: 'Materials', value: 'Sustainable and recycled materials' },
        ],
      },
      {
        category: 'Smart City',
        items: [
          { label: 'Infrastructure', value: 'Fiber-to-home connectivity' },
          { label: 'Mobility', value: 'Autonomous shuttle service' },
          { label: 'Utilities', value: 'Smart metering and monitoring' },
        ],
      },
    ],
    faqs: [
      {
        question: 'When will sales launch?',
        answer: 'Pre-registration is open now. Official sales launch is expected in Q3 2025 with early-bird pricing.',
      },
      {
        question: 'Will there be affordable housing options?',
        answer: 'Yes, 20% of residential units are designated as affordable housing with government subsidy options.',
      },
    ],
    relatedProjects: ['2', '3'],
  },
  {
    id: '6',
    slug: 'heritage-plaza',
    title: 'Heritage Plaza',
    subtitle: 'Modern Meets Traditional',
    category: 'Commercial',
    status: 'in-progress',
    featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1464938050520-ef2571f42989?w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1464938050520-ef2571f42989?w=1920&q=80',
    images: [
      { url: 'https://images.unsplash.com/photo-1464938050520-ef2571f42989?w=1200&q=80', alt: 'Building', caption: 'Heritage-inspired facade' },
      { url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80', alt: 'Office', caption: 'Contemporary interiors' },
      { url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&q=80', alt: 'Workspace', caption: 'Collaborative spaces' },
    ],
    shortDescription: 'A 28-story office tower blending traditional architectural heritage with cutting-edge design.',
    fullDescription: 'Heritage Plaza pays homage to traditional architecture while delivering a state-of-the-art commercial tower. The facade features intricate jali-inspired screens that provide natural shading and reduce cooling loads by 30%. Inside, flexible floor plates accommodate everything from startups to corporate headquarters.',
    location: 'Shivajinagar, Pune',
    address: 'FC Road, Shivajinagar, Pune 411005',
    year: '2025',
    client: 'Heritage Properties',
    duration: '30 months',
    priceRange: '₹7,500 - ₹11,000 per sq.ft/year',
    reraNumber: 'RERA/P52100078901',
    metrics: [
      { label: 'Office Space', value: '42,000 m²' },
      { label: 'Floors', value: '28' },
      { label: 'Energy Saving', value: '30%' },
      { label: 'Pre-leased', value: '65%' },
    ],
    phases: [
      { name: 'Foundation', status: 'completed', description: 'Piling and basement', date: 'Q2 2023' },
      { name: 'Superstructure', status: 'completed', description: 'Core and frame', date: 'Q3 2023 - Q2 2024' },
      { name: 'Facade', status: 'in-progress', description: 'Mashrabiya installation', date: 'Q3 2024 - Present' },
      { name: 'Completion', status: 'upcoming', description: 'Handover to tenants', date: 'Q3 2025' },
    ],
    tags: ['Heritage', 'Sustainable', 'Grade A', 'Innovation'],
    highlights: [
      'Mashrabiya-inspired facade',
      '30% energy reduction',
      'Heritage museum lobby',
      'Rooftop garden terrace',
    ],
    amenities: [
      { name: 'Heritage Museum', icon: 'landmark', category: 'lifestyle' },
      { name: 'Rooftop Garden', icon: 'trees', category: 'lifestyle' },
      { name: 'Executive Lounge', icon: 'armchair', category: 'lifestyle' },
      { name: 'Fitness Center', icon: 'dumbbell', category: 'sports' },
      { name: 'Prayer Room', icon: 'moon', category: 'convenience' },
      { name: 'Conference Center', icon: 'presentation', category: 'convenience' },
      { name: 'Cafeteria', icon: 'coffee', category: 'convenience' },
      { name: 'Smart BMS', icon: 'cpu', category: 'convenience' },
    ],
    proximity: [
      { name: 'FC Road', distance: 'On FC Road', duration: '0 min', type: 'shopping' },
      { name: 'Shivajinagar Railway Station', distance: '1 km', duration: '3 min', type: 'transport' },
      { name: 'Pune Metro Station', distance: '400 m', duration: '5 min walk', type: 'transport' },
      { name: 'JM Road', distance: '2 km', duration: '6 min', type: 'business' },
    ],
    floorPlans: [
      { name: 'Standard Floor', type: 'Office', size: '15,000 sq.ft', bedrooms: 0, bathrooms: 4, price: '₹1.25 Cr/year' },
      { name: 'Half Floor', type: 'Office', size: '7,500 sq.ft', bedrooms: 0, bathrooms: 2, price: '₹65 Lakh/year' },
    ],
    specifications: [
      {
        category: 'Facade',
        items: [
          { label: 'Design', value: 'Parametric mashrabiya screens' },
          { label: 'Material', value: 'Anodized aluminum with bronze finish' },
          { label: 'Performance', value: '30% reduction in solar heat gain' },
        ],
      },
      {
        category: 'Interior',
        items: [
          { label: 'Ceiling', value: '2.85m finished ceiling height' },
          { label: 'Floor', value: 'Raised access flooring' },
          { label: 'Lighting', value: 'LED with daylight sensors' },
        ],
      },
    ],
    faqs: [
      {
        question: 'What makes Heritage Plaza unique?',
        answer: 'The mashrabiya-inspired facade is both culturally significant and highly functional, reducing energy consumption by 30% while creating a striking visual identity.',
      },
      {
        question: 'What is the current leasing status?',
        answer: '65% of the building is pre-leased to major corporations. Premium floors are still available for early tenants.',
      },
    ],
    relatedProjects: ['2', '4'],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

export function getRelatedProjects(projectId: string): Project[] {
  const project = projects.find(p => p.id === projectId);
  if (!project) return [];
  return project.relatedProjects
    .map(id => projects.find(p => p.id === id))
    .filter((p): p is Project => p !== undefined);
}

export function filterProjects(category: string, status: string, search: string): Project[] {
  return projects.filter(project => {
    const matchesCategory = category === 'All Projects' || project.category === category;
    const matchesStatus = status === 'All Status' ||
      (status === 'Completed' && project.status === 'completed') ||
      (status === 'In Progress' && project.status === 'in-progress') ||
      (status === 'Planning' && project.status === 'planning');
    const matchesSearch = search === '' ||
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.location.toLowerCase().includes(search.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));

    return matchesCategory && matchesStatus && matchesSearch;
  });
}
