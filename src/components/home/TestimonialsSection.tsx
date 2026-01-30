
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'Vikas Gupta',
        property: 'Rama Krystal One, Chikhali',
        quote: 'Real Abodes made finding our dream home a seamless experience. Their team is professional and highly knowledgeable.',
        rating: 5,
    },
    {
        name: 'Shashank Chaudhary',
        property: 'Sankeshwar Sparsh, Moshi',
        quote: "With Mr. Hameed's help, we found our dream home. He truly understands your needs and recommends the best options.",
        rating: 5,
    },
    {
        name: 'Priya Sharma',
        property: 'Azure Residence, Wakad',
        quote: 'Exceptional service from start to finish. They guided us through every step of the buying process with patience and expertise.',
        rating: 5,
    },
];

export function TestimonialsSection() {
    return (
        <section className="relative py-24 bg-white z-10">
            <div className="container mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <span className="text-sm font-medium tracking-wider uppercase text-accent mb-3 block">
                        Happy Homeowners
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl text-primary mb-4">
                        What Our Clients Say
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, i) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.6 }}
                            className="bg-gray-50 rounded-2xl p-8 border border-gray-100 relative group hover:shadow-lg transition-all duration-300"
                        >
                            <Quote className="absolute top-6 right-6 w-8 h-8 text-accent/20 group-hover:text-accent/40 transition-colors" />

                            <div className="flex gap-1 mb-6">
                                {Array.from({ length: testimonial.rating }).map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                                ))}
                            </div>

                            <p className="text-primary/80 mb-8 leading-relaxed italic relative z-10">
                                "{testimonial.quote}"
                            </p>

                            <div className="pt-6 border-t border-gray-200">
                                <div className="font-serif text-lg text-primary mb-1">{testimonial.name}</div>
                                <div className="text-sm text-accent font-medium">{testimonial.property}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
