import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PreloaderProps {
    onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + 1;
            });
        }, 20); // 20ms * 100 = 2000ms = 2 seconds

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (progress === 100) {
            // Small buffer after 100% to ensure smoothness
            setTimeout(() => {
                onComplete();
            }, 500);
        }
    }, [progress, onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary text-white"
        >
            <div className="w-full max-w-md px-6">
                <div className="flex justify-between text-sm uppercase tracking-widest mb-2 opacity-50">
                    <span>Loading Experience</span>
                    <span>{progress}%</span>
                </div>
                <div className="h-[2px] w-full bg-white/10 overflow-hidden relative">
                    <motion.div
                        className="absolute inset-y-0 left-0 bg-accent"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1, ease: "linear" }}
                    />
                </div>
                <div className="mt-8 text-center overflow-hidden">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="flex justify-center"
                    >
                        <img
                            src="/assets/preloader.svg"
                            alt="Real Abodes"
                            className="h-16 md:h-20 w-auto"
                        />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
