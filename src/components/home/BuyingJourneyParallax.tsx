
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, Search, Home, FileCheck, Key } from 'lucide-react';

const buyingSteps = [
    {
        step: '01',
        title: 'Share Your Requirements',
        description: 'Tell us your budget, preferred location, and property type. We listen first to understand your vision.',
        icon: Search
    },
    {
        step: '02',
        title: 'Curated Property Match',
        description: 'We handpick properties that match your criteria—no spam, only relevant options that save your time.',
        icon: Home
    },
    {
        step: '03',
        title: 'Site Visits & Guidance',
        description: 'Accompanied site visits with honest insights about pros and cons. We act as your neutral advisor.',
        icon: CheckCircle2
    },
    {
        step: '04',
        title: 'Hassle-Free Booking',
        description: 'Complete documentation support, loan assistance, and smooth possession. We handle the paperwork.',
        icon: FileCheck
    },
    {
        step: '05',
        title: 'Key Handover',
        description: 'Celebrate the joy of your new home. Our relationship continues even after you move in.',
        icon: Key
    }
];

export function BuyingJourneyParallax() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    });

    return (
        <section ref={containerRef} className="relative py-32 bg-white overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-24">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-medium tracking-wider uppercase text-accent mb-3 block"
                    >
                        Your Journey With Us
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-serif text-4xl md:text-5xl text-primary mb-6"
                    >
                        Simple Steps to Your <span className="text-accent italic">Dream Home</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground text-lg"
                    >
                        We've simplified the home buying process into a seamless experience.
                        Here is how we work together to find your perfect property.
                    </motion.p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Vertical Connector Line (Central) */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gray-200 transform md:-translate-x-1/2" />

                    {/* Build the connector line fill animation based on scroll? 
                        Ideally, we want it to fill as we scroll.
                    */}
                    <motion.div
                        style={{ scaleY: scrollYProgress, originY: 0 }}
                        className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-accent transform md:-translate-x-1/2 origin-top"
                    />

                    <div className="space-y-24 md:space-y-32">
                        {buyingSteps.map((step, index) => (
                            <JourneyStep
                                key={step.step}
                                step={step}
                                index={index}
                                total={buyingSteps.length}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function JourneyStep({ step, index, total }: { step: any, index: number, total: number }) {
    const isEven = index % 2 === 0;
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });

    // Parallax Effects
    // Number moves slower/faster than the card to create depth
    const yNumber = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const yCard = useTransform(scrollYProgress, [0, 1], [100, -20]); // Enters from lower

    return (
        <div ref={ref} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

            {/* Center Node (Timeline Point) */}
            <div className="absolute left-[20px] md:left-1/2 w-4 h-4 bg-white border-4 border-accent rounded-full z-20 transform -translate-x-1/2 md:translate-x-[-50%] mt-6 md:mt-0" />

            {/* Content Side */}
            <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                <motion.div
                    style={{ y: yCard }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative"
                >
                    <div className={`flex items-center gap-4 mb-4 ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                        <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                            <step.icon size={24} />
                        </div>
                        <h3 className="font-serif text-2xl text-primary">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                    </p>
                </motion.div>
            </div>

            {/* Number Side (Parallax Element) */}
            <div className={`w-full md:w-1/2 pl-12 md:pl-0 mt-4 md:mt-0 ${isEven ? 'md:pl-16 text-left' : 'md:pr-16 text-right'}`}>
                <motion.div
                    style={{ y: yNumber }}
                    className="opacity-20 pointer-events-none select-none"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.15 }}
                    transition={{ duration: 1 }}
                >
                    <span
                        className="font-serif text-[8rem] md:text-[10rem] leading-none text-transparent"
                        style={{ WebkitTextStroke: '2px var(--primary)' }}
                    >
                        {step.step}
                    </span>
                </motion.div>
            </div>

        </div>
    );
}
