
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Building2, Home, Trees, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Data for the property types
// Data for the property types
// Data for the property types
const propertyTypes = [
    {
        id: 'apartments',
        title: 'Modern Apartments',
        description: 'Elevated homes tailored for those who seek more. Experience intelligent design, breathtaking views, and a community that inspires.',
        features: ['Panoramic Views', 'Smart Living', '24/7 Concierge', 'Premium Finish'],
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
        icon: Building2,
        color: 'from-blue-600 to-blue-900',
        count: '50+'
    },
    {
        id: 'villas',
        title: 'Luxury Villas',
        description: 'Your personal retreat from the world. Independent villas that blend luxury with nature, offering unmatched privacy and space.',
        features: ['Private Gardens', 'Exclusive Access', 'Bespoke Interiors', 'Serene Environs'],
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
        icon: Home,
        color: 'from-amber-600 to-amber-900',
        count: '30+'
    },
    {
        id: 'plots',
        title: 'Premium Plots',
        description: 'A solid foundation for your vision. Premium NA plots in strategic locations, ready for you to build your dream or grow your wealth.',
        features: ['Clear Titles', 'Prime Location', 'Infra Ready', 'High Appreciation'],
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
        icon: Trees,
        color: 'from-emerald-600 to-emerald-900',
        count: '20+'
    }
];

export function PropertyTypesSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    const [activeTextIndex, setActiveTextIndex] = useState(0);

    // Dynamic Clip Path Animation
    // 0 -> 0.15: Expand from rounded box (10% inset) to full screen (0% inset)
    const clipPath = useTransform(
        scrollYProgress,
        [0, 0.15],
        ['inset(10% 10% 10% 10% round 100px)', 'inset(0% 0% 0% 0% round 0px)']
    );


    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Text Entrance Synchronization:
        // Title should begin fade/blur-to-clear exactly when mask reaches 50% expansion. 
        // 50% of 0.15 expansion range is 0.075.

        if (latest < 0.075) {
            // Before 50% expansion - Text HIDDEN (or at least index 0 is not yet triggered effectively if we treated 0 as 'pre-start')
            // However, our TextBlock logic currently shows index 0 immediately if activeTextIndex is 0.
            // To strictly follow "Title should begin... when container mask reaches 50%", we might need a "null" or "-1" state if we want it completely hidden before. 
            // But usually index 0 is just visible. 
            // Let's assume the user wants the *transition* to happen there. 
            // If we want it to 'enter', it must be *not* entering before.

            // Let's introduce a -1 state for 'not yet started' if strict sync is needed.
            if (activeTextIndex !== -1) setActiveTextIndex(-1);
        } else if (latest < 0.35) {
            // After 50% expansion (0.075) but before next card
            if (activeTextIndex !== 0) setActiveTextIndex(0);
        } else if (latest < 0.68) {
            if (activeTextIndex !== 1) setActiveTextIndex(1);
        } else {
            if (activeTextIndex !== 2) setActiveTextIndex(2);
        }
    });

    return (
        <section ref={containerRef} className="relative h-[400vh]" data-scroll-section>
            <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

                <motion.div
                    style={{ clipPath }}
                    className="relative w-full h-full"
                >
                    {/* Layer 1: Full Screen Background Images */}
                    <div className="absolute inset-0 w-full h-full z-0">
                        {propertyTypes.map((type, index) => (
                            <ImageBackground
                                key={type.id}
                                data={type}
                                index={index}
                                scrollYProgress={scrollYProgress}
                            />
                        ))}
                    </div>

                    {/* Layer 2: Floating Text Card (Desktop) */}
                    <div className="hidden md:flex absolute inset-0 z-10 items-center pointer-events-none">
                        <div className="container mx-auto px-6 lg:px-8">
                            <div className="w-full max-w-[600px] bg-primary/95 backdrop-blur-sm p-10 rounded-3xl border border-white/10 shadow-2xl pointer-events-auto">
                                <div className="relative h-[450px]">
                                    <AnimatePresence mode="popLayout">
                                        {propertyTypes.map((type, index) => (
                                            activeTextIndex === index && (
                                                <TextBlock
                                                    key={type.id}
                                                    data={type}
                                                    index={index}
                                                />
                                            )
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Layout (Floating card style adapted) */}
                    <div className="md:hidden absolute inset-0 z-10 pointer-events-none flex items-end">
                        {/* We can't do the full sticky effect easily on mobile with this height.
                             We'll stick to the previous mobile implementation but styled to match.
                             Actually, let's keep the previous mobile section logic which effectively overlays this.
                         */}
                    </div>

                </motion.div>

            </div>

            {/* Mobile Content (Overlay - Visible only on mobile) */}
            <div className="md:hidden absolute inset-0 bg-background flex flex-col">
                <div className="py-12 px-6">
                    <div className="mb-8 text-center">
                        <span className="text-sm font-medium tracking-wider uppercase text-accent mb-2 block">
                            Our Expertise
                        </span>
                        <h2 className="font-serif text-3xl text-foreground">
                            Find Your Space
                        </h2>
                    </div>

                    <div className="space-y-8">
                        {propertyTypes.map((type) => (
                            <div key={type.id} className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-lg">
                                <img
                                    src={type.image}
                                    alt={type.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />

                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 rounded-lg bg-accent text-primary">
                                            <type.icon size={20} />
                                        </div>
                                        <h3 className="text-2xl font-serif">{type.title}</h3>
                                    </div>
                                    <p className="text-white/80 text-sm mb-4 line-clamp-2">
                                        {type.description}
                                    </p>
                                    <Button variant="secondary" size="sm" className="w-full bg-white text-primary hover:bg-white/90">
                                        Explore <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
}

// Sub-component for Background Images
function ImageBackground({ data, index, scrollYProgress }: { data: any, index: number, scrollYProgress: MotionValue<number> }) {
    // Logic for slide/reveal
    // Same stagger logic as before for consistency
    const startRange = index === 1 ? 0.25 : 0.58;
    const endRange = index === 1 ? 0.40 : 0.73;

    // Use clipPath inset for the "reveal" effect instead of just moving Y, 
    // creating a "wiping" effect or "stacking" effect.
    // Or simple Y translation like cards.
    const y = useTransform(
        scrollYProgress,
        [startRange, endRange],
        ['100%', '0%']
    );

    // Scale for a slight zoom effect
    const scale = useTransform(scrollYProgress, [startRange, endRange], [1.1, 1]);

    // Parallax effect: Move image slightly up/down as we scroll through the section
    // We use the full range [0, 1] so it moves continuously throughout the section
    const parallaxY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);


    const zIndex = index;
    const isBase = index === 0;

    return (
        <motion.div
            style={{
                y: isBase ? 0 : y,
                zIndex
            }}
            className="absolute inset-0 w-full h-full overflow-hidden"
        >
            <motion.img
                style={{
                    scale: isBase ? 1 : scale,
                    y: parallaxY
                }}
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover"
            />
            {/* Dark overlay to ensure text readability on the left if needed outside the card? 
                The card has its own background, so maybe just a subtle one. 
            */}
            <div className="absolute inset-0 bg-black/20" />
        </motion.div>
    );
}


// Sub-component for desktop text animations
// Sub-component for desktop text animations
function TextBlock({ data, index }: { data: any, index: number }) {
    // Staggered animation variants
    const containerVariants = {
        hidden: {
            opacity: 0,
            filter: "blur(10px)",
        },
        visible: {
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                duration: 0.5,
                staggerChildren: 0.1,
                delayChildren: 0
            }
        },
        exit: {
            opacity: 0,
            filter: "blur(10px)",
            transition: {
                duration: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            filter: "blur(10px)",
            y: 0
        },
        visible: {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            transition: { duration: 0.5 }
        },
        exit: {
            opacity: 0,
            filter: "blur(10px)",
            y: 0,
            transition: { duration: 0.3 }
        }
    };

    const linkVariants = {
        hidden: {
            opacity: 0,
            y: 20
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 0.2 }
        },
        exit: {
            opacity: 0,
            y: 0,
            transition: { duration: 0.3 }
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 flex flex-col justify-center"
        >
            <motion.span
                variants={itemVariants}
                className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-6 block"
            >
                Our Expertise
            </motion.span>

            <motion.h3
                variants={itemVariants}
                className="text-4xl md:text-5xl font-serif text-white mb-6"
            >
                {data.title}
            </motion.h3>

            <motion.div variants={itemVariants} className="flex items-baseline gap-3 mb-6">
                <span className="text-5xl md:text-6xl font-bold text-accent font-serif">
                    {data.count}
                </span>
                <span className="text-white/60 text-lg uppercase tracking-wider font-medium">
                    Available
                </span>
            </motion.div>

            <motion.p
                variants={itemVariants}
                className="text-lg text-white/80 mb-8 leading-relaxed max-w-md"
            >
                {data.description}
            </motion.p>

            <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 gap-4 mb-10"
            >
                {data.features.map((feature: string) => (
                    <div key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent" />
                        <span className="text-white/90 text-sm">{feature}</span>
                    </div>
                ))}
            </motion.div>

            <motion.div variants={linkVariants}>
                <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 border-0 font-medium">
                    View {data.title} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </motion.div>
        </motion.div>
    );
}

