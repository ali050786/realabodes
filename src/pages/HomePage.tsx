import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Preloader } from '@/components/ui/Preloader';
import { Layout } from '@/components/layout/Layout';
import {
  ArrowRight,
  Building2,
  Home,
  MapPin,
  Trees,
  Shield,
  Users,
  Award,
  Phone,
  CheckCircle2,
  Star,
  ChevronRight,
  Play,
  ChevronDown,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { projects, budgetRanges, serviceAreas } from '@/lib/projects-data';
import { PropertyTypesSection } from '@/components/home/PropertyTypesSection';
import { FeaturedProjectsStack } from '@/components/home/FeaturedProjectsStack';
import { BuyingJourneyParallax } from '@/components/home/BuyingJourneyParallax';
import { TrustSignalsSection } from '@/components/home/TrustSignalsSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { ServiceAreasSection } from '@/components/home/ServiceAreasSection';

// ... (log entries)

// ... (constants: propertyTypes, trustSignals, testimonials, buyingSteps, serviceAreas)






// ImplementationLog
// Date: 2026-01-28
// WHAT: Added background video to the hero section
// WHY: To enhance visual appeal and user engagement with dynamic content
// Date: 2026-01-28
// WHAT: Added animated SVG overlay to Hero section
// WHY: To match the design of the reference static site provided by the user
// Date: 2026-01-28
// WHAT: Removed background overlays and fixed Hero height
// WHY: User requested to remove gradients and ensure SVG/Hero is 100% height (h-screen)
// Date: 2026-01-28
// WHAT: Added 20% blue overlay to Hero section
// WHY: To improve content visibility against the video background as requested
// Date: 2026-01-28
// WHAT: Fixed SVG height issue
// WHY: SVG was not covering the full height properly. Reference checks showed strict styling needs.
// HOW: Applied inline styles for height: 100%, objectFit: cover, and will-change: transform to mimic the 'svg-fix' and 'background--cover' classes from reference.
// Date: 2026-01-28
// WHAT: Increased opacity of hero section blue overlay from 20% to 40%
// WHY: User requested to increase visibility of the blue background
// HOW: Changed Tailwind class `bg-primary/20` to `bg-primary/40`
// Date: 2026-01-28
// WHAT: Replaced Property Types grid with interactive PropertyTypesSection component
// WHY: Requested by user to add a sticky scroll animation for better engagement.
// HOW: Implemented PropertyTypesSection with useScroll and sticky positioning, replacing the static grid.



export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const [activePropertyType, setActivePropertyType] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const propertyTypes = ['Any', 'Apartments', 'Villas', 'Plots'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const category = propertyTypes[activePropertyType];
    const params = new URLSearchParams();

    if (category && category !== 'Any') params.set('category', category);
    if (selectedBudget && selectedBudget !== 'All Budgets') params.set('budget', selectedBudget);
    if (selectedLocation && selectedLocation !== 'All Locations') params.set('location', selectedLocation);

    navigate(`/projects?${params.toString()}`);
  };





  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <Layout removeTopPadding={true}>
        {/* Hero Section - Single Column with Accordion Form */}
        <section ref={heroRef} className="fixed inset-0 w-screen h-screen flex items-center overflow-hidden z-0" data-scroll-section>
          {/* Background Video */}
          <div className="absolute inset-0 w-full h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/assets/5856675_Family_At_Home_1280x720.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Blue Overlay (40%) */}
          <div className="absolute inset-0 bg-primary/40 z-10" />

          {/* Desktop SVG Overlay */}
          <motion.svg
            className="absolute inset-0 w-full h-full hidden md:block pointer-events-none z-10"
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              willChange: 'transform',
              backfaceVisibility: 'hidden'
            }}
            width="1440"
            height="820"
            viewBox="0 0 1440 820"
            fill="none"
            preserveAspectRatio="xMidYMin slice"
          >
            <defs>
              <linearGradient id="paint0_linear_desktop" x1="1239.5" y1="253.5" x2="1192.18" y2="91.1199" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="paint1_linear_desktop" x1="620.375" y1="538.15" x2="799.229" y2="-41.2021" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="paint2_linear_desktop" x1="637" y1="1303.5" x2="644.403" y2="755.519" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="paint3_linear_desktop" x1="461" y1="264" x2="371.306" y2="672.546" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>

            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              d="M986 15V171.961C986 186.355 986.938 234.855 1025.06 265.832C1056.07 291.026 1094.44 299 1136 299C1177.56 299 1215.93 291.026 1246.94 265.832C1285.06 234.855 1286 186.355 1286 171.961V-280"
              stroke="url(#paint0_linear_desktop)"
              strokeWidth="1.3"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.2 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.7 }}
              d="M536 -344V345.859C536 374.653 537.875 471.678 614.125 533.648C676.139 584.048 752.875 600 836 600C919.125 600 995.861 584.048 1057.88 533.648C1134.12 471.678 1136 374.653 1136 345.859V-344"
              stroke="url(#paint1_linear_desktop)"
              strokeOpacity="0.2"
              strokeWidth="1.3"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.9 }}
              d="M416 548V1100.11C416 1123.15 417.5 1200.8 478.5 1250.4C528.111 1290.73 589.5 1303.5 656 1303.5C722.5 1303.5 783.889 1290.73 833.5 1250.4C894.5 1200.8 896 1123.15 896 1100.11V548"
              stroke="url(#paint2_linear_desktop)"
              strokeOpacity="0.3"
              strokeWidth="1.3"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 1.1 }}
              d="M-81.5 1631.53V710.356C-81.5 671.907 -78.9969 542.35 22.7969 459.6C105.586 392.3 208.028 371 319 371C429.972 371 532.414 392.3 615.203 459.6C716.997 542.35 719.5 671.907 719.5 710.356V1704.18"
              stroke="url(#paint3_linear_desktop)"
              strokeOpacity="0.8"
              strokeWidth="1.3"
              vectorEffect="non-scaling-stroke"
            />
          </motion.svg>

          {/* Mobile SVG Overlay */}
          <motion.svg
            className="absolute inset-0 w-full h-full object-cover md:hidden pointer-events-none z-0"
            width="360"
            height="640"
            viewBox="0 0 360 640"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="paint0_linear_mobile" x1="458" y1="92.3299" x2="432.71" y2="5.54693" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="paint1_linear_mobile" x1="127.113" y1="244.459" x2="222.7" y2="-65.1716" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="paint2_linear_mobile" x1="102" y1="89.5" x2="59.2726" y2="468.693" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="white" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              d="M322.519 -35.1349V48.7521C322.519 56.4446 323.02 82.3651 343.395 98.9208C359.967 112.386 380.473 116.647 402.685 116.647C424.898 116.647 445.404 112.386 461.975 98.9208C482.351 82.3651 482.852 56.4446 482.852 48.7521V-192.796"
              stroke="url(#paint0_linear_mobile)"
              strokeWidth="1.3"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.2 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.7 }}
              d="M82.019 -227V141.691C82.019 157.08 83.0211 208.934 123.772 242.053C156.915 268.989 197.926 277.515 242.352 277.515C286.778 277.515 327.789 268.989 360.932 242.053C401.683 208.934 402.685 157.08 402.685 141.691V-227"
              stroke="url(#paint1_linear_mobile)"
              strokeOpacity="0.2"
              strokeWidth="1.3"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.9 }}
              d="M-248 828.809V336.494C-248 315.945 -246.662 246.704 -192.259 202.479C-148.013 166.511 -93.2636 155.127 -33.9553 155.127C25.3529 155.127 80.1026 166.511 124.349 202.479C178.752 246.704 180.089 315.945 180.089 336.494V867.638"
              stroke="url(#paint2_linear_mobile)"
              strokeOpacity="0.8"
              strokeWidth="1.3"
              vectorEffect="non-scaling-stroke"
            />
          </motion.svg>

          {/* Decorative elements (Blurs) - Keeping original but subduing or moving below SVG */}
          <div className="absolute top-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl z-0" />
          <div className="absolute bottom-20 left-10 w-64 h-64 bg-accent/5 rounded-full blur-2xl z-0" />

          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto">
              <div className="text-white text-center">
                {/* Collapsible Hero Content */}
                <AnimatePresence mode="wait">
                  {!isFormOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                        <MapPin className="w-4 h-4 text-accent" />
                        Serving Pune, PCMC & PMC Zones
                      </span>

                      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                        Opening Doors to a{' '}
                        <span className="text-accent">Better Living</span>
                      </h1>

                      <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-xl mx-auto">
                        Your trusted partner in finding the perfect home. We deal in apartments,
                        villas, and plots across Pune's prime locations with complete transparency.
                      </p>

                      {/* Quick Action Buttons */}
                      <div className="flex flex-wrap justify-center gap-4 mb-10">
                        <Button
                          size="lg"
                          className="bg-accent text-primary hover:bg-accent/90 group"
                          asChild
                        >
                          <Link to="/projects">
                            View All Projects
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                        <Button
                          size="lg"
                          className="border border-accent text-accent bg-accent/10 backdrop-blur-md hover:bg-accent/20 transition-all duration-300"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Talk to Expert
                        </Button>
                      </div>

                      {/* Trust badges */}
                      <div className="flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm mb-10">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-accent" />
                          <span>RERA Verified</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-accent" />
                          <span>500+ Families</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-accent" />
                          <span>Free Consultation</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Accordion Form - Glass Effect */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="max-w-2xl mx-auto"
                >
                  <div
                    className={`backdrop-blur-sm bg-primary/95 border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 ${isFormOpen ? 'shadow-2xl' : 'shadow-lg'
                      }`}
                  >
                    {/* Accordion Header */}
                    <button
                      onClick={() => setIsFormOpen(!isFormOpen)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                          <Search className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-serif text-xl text-white">Find Your Dream Home</h3>
                          <p className="text-white/60 text-sm">Tell us what you're looking for</p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isFormOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-6 h-6 text-accent" />
                      </motion.div>
                    </button>

                    {/* Accordion Content */}
                    <AnimatePresence>
                      {isFormOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2">
                            <form onSubmit={handleSearch} className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">I'm looking for</label>
                                <div className="grid grid-cols-4 gap-2">
                                  {propertyTypes.map((type, i) => (
                                    <button
                                      key={type}
                                      type="button"
                                      onClick={() => setActivePropertyType(i)}
                                      className={`py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${activePropertyType === i
                                        ? 'bg-accent text-primary'
                                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                                        }`}
                                    >
                                      {type}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">Budget Range</label>
                                <select
                                  value={selectedBudget}
                                  onChange={(e) => setSelectedBudget(e.target.value)}
                                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 backdrop-blur-sm [&>option]:bg-primary"
                                >
                                  <option value="">Any Budget</option>
                                  {budgetRanges.filter(b => b !== 'All Budgets').map(range => (
                                    <option key={range} value={range}>{range}</option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-white/80 mb-2">Preferred Location</label>
                                <select
                                  value={selectedLocation}
                                  onChange={(e) => setSelectedLocation(e.target.value)}
                                  className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 backdrop-blur-sm [&>option]:bg-primary"
                                >
                                  <option value="">Any Location</option>
                                  {serviceAreas.filter(l => l !== 'All Locations').map(area => (
                                    <option key={area} value={area}>{area}</option>
                                  ))}
                                </select>
                              </div>

                              <Button type="submit" size="lg" className="w-full bg-accent text-primary hover:bg-accent/90">
                                Search Properties
                                <Search className="w-4 h-4 ml-2" />
                              </Button>
                            </form>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Property Types We Deal In */}
        {/* Property Types - Sticky Scroll Section */}
        <div className="relative z-10" style={{ marginTop: '100vh' }}>
          <PropertyTypesSection />

          {/* Featured Projects */}
          {/* Featured Projects - Horizontal Scroll */}
          {/* Featured Projects - Stacking Cards Section */}
          <FeaturedProjectsStack />



          {/* How We Work - Buying Journey - Parallax */}
          <BuyingJourneyParallax />

          {/* Why Choose Us - Trust Signals */}
          <TrustSignalsSection />

          {/* Testimonials */}
          <TestimonialsSection />

          {/* Service Areas */}
          <ServiceAreasSection />


        </div>
      </Layout>
    </>
  );
}
