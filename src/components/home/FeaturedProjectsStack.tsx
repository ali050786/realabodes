import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useFeaturedProjects } from '@/hooks/useFeaturedProjects';
import { projects as staticProjects } from '@/lib/projects-data'; // Fallback

export function FeaturedProjectsStack() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    const { projects, loading } = useFeaturedProjects();
    const displayProjects = loading || projects.length === 0 ? staticProjects.filter(p => p.featured).slice(0, 3) : projects.slice(0, 3);

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-primary" data-scroll-section>
            <div className="sticky top-0 h-screen overflow-hidden flex items-center">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                        {/* Left Column - Text Content */}
                        <div className="md:col-span-4 lg:col-span-5 text-white z-10">
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-sm font-medium tracking-wider uppercase text-accent mb-4 block"
                            >
                                Handpicked for You
                            </motion.span>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6"
                            >
                                Featured <span className="text-accent italic">Projects</span>
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-white/70 text-lg leading-relaxed mb-8"
                            >
                                Explore our exclusive collection of premium properties selected just for you.
                                Each residence is a masterpiece of design and comfort.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Button
                                    size="lg"
                                    className="bg-accent text-primary hover:bg-accent/90 rounded-full px-8"
                                    asChild
                                >
                                    <Link to="/projects">
                                        View All Projects <ArrowRight className="ml-2 w-4 h-4" />
                                    </Link>
                                </Button>
                            </motion.div>
                        </div>

                        {/* Right Column - Stacking Cards */}
                        <div className="md:col-span-8 lg:col-span-7 relative h-[600px] flex items-center justify-center perspective-1000">
                            <div className="relative w-full max-w-md aspect-[4/5]">
                                {displayProjects.map((project, index) => (
                                    <StackingCard
                                        key={project.id}
                                        project={project}
                                        index={index}
                                        total={displayProjects.length}
                                        scrollYProgress={scrollYProgress}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function StackingCard({ project, index, total, scrollYProgress }: { project: any, index: number, total: number, scrollYProgress: MotionValue<number> }) {
    // Animation Logic Refined
    // Total Scroll Progress: 0 to 1
    // We have 3 cards. 
    // Card 1 Entrance: 0.1 -> 0.35
    // Card 2 Entrance: 0.35 -> 0.65
    // Card 3 Entrance: 0.65 -> 0.95

    // Rotation Logic:
    // Card 1: 
    //   - At 0.35 (when C2 starts): rotates 0 -> -5
    //   - At 0.65 (when C3 starts): rotates -5 -> -10
    // Card 2:
    //   - At 0.65 (when C3 starts): rotates 0 -> -5

    // Entrance X: "150%" to "0%"

    const enterFrom = "150%";
    const center = "0%";

    let xRange = [0, 0];
    let xOutput = [enterFrom, enterFrom];
    let rotateRange = [0, 1];
    let rotateOutput = [0, 0];
    let opacityRange = [0, 1];
    let opacityOutput = [0, 0];

    // Card 1 (Index 0)
    if (index === 0) {
        // Enters first
        xRange = [0, 0.25];
        xOutput = [enterFrom, center];

        // Opacity
        opacityRange = [0, 0.1];
        opacityOutput = [0, 1];

        // Rotation
        // 0.25 -> 0.5 (C2 enters): 0 -> -5
        // 0.5 -> 0.75 (C3 enters): -5 -> -10
        rotateRange = [0.25, 0.5, 0.75];
        rotateOutput = [0, -5, -10];
    }
    // Card 2 (Index 1)
    else if (index === 1) {
        // Enters second
        xRange = [0.25, 0.5];
        xOutput = [enterFrom, center];

        // Opacity
        opacityRange = [0.25, 0.35];
        opacityOutput = [0, 1];

        // Rotation
        // 0.5 -> 0.75 (C3 enters): 0 -> -5
        rotateRange = [0.5, 0.75];
        rotateOutput = [0, -5];
    }
    // Card 3 (Index 2)
    else if (index === 2) {
        // Enters third
        xRange = [0.5, 0.75];
        xOutput = [enterFrom, center];

        // Opacity
        opacityRange = [0.5, 0.6];
        opacityOutput = [0, 1];

        // No rotation for top card
        rotateRange = [0, 1];
        rotateOutput = [0, 0];
    }

    const x = useTransform(scrollYProgress, xRange, xOutput);
    const opacity = useTransform(scrollYProgress, opacityRange, opacityOutput);
    const rotate = useTransform(scrollYProgress, rotateRange, rotateOutput);

    return (
        <motion.div
            style={{
                x,
                opacity,
                rotate,
                zIndex: index,
                transformOrigin: "bottom left"
            }}
            className="absolute top-0 left-0 w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/20"
        >
            <div className="relative h-full flex flex-col">
                <div className="relative h-[65%] overflow-hidden">
                    <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1 bg-accent text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                            {project.status?.replace('-', ' ') || 'Featured'}
                        </span>
                    </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between bg-white text-primary">
                    <div>
                        <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2 uppercase tracking-wide">
                            <MapPin className="w-3 h-3" />
                            {project.location}
                        </div>
                        <h3 className="font-serif text-2xl mb-1 text-primary">{project.title}</h3>
                        {project.subtitle && <p className="text-sm font-medium text-black/60 mb-3">{project.subtitle}</p>}
                        <p className="text-muted-foreground text-sm line-clamp-2">{project.shortDescription}</p>
                    </div>
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="font-semibold text-lg">{project.priceRange || 'Price on Request'}</span>
                        <Button variant="ghost" size="sm" className="hover:bg-primary/5 hover:text-primary p-0 h-auto font-medium" asChild>
                            <Link to={`/project/${project.slug}`}>
                                Details <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
