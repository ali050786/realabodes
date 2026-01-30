import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { CheckCircle2, Users, Heart, Lightbulb, Shield } from 'lucide-react';
import { Preloader } from '@/components/ui/Preloader';

export default function AboutPage() {
    const [loading, setLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <>
            <AnimatePresence mode="wait">
                {loading && <Preloader onComplete={() => setLoading(false)} />}
            </AnimatePresence>
            <Layout removeTopPadding={true}>
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-primary text-white">
                    {/* Background gradient - Blend Blue effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary-light/50" />

                    <div className="container mx-auto px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-3xl"
                        >
                            <span className="inline-block text-sm font-medium tracking-wider uppercase text-accent mb-4">
                                About Real Abodes
                            </span>
                            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                                Building Trust, With <span className="italic text-gradient-gold">Timeless Dedication</span>
                            </h1>
                            <p className="text-lg text-white/80 leading-relaxed max-w-2xl">
                                We don’t just sell homes — we help people find the spaces where their lives truly unfold.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Our Story Section */}
                <section className="py-20 md:py-32 bg-background relative overflow-hidden">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase mb-4 block text-accent">Our Story</span>
                                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                                    More Than Just a <span className="italic text-primary">Transaction</span>
                                </h2>
                                <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                                    <p>
                                        At Real Abodes, our journey began with a simple belief: real estate should be transparent, trustworthy, and truly redefine the way people experience it.
                                    </p>
                                    <p>
                                        With deep roots in PCMC and PMC, we are more than a channel partner; we are your trusted guide in navigating one of life’s most important decisions.
                                        Every project we take on is carefully curated, ensuring it meets the highest standards of quality, location, and lifestyle.
                                    </p>
                                    <p>
                                        Headquartered at Wakad, Pune, Real Abodes proudly operates as a sole selling and mandate company, giving us the privilege to represent some of the finest developments across the region.
                                    </p>
                                </div>
                            </motion.div>

                            <div className="relative">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
                                >
                                    {/* Placeholder for Story Image - using a generic luxury abstract/interior if available, or color block */}
                                    <div className="absolute inset-0 bg-secondary/30" />
                                    <img
                                        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                        alt="Luxury Interior"
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                                {/* Decorative element */}
                                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl -z-10" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Values - Parallax Section */}
                <section ref={containerRef} className="py-24 bg-secondary/30 relative">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <span className="text-sm font-medium tracking-wider text-accent uppercase mb-3 block">Our Core Values</span>
                            <h2 className="font-serif text-3xl md:text-5xl text-foreground">
                                Guiding Principles
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Heart className="w-8 h-8" />,
                                    title: "Homes, Not Just Houses",
                                    desc: "For us, it’s not about square feet — it’s about creating spaces where families grow, moments are shared, and life finds its rhythm."
                                },
                                {
                                    icon: <Shield className="w-8 h-8" />,
                                    title: "Trust Beyond Transactions",
                                    desc: "Our success isn’t measured in sales, but in the trust and long-term relationships we build with our clients."
                                },
                                {
                                    icon: <CheckCircle2 className="w-8 h-8" />,
                                    title: "Curated Excellence",
                                    desc: "Every project we represent is handpicked for its quality, location, and lifestyle promise — because you deserve nothing less."
                                },
                                {
                                    icon: <Lightbulb className="w-8 h-8" />,
                                    title: "Clarity in Every Step",
                                    desc: "We believe real estate should never feel complicated. Transparency and guidance are at the heart of every conversation we have."
                                },
                                {
                                    icon: <Users className="w-8 h-8" />,
                                    title: "Evolving with You",
                                    desc: "As lifestyles change, so do we. We adapt, innovate, and redefine what realty means to match the aspirations of tomorrow."
                                }
                            ].map((value, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="bg-card p-8 rounded-2xl border border-border/50 hover:border-accent/30 hover:shadow-lg transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary mb-6 group-hover:bg-accent group-hover:text-primary-foreground transition-colors duration-300">
                                        {value.icon}
                                    </div>
                                    <h3 className="font-serif text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">{value.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {value.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-24 bg-background">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                            <div className="max-w-2xl">
                                <span className="text-sm font-medium tracking-wider text-accent uppercase mb-3 block">Meet The Leaders</span>
                                <h2 className="font-serif text-3xl md:text-5xl text-foreground">
                                    The Team Behind <span className="italic text-primary">Real Abodes</span>
                                </h2>
                            </div>
                            <p className="max-w-md text-muted-foreground">
                                Backed by a team of professionals who blend market expertise with genuine care.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { name: "Hameed Shukoor", role: "Director - Sales", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
                                { name: "Akmal Razaa", role: "Director - Marketing", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
                                { name: "Zeenat S.", role: "Director - Marketing", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
                            ].map((member, i) => (
                                <motion.div
                                    key={member.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.2 }}
                                    className="group relative"
                                >
                                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-secondary mb-4">
                                        <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <h3 className="text-xl font-serif font-bold text-foreground">{member.name}</h3>
                                    <p className="text-sm text-accent font-medium uppercase tracking-wide">{member.role}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}
