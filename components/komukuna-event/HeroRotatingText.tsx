"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const headlines = [
    "Konten Viral.",
    "Branding Keren.",
    "Momen Seru.",
    "Kenangan Manis."
];

export default function HeroRotatingText() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % headlines.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-[1.1em] overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.span
                    key={headlines[index]}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="block absolute inset-0 w-full text-transparent bg-clip-text bg-gradient-to-r from-komukuna-pink via-purple-400 to-komukuna-purple"
                >
                    {headlines[index]}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}
