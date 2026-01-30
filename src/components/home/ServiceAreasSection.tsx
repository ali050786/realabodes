
import { motion } from 'framer-motion';

const serviceAreas = [
    'Wakad', 'Hinjewadi', 'Baner', 'Balewadi', 'Pimple Saudagar',
    'Ravet', 'Tathawade', 'Punawale', 'Chikhali', 'Moshi',
];

export function ServiceAreasSection() {
    return (
        <section className="relative py-20 bg-gray-50 z-10">
            <div className="container mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <h3 className="font-serif text-2xl text-primary mb-3">Areas We Serve</h3>
                    <p className="text-muted-foreground">Properties available across Pune's prime locations</p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                    {serviceAreas.map((area, i) => (
                        <motion.div
                            key={area}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                            className="px-6 py-3 bg-white rounded-full border border-gray-200 text-sm font-medium text-gray-600 cursor-default shadow-sm transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary"
                        >
                            {area}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
