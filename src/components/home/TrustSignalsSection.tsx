
import { motion } from 'framer-motion';
import { Shield, Users, Award, CheckCircle2 } from 'lucide-react';

const trustSignals = [
    {
        icon: Shield,
        title: 'RERA Registered',
        description: 'All our listed properties are RERA compliant ensuring complete transparency',
    },
    {
        icon: Users,
        title: 'Channel Partners',
        description: 'Official channel partners with leading developers in Pune region',
    },
    {
        icon: Award,
        title: '500+ Happy Families',
        description: 'Trusted by hundreds of families to find their dream homes',
    },
    {
        icon: CheckCircle2,
        title: 'End-to-End Support',
        description: 'From site visits to documentation, we handle everything',
    },
];

export function TrustSignalsSection() {
    return (
        <section className="relative py-24 bg-gray-50 z-10">
            <div className="container mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <span className="text-sm font-medium tracking-wider uppercase text-accent mb-3 block">
                        Why Choose Us
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">
                        Your Trust, Our Commitment
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        We prioritize your peace of mind with a transparent and professional approach.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {trustSignals.map((signal, i) => (
                        <motion.div
                            key={signal.title}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-xl p-8 border border-gray-100 text-center shadow-sm hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                                <signal.icon className="w-8 h-8" />
                            </div>
                            <h3 className="font-serif text-xl text-primary mb-3">{signal.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{signal.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
