"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import Link from 'next/link';
import { ChevronRight, Play } from 'lucide-react';
import { useState, useEffect } from 'react';
import PortfolioArchiveModal from './PortfolioArchiveModal';
import { portfolioItems, videoItems } from './portfolio-data';

const headlines = [
    "Konten Viral.",
    "Branding Keren.",
    "Momen Seru.",
    "Kenangan Manis."
];

export default function HeroSection() {
    const [index, setIndex] = useState(0);
    const [isDemoOpen, setIsDemoOpen] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % headlines.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">

            {/* Background - Animated Gradient */}
            {/* Background - Animated Gradient with Image & Pattern */}
            <div className="absolute inset-0 bg-komukuna-dark overflow-hidden">


                {/* 2. Gradient Overlay (Main Color) */}
                <div className="absolute inset-0 bg-gradient-to-br from-komukuna-purple/30 via-komukuna-dark/90 to-komukuna-pink/20" />

                {/* 3. Animated Blurs */}
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-komukuna-purple/30 blur-[120px] animate-pulse-delayed" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-komukuna-pink/20 blur-[120px] animate-pulse-delayed" style={{ animationDelay: '2s' }} />

                {/* 4. Pattern Overlay (Grid) */}
                <div
                    className="absolute inset-0 opacity-[0.15] mix-blend-screen pointer-events-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px'
                    }}
                />

                {/* 5. Vignette for focus */}
                <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/80" />
            </div>

            <div className="container relative z-10 px-4 text-center">
                <div className="space-y-8 max-w-5xl mx-auto">

                    {/* Tagline */}
                    <div className="flex justify-center animate-fast-fade">
                        <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-komukuna-pink opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-komukuna-pink"></span>
                            </span>
                            <span className="text-gray-300 text-xs md:text-sm font-medium tracking-wide uppercase">New Era of Event Experience</span>
                        </div>
                    </div>

                    {/* Mega Headline (Updated per Plan) */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white min-h-[3.3em] md:min-h-[2.2em]">
                        <span className="block">
                            Tamu Pulang Membawa
                        </span>

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
                    </h1>

                    {/* Subheader POINTER: LCP ELEMENT */}
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-300">
                        Bikin <span className="text-white font-semibold">Corporate Gathering, Wedding, atau Party</span> Anda pecah! Hadirkan pengalaman
                        <span className="text-white font-semibold"> Photobooth & Video 360°</span> yang seru, personal, dan langsung tayang di Instagram Story.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4 animate-fade-in-up delay-1500">
                        <div className="relative group w-full sm:w-auto">
                            <div className="absolute -inset-1 bg-gradient-to-r from-komukuna-pink to-komukuna-purple rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                            <Button
                                variant="gradient"
                                size="lg"
                                className="relative w-full sm:w-auto h-12 px-6 text-base overflow-hidden group-hover:scale-[1.02] transition-transform duration-300"
                                asChild
                            >
                                <Link href="#pricing">
                                    <span className="relative z-10 flex items-center justify-center">
                                        Cek Ketersediaan <ChevronRight className="ml-2 w-4 h-4" />
                                    </span>
                                    {/* Shine Effect */}
                                    <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] animate-[shine_3s_infinite]" />
                                </Link>
                            </Button>
                        </div>


                        <Button
                            variant="ghost"
                            size="lg"
                            className="h-12 px-6 text-base border border-white/20 hover:bg-white/10 hover:text-white rounded-full flex items-center gap-2 w-full sm:w-auto justify-center group"
                            onClick={() => setIsDemoOpen(true)}
                        >
                            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center transition-transform group-hover:scale-110">
                                <Play size={10} fill="black" className="ml-0.5 text-black" />
                            </div>
                            <span className="font-medium tracking-wide">Lihat Portfolio</span>
                        </Button>
                    </div>

                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 2.2, duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 flex flex-col items-center gap-2"
            >
                <span className="text-xs md:text-sm font-medium tracking-widest text-white/50 animate-pulse">Lihat Bukti Viralnya 👇</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent" />
            </motion.div>

            {/* Portfolio Modal */}
            <PortfolioArchiveModal
                isOpen={isDemoOpen}
                initialTab="photobooth"
                photoItems={portfolioItems}
                videoItems={videoItems}
                onClose={() => setIsDemoOpen(false)}
            />
        </section>
    );
}
