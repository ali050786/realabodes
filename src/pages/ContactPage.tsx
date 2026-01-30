import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Preloader } from '@/components/ui/Preloader';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/components/ui/use-toast";

export default function ContactPage() {
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const [contactEmail, setContactEmail] = useState('info@realabodes.in');
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const { fetchSiteSettings } = await import('@/services/settings');
                const settings = await fetchSiteSettings();
                if (settings['contact_email']) {
                    setContactEmail(settings['contact_email']);
                }
            } catch (error) {
                console.error("Failed to load contact email", error);
            }
        };
        loadSettings();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const { sendContactMessage } = await import('@/services/contact');
            await sendContactMessage({
                name: formState.name,
                email: formState.email,
                phone: formState.phone,
                message: formState.message
            });

            toast({
                title: "Message Sent Successfully",
                description: "Thank you for reaching out. We have received your message.",
            });

            setFormState({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            console.error(error);
            toast({
                title: "Error Sending Message",
                description: "There was a problem sending your message. Please try again later.",
                variant: 'destructive'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };

    return (
        <>
            <AnimatePresence mode="wait">
                {loading && <Preloader onComplete={() => setLoading(false)} />}
            </AnimatePresence>
            <Layout removeTopPadding={true}>
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-primary text-white">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary-light/80" />

                    {/* Decorative Elements */}
                    <div className="absolute top-20 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -z-10" />

                    <div className="container mx-auto px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-3xl"
                        >
                            <span className="inline-block text-sm font-medium tracking-wider uppercase text-accent mb-4 pl-1">
                                Get in Touch
                            </span>
                            <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-white leading-tight mb-6">
                                Let's Start Your <br />
                                <span className="italic text-gradient-gold">Real Estate Journey</span>
                            </h1>
                            <p className="text-lg text-white/80 leading-relaxed max-w-2xl border-l-2 border-accent/30 pl-6">
                                Whether you're looking for your dream home or a lucrative investment, we're here to guide you every step of the way with transparency and expertise.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <section className="py-20 md:py-32 bg-background relative">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                            {/* Contact Info */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="space-y-12"
                            >
                                <div>
                                    <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                                        Visit Our Office
                                    </h2>
                                    <p className="text-muted-foreground text-lg leading-relaxed">
                                        We invite you to experience our hospitality and discuss your property needs in person.
                                    </p>
                                </div>

                                <div className="space-y-8">
                                    <div className="group flex items-start gap-6 p-6 rounded-2xl bg-secondary/30 border border-transparent hover:border-accent/20 transition-all duration-300">
                                        <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform duration-300">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-xl text-foreground mb-2">Head Office</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                Luxury Square, Sawata Mali Mandir Road,<br />
                                                Chikhali, Pune - 411062<br />
                                                Maharashtra, India
                                            </p>
                                        </div>
                                    </div>

                                    <div className="group flex items-start gap-6 p-6 rounded-2xl bg-secondary/30 border border-transparent hover:border-accent/20 transition-all duration-300">
                                        <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform duration-300">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-xl text-foreground mb-2">Call Us</h3>
                                            <p className="text-muted-foreground mb-1">+91 9022 11 4646</p>
                                            <p className="text-muted-foreground">+91 9022 11 3633</p>
                                        </div>
                                    </div>

                                    <div className="group flex items-start gap-6 p-6 rounded-2xl bg-secondary/30 border border-transparent hover:border-accent/20 transition-all duration-300">
                                        <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform duration-300">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-xl text-foreground mb-2">Email Us</h3>
                                            <p className="text-muted-foreground mb-1">{contactEmail}</p>
                                            <p className="text-sm text-accent mt-2">We reply within 24 hours</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Contact Form */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl blur-3xl transform rotate-3" />
                                <div className="relative bg-card p-8 md:p-10 rounded-3xl border border-border shadow-xl">
                                    <div className="mb-8">
                                        <h3 className="font-serif text-2xl text-foreground mb-2">Send Message</h3>
                                        <p className="text-muted-foreground text-sm">Fill in the form and our team will get back to you.</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label htmlFor="name" className="text-sm font-medium text-foreground ml-1">Full Name</label>
                                                <Input
                                                    id="name"
                                                    placeholder="John Doe"
                                                    className="bg-background/50 border-input/50 focus:bg-background transition-colors h-11"
                                                    value={formState.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="phone" className="text-sm font-medium text-foreground ml-1">Phone Number</label>
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    placeholder="+91 00000 00000"
                                                    className="bg-background/50 border-input/50 focus:bg-background transition-colors h-11"
                                                    value={formState.phone}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium text-foreground ml-1">Email Address</label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="john@example.com"
                                                className="bg-background/50 border-input/50 focus:bg-background transition-colors h-11"
                                                value={formState.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="message" className="text-sm font-medium text-foreground ml-1">Tell us about your requirements</label>
                                            <Textarea
                                                id="message"
                                                placeholder="I am interested in..."
                                                className="min-h-[140px] bg-background/50 border-input/50 focus:bg-background transition-colors resize-none"
                                                value={formState.message}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full h-12 text-lg bg-gradient-gold text-primary-foreground rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2">
                                                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                                                    Sending...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    Send Message <Send className="w-4 h-4 ml-1" />
                                                </span>
                                            )}
                                        </Button>
                                    </form>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Map Section - Placeholder style to match design */}
                <section className="h-[400px] w-full bg-secondary/30 relative grayscale hover:grayscale-0 transition-all duration-700">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.273673739768!2d73.80962!3d18.65172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDM5JzA2LjIiTiA3M8KwNDgnMzQuNiJF!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                    ></iframe>
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none" />
                </section>
            </Layout>
        </>
    );
}
