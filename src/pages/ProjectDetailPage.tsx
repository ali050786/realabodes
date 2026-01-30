import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Preloader } from '@/components/ui/Preloader';
import {
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  Calendar,
  Clock,
  Users,
  Check,
  Circle,
  ChevronRight,
  ChevronDown,
  Quote,
  Share2,
  Heart,
  Download,
  Play,
  Phone,
  Mail,
  Building,
  GraduationCap,
  Hospital,
  ShoppingBag,
  Train,
  Palmtree,
  Briefcase,
  Home,
  BedDouble,
  Bath,
  Maximize,
  Dumbbell,
  Shield,
  Zap,
  Leaf,
  Waves,
  Coffee,
  Baby,
  Trees,
  Camera,
  Car,
  Droplets,
  Sun,
  Film,
  Sparkles,
  Footprints,
  Bell,
  Cpu,
  Plug
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Amenity, ProximityItem, Project } from '@/lib/projects-data';
import { useState, useEffect } from 'react';
import { fetchProjects } from '@/services/projects';
import { useProjectStore } from '@/stores/useProjectStore';

// Icon mapping for amenities
const amenityIcons: Record<string, React.ReactNode> = {
  pool: <Waves className="w-5 h-5" />,
  waves: <Waves className="w-5 h-5" />,
  dumbbell: <Dumbbell className="w-5 h-5" />,
  home: <Home className="w-5 h-5" />,
  baby: <Baby className="w-5 h-5" />,
  trees: <Trees className="w-5 h-5" />,
  footprints: <Footprints className="w-5 h-5" />,
  shield: <Shield className="w-5 h-5" />,
  camera: <Camera className="w-5 h-5" />,
  zap: <Zap className="w-5 h-5" />,
  car: <Car className="w-5 h-5" />,
  plug: <Plug className="w-5 h-5" />,
  droplets: <Droplets className="w-5 h-5" />,
  sun: <Sun className="w-5 h-5" />,
  sparkles: <Sparkles className="w-5 h-5" />,
  briefcase: <Briefcase className="w-5 h-5" />,
  bell: <Bell className="w-5 h-5" />,
  layout: <Building className="w-5 h-5" />,
  heart: <Sparkles className="w-5 h-5" />,
  film: <Film className="w-5 h-5" />,
  coffee: <Coffee className="w-5 h-5" />,
  cpu: <Cpu className="w-5 h-5" />,
  leaf: <Leaf className="w-5 h-5" />,
};

// Icon mapping for proximity types
const proximityIcons: Record<string, React.ReactNode> = {
  education: <GraduationCap className="w-5 h-5" />,
  healthcare: <Hospital className="w-5 h-5" />,
  shopping: <ShoppingBag className="w-5 h-5" />,
  transport: <Train className="w-5 h-5" />,
  leisure: <Palmtree className="w-5 h-5" />,
  business: <Briefcase className="w-5 h-5" />,
};

const proximityLabels: Record<string, string> = {
  education: 'Education',
  healthcare: 'Healthcare',
  shopping: 'Shopping',
  transport: 'Transport',
  leisure: 'Leisure',
  business: 'Business',
};

const amenityCategoryLabels: Record<string, string> = {
  lifestyle: 'Lifestyle',
  sports: 'Sports & Fitness',
  convenience: 'Convenience',
  safety: 'Safety & Security',
  sustainability: 'Sustainability',
};

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [activeFloorPlan, setActiveFloorPlan] = useState(0);
  const { selectedProject: project, isLoading, fetchProjectBySlug } = useProjectStore();

  // const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  // const [isLoading, setIsLoading] = useState(true);

  // Preloader state
  const [showPreloader, setShowPreloader] = useState(true);

  // Fetch project data
  useEffect(() => {
    const loadData = async () => {
      if (!slug) return;

      await fetchProjectBySlug(slug);

      // Fetch related projects (simple implementation: fetch a few others)
      // Ideally we would fetch by specific IDs if they exist in property.relatedProjects
      // For now, let's fetch recent projects and exclude current one
      // We can use the store's project list if already populated, or fetch fresh.
      // For simplicity, let's call the service directly for related projects or use store actions if available.
      // Since we want to keep `relatedProjects` local, we can just call the service here 
      // OR better, rely on store.projects if loaded.

      try {
        const allProjects = await fetchProjects();
        // We need the ID of the current project, but `project` from store might not be set immediately 
        // due to async nature or closure. 
        // Actually `fetchProjectBySlug` in store updates `selectedProject`.
        // We can't easily get the ID here without subscribing or awaiting properly.
        // But `fetchProjects` returns data.
        const related = allProjects
          .filter(p => p.slug !== slug) // Filter by slug instead of ID if ID is cleaner
          .slice(0, 2);
        setRelatedProjects(related);
      } catch (e) {
        console.error("Error fetching related projects", e);
      }
    };

    loadData();
  }, [slug, fetchProjectBySlug]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex h-[80vh] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="text-muted-foreground animate-pulse">Loading project details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
          <h1 className="font-serif text-3xl text-foreground mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The project you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-gold text-primary-foreground rounded-full font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>
      </Layout>
    );
  }

  const statusColors = {
    completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'in-progress': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    planning: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };

  const statusLabels = {
    completed: 'Completed',
    'in-progress': 'In Progress',
    planning: 'Planning',
  };

  const phaseStatusIcons = {
    completed: <Check className="w-4 h-4" />,
    'in-progress': <Circle className="w-4 h-4 fill-current" />,
    upcoming: <Circle className="w-4 h-4" />,
  };

  // Group amenities by category
  const amenitiesByCategory = project.amenities.reduce((acc, amenity) => {
    if (!acc[amenity.category]) {
      acc[amenity.category] = [];
    }
    acc[amenity.category].push(amenity);
    return acc;
  }, {} as Record<string, Amenity[]>);

  // Group proximity by type
  const proximityByType = project.proximity.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {} as Record<string, ProximityItem[]>);

  return (
    <>
      <AnimatePresence mode="wait">
        {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
      </AnimatePresence>
      <Layout removeTopPadding={true}>
        {/* Breadcrumb Navigation - Absolute on top for transparency if needed, or relative below header */}

        {/* Hero Section */}
        <section className="relative">
          {/* Hero Image or Fallback */}
          <div className="relative h-[50vh] md:h-[70vh] overflow-hidden bg-gradient-gold">
            {project.heroImage ? (
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2 }}
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-gold flex items-center justify-center">
                {/* Optional Pattern or texture could go here */}
                <Sparkles className="w-20 h-20 text-white/20" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

            {/* Action Buttons */}
            <div className="absolute top-6 right-6 flex items-center gap-3">
              {project.videoUrl && (
                <button
                  onClick={() => setShowVideo(true)}
                  className="flex items-center gap-2 px-4 py-2 glass rounded-full text-foreground hover:bg-card/90 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  <span className="text-sm font-medium hidden sm:inline">Watch Video</span>
                </button>
              )}
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-full glass transition-colors ${isLiked ? 'text-red-400' : 'text-foreground'}`}
                aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={() => navigator.share?.({ title: project.title, url: window.location.href })}
                className="p-3 rounded-full glass text-foreground hover:bg-card/90 transition-colors"
                aria-label="Share project"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Project Title Overlay */}
          <div className="container mx-auto px-6 lg:px-8 -mt-32 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-sm font-medium tracking-wider uppercase text-primary">
                  {project.category}
                </span>
                <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[project.status]}`}>
                  {statusLabels[project.status]}
                </span>
                {project.featured && (
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-gold text-primary-foreground">
                    Featured
                  </span>
                )}
              </div>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-3">
                {project.title}
              </h1>
              <p className="font-serif text-xl md:text-2xl text-muted-foreground italic mb-4">
                {project.subtitle}
              </p>

              {/* Quick Info Pills */}
              <div className="flex flex-wrap items-center gap-3 mt-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-card/80 rounded-full text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-card/80 rounded-full text-sm">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{project.year}</span>
                </div>
                {project.priceRange && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-card/80 rounded-full text-sm">
                    <span className="text-primary font-medium">{project.priceRange}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Video Modal */}
        <AnimatePresence>
          {showVideo && project.videoUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4"
              onClick={() => setShowVideo(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative w-full max-w-4xl aspect-video bg-card rounded-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <iframe
                  src={project.videoUrl}
                  className="w-full h-full"
                  allowFullScreen
                  title={`${project.title} video`}
                />
                <button
                  onClick={() => setShowVideo(false)}
                  className="absolute top-4 right-4 p-2 bg-background/80 rounded-full"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-16">

                {/* Overview Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-gold rounded-full" />
                    <h2 className="font-serif text-2xl md:text-3xl text-foreground">Overview</h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {project.fullDescription}
                  </p>

                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="p-4 bg-gradient-card rounded-xl border border-border text-center">
                        <div className="font-serif text-2xl md:text-3xl text-gradient-gold">{metric.value}</div>
                        <div className="text-sm text-muted-foreground mt-1">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Image Gallery */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-gold rounded-full" />
                    <h2 className="font-serif text-2xl md:text-3xl text-foreground">Gallery</h2>
                  </div>

                  {/* Main Image */}
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
                    <img
                      src={project.images[activeImageIndex].url}
                      alt={project.images[activeImageIndex].alt}
                      className="w-full h-full object-cover"
                    />
                    {project.images[activeImageIndex].caption && (
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent">
                        <p className="text-sm text-muted-foreground">
                          {project.images[activeImageIndex].caption}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Thumbnails */}
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {project.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${activeImageIndex === index
                          ? 'border-primary ring-2 ring-primary/30'
                          : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        aria-label={`View ${image.alt}`}
                      >
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Amenities Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-gold rounded-full" />
                    <h2 className="font-serif text-2xl md:text-3xl text-foreground">Amenities & Facilities</h2>
                  </div>
                  <p className="text-muted-foreground">
                    Experience world-class amenities designed for modern living
                  </p>

                  <Tabs defaultValue={Object.keys(amenitiesByCategory)[0]} className="w-full">
                    <TabsList className="flex flex-wrap gap-2 bg-transparent h-auto p-0 mb-6">
                      {Object.keys(amenitiesByCategory).map((category) => (
                        <TabsTrigger
                          key={category}
                          value={category}
                          className="px-4 py-2 rounded-full border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary"
                        >
                          {amenityCategoryLabels[category]}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {Object.entries(amenitiesByCategory).map(([category, amenities]) => (
                      <TabsContent key={category} value={category} className="mt-0">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {amenities.map((amenity) => (
                            <div
                              key={amenity.name}
                              className="flex flex-col items-center gap-3 p-4 bg-gradient-card rounded-xl border border-border hover:border-primary/30 transition-colors text-center"
                            >
                              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                {amenityIcons[amenity.icon] || <Sparkles className="w-5 h-5" />}
                              </div>
                              <span className="text-sm text-foreground">{amenity.name}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </motion.div>

                {/* Location & Proximity Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-gold rounded-full" />
                    <h2 className="font-serif text-2xl md:text-3xl text-foreground">Location Advantages</h2>
                  </div>
                  <p className="text-muted-foreground">
                    Strategically located with easy access to essential amenities
                  </p>

                  {/* Address */}
                  <div className="p-4 bg-gradient-card rounded-xl border border-border">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium text-foreground">{project.title}</div>
                        <div className="text-muted-foreground text-sm">{project.address}</div>
                      </div>
                    </div>
                  </div>

                  {/* Proximity by Category */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(proximityByType).map(([type, items]) => (
                      <div key={type} className="space-y-3">
                        <div className="flex items-center gap-2 text-primary">
                          {proximityIcons[type]}
                          <h3 className="font-medium">{proximityLabels[type]}</h3>
                        </div>
                        <div className="space-y-2">
                          {items.map((item) => (
                            <div
                              key={item.name}
                              className="flex items-center justify-between p-3 bg-gradient-card rounded-lg border border-border"
                            >
                              <span className="text-foreground text-sm">{item.name}</span>
                              <div className="text-right">
                                <div className="text-primary text-sm font-medium">{item.distance}</div>
                                {item.duration && (
                                  <div className="text-muted-foreground text-xs">{item.duration}</div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Floor Plans Section */}
                {project.floorPlans.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-8 bg-gradient-gold rounded-full" />
                      <h2 className="font-serif text-2xl md:text-3xl text-foreground">Floor Plans & Pricing</h2>
                    </div>
                    <p className="text-muted-foreground">
                      Choose from a variety of thoughtfully designed layouts
                    </p>

                    {/* Floor Plan Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.floorPlans.map((plan, index) => (
                        <button
                          key={plan.name}
                          onClick={() => setActiveFloorPlan(index)}
                          className={`px-4 py-2 rounded-full border transition-all ${activeFloorPlan === index
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'border-border text-muted-foreground hover:border-primary/50'
                            }`}
                        >
                          {plan.type}
                        </button>
                      ))}
                    </div>

                    {/* Active Floor Plan Details */}
                    <div className="p-6 bg-gradient-card rounded-xl border border-border">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                          <h3 className="font-serif text-2xl text-foreground mb-2">
                            {project.floorPlans[activeFloorPlan].name}
                          </h3>
                          <p className="text-muted-foreground">
                            {project.floorPlans[activeFloorPlan].type}
                          </p>

                          <div className="flex flex-wrap gap-4 mt-4">
                            <div className="flex items-center gap-2">
                              <Maximize className="w-4 h-4 text-primary" />
                              <span>{project.floorPlans[activeFloorPlan].size}</span>
                            </div>
                            {project.floorPlans[activeFloorPlan].bedrooms > 0 && (
                              <div className="flex items-center gap-2">
                                <BedDouble className="w-4 h-4 text-primary" />
                                <span>{project.floorPlans[activeFloorPlan].bedrooms} Beds</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <Bath className="w-4 h-4 text-primary" />
                              <span>{project.floorPlans[activeFloorPlan].bathrooms} Baths</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          {project.floorPlans[activeFloorPlan].price && (
                            <>
                              <div className="text-sm text-muted-foreground">Price</div>
                              <div className="font-serif text-3xl text-gradient-gold">
                                {project.floorPlans[activeFloorPlan].price}
                              </div>
                            </>
                          )}
                          <a
                            href="#enquiry"
                            className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 bg-gradient-gold text-primary-foreground rounded-full text-sm font-medium hover:shadow-gold transition-shadow"
                          >
                            Enquire Now
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* All Floor Plans Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                      {project.floorPlans.map((plan, index) => (
                        <button
                          key={plan.name}
                          onClick={() => setActiveFloorPlan(index)}
                          className={`p-4 rounded-xl border transition-all text-left ${activeFloorPlan === index
                            ? 'border-primary bg-primary/5'
                            : 'border-border bg-gradient-card hover:border-primary/30'
                            }`}
                        >
                          <div className="font-medium text-foreground">{plan.name}</div>
                          <div className="text-sm text-muted-foreground">{plan.type} • {plan.size}</div>
                          {plan.price && (
                            <div className="text-primary font-medium mt-2">{plan.price}</div>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Specifications Section */}
                {project.specifications.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-8 bg-gradient-gold rounded-full" />
                      <h2 className="font-serif text-2xl md:text-3xl text-foreground">Specifications</h2>
                    </div>
                    <p className="text-muted-foreground">
                      Premium materials and finishes throughout
                    </p>

                    <div className="space-y-4">
                      {project.specifications.map((spec) => (
                        <div key={spec.category} className="bg-gradient-card rounded-xl border border-border overflow-hidden">
                          <div className="p-4 border-b border-border bg-muted/20">
                            <h3 className="font-medium text-foreground">{spec.category}</h3>
                          </div>
                          <div className="divide-y divide-border">
                            {spec.items.map((item) => (
                              <div key={item.label} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-2">
                                <span className="text-muted-foreground">{item.label}</span>
                                <span className="text-foreground font-medium">{item.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Project Timeline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-gold rounded-full" />
                    <h2 className="font-serif text-2xl md:text-3xl text-foreground">Project Timeline</h2>
                  </div>

                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

                    <div className="space-y-6">
                      {project.phases.map((phase, index) => (
                        <div key={phase.name} className="relative flex gap-6 pl-12">
                          {/* Status Icon */}
                          <div className={`absolute left-2 w-5 h-5 rounded-full flex items-center justify-center ${phase.status === 'completed'
                            ? 'bg-emerald-500 text-emerald-950'
                            : phase.status === 'in-progress'
                              ? 'bg-amber-500 text-amber-950'
                              : 'bg-muted text-muted-foreground'
                            }`}>
                            {phaseStatusIcons[phase.status]}
                          </div>

                          <div className="flex-1 pb-6">
                            <div className="flex flex-wrap items-center gap-3 mb-1">
                              <h3 className="font-medium text-foreground">{phase.name}</h3>
                              {phase.date && (
                                <span className="text-xs text-muted-foreground">{phase.date}</span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{phase.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* FAQs Section */}
                {project.faqs.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-8 bg-gradient-gold rounded-full" />
                      <h2 className="font-serif text-2xl md:text-3xl text-foreground">Frequently Asked Questions</h2>
                    </div>

                    <Accordion type="single" collapsible className="space-y-3">
                      {project.faqs.map((faq, index) => (
                        <AccordionItem
                          key={index}
                          value={`faq-${index}`}
                          className="bg-gradient-card rounded-xl border border-border px-4"
                        >
                          <AccordionTrigger className="text-left hover:no-underline py-4">
                            <span className="text-foreground font-medium pr-4">{faq.question}</span>
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground pb-4">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </motion.div>
                )}

                {/* Testimonial */}
                {project.testimonial && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative p-8 bg-gradient-card rounded-xl border border-border"
                  >
                    <Quote className="absolute top-6 left-6 w-10 h-10 text-primary/30" />
                    <blockquote className="relative z-10 pl-8">
                      <p className="font-serif text-xl text-foreground italic mb-6">
                        "{project.testimonial.quote}"
                      </p>
                      <footer>
                        <div className="font-medium text-foreground">{project.testimonial.author}</div>
                        <div className="text-sm text-muted-foreground">{project.testimonial.role}</div>
                      </footer>
                    </blockquote>
                  </motion.div>
                )}

                {/* Related Projects */}
                {relatedProjects.length > 0 && (
                  <section className="py-12 border-t border-border mt-12">
                    <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
                      Other Projects You May Like
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {relatedProjects.map((relatedProject, index) => (
                        <ProjectCard key={relatedProject.id} project={relatedProject} index={index} />
                      ))}
                    </div>
                  </section>
                )}

              </div>

              {/* Right Column - Enquiry Form (Sticky) */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div id="enquiry" className="bg-card border border-border rounded-xl p-6 shadow-lg">
                    <h3 className="font-serif text-2xl text-foreground mb-4">Interested?</h3>
                    <p className="text-muted-foreground mb-6">
                      Request a callback or schedule a site visit for {project.title}.
                    </p>

                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Name</label>
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
                        <input
                          type="tel"
                          placeholder="Your Number"
                          className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Email (Optional)</label>
                        <input
                          type="email"
                          placeholder="Your Email"
                          className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Message</label>
                        <textarea
                          placeholder="I am interested in..."
                          rows={4}
                          className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-gradient-gold text-primary-foreground rounded-lg font-medium hover:shadow-gold transition-shadow"
                      >
                        Request Callback
                      </button>

                      <p className="text-xs text-center text-muted-foreground mt-4">
                        By submitting, you agree to our privacy policy.
                      </p>
                    </form>

                    <div className="mt-8 pt-6 border-t border-border">
                      <div className="flex items-center justify-center gap-2 text-primary font-medium mb-2">
                        <Phone className="w-4 h-4" />
                        <span>+91 98765 43210</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
                        <Mail className="w-4 h-4" />
                        <span>sales@realabodes.com</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
