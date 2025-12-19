"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Standard loading simulation
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3500);

        return () => clearTimeout(timer);
    }, []);

    const hashtag = "#MomenSempurnaBersamaKomukuna";

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black"
                    exit={{ opacity: 0, transition: { duration: 0.8 } }}
                >
                    <div className="relative z-10 flex flex-col items-center">
                        {/* Spotlight Background Effect */}
                        <motion.div
                            className="absolute inset-0 bg-transparent"
                            animate={{
                                background: [
                                    "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                                    "radial-gradient(circle at 70% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                                    "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 60%)"
                                ]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />

                        {/* Logo Reveal */}
                        <motion.div
                            className="relative w-48 h-48 mb-8 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, type: "spring" }}
                        >
                            <Image src="/komukuna-event/logo-circle.png" alt="Logo" fill className="object-contain" />
                        </motion.div>

                        {/* Text Reveal */}
                        <motion.div className="flex flex-col items-center gap-2">
                            <motion.span
                                className="text-white text-lg tracking-[0.3em] font-light"
                                initial={{ opacity: 0, filter: "blur(10px)" }}
                                animate={{ opacity: 1, filter: "blur(0px)" }}
                                transition={{ delay: 0.5, duration: 1 }}
                            >
                                KOMUKUNA STUDIO
                            </motion.span>
                            <motion.span
                                className="text-komukuna-pink text-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                            >
                                {hashtag}
                            </motion.span>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
