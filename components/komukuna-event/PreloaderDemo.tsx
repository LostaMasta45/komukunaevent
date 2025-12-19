"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Camera, Film, Aperture } from 'lucide-react'; // Icons for the variants

interface PreloaderDemoProps {
    variant: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}

export default function PreloaderDemo({ variant }: PreloaderDemoProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState(3);
    const [flash, setFlash] = useState(false);

    // For Studio Flash (Var 7)
    const [chargeLevel, setChargeLevel] = useState(0);

    // Reset loop
    useEffect(() => {
        setIsLoading(true);
        setCount(3);
        setFlash(false);
        setChargeLevel(0);

        // Countdown logic for Variant 1 & 2
        let timer: NodeJS.Timeout;
        if (variant === 1 || variant === 2) {
            timer = setInterval(() => {
                setCount((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        if (variant === 1) triggerFlash();
                        setTimeout(() => setIsLoading(false), 2500); // Hold final state
                        return 0;
                    }
                    return prev - 1;
                });
            }, 800);
        } else if (variant === 7) {
            // Studio Flash Charge Logic
            const chargeTime = 2000;
            const intervalTime = 20;
            const steps = chargeTime / intervalTime;
            let currentStep = 0;

            timer = setInterval(() => {
                currentStep++;
                setChargeLevel((currentStep / steps) * 100);
                if (currentStep >= steps) {
                    clearInterval(timer);
                    triggerFlash();
                    setTimeout(() => setIsLoading(false), 1000);
                }
            }, intervalTime);

        } else if (variant === 8) {
            // REC Mode Timer
            setTimeout(() => setIsLoading(false), 3000);
        } else {
            // Standard timeout for others
            setTimeout(() => setIsLoading(false), 3500);
        }

        return () => clearInterval(timer);
    }, [variant]);

    const triggerFlash = () => {
        setFlash(true);
        setTimeout(() => setFlash(false), 150);
    };

    const hashtag = "#MomenSempurnaBersamaKomukuna";

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black"
                    exit={
                        variant === 5
                            ? { opacity: 1 } // Handled by clipPath animation inside
                            : { opacity: 0, transition: { duration: 0.8 } }
                    }
                >

                    {/* Variant 1: THE SNAP (Photobooth) */}
                    {variant === 1 && (
                        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full bg-[#111]">
                            {/* Flash Overlay */}
                            <AnimatePresence>
                                {flash && (
                                    <motion.div
                                        initial={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-white z-[100]"
                                    />
                                )}
                            </AnimatePresence>

                            {count > 0 ? (
                                <motion.div
                                    key={count}
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1.5, opacity: 1 }}
                                    exit={{ scale: 2, opacity: 0 }}
                                    className="text-white text-9xl font-black"
                                >
                                    {count}
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ rotate: -10, scale: 0.8, opacity: 0 }}
                                    animate={{ rotate: -5, scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", bounce: 0.5 }}
                                    className="bg-white p-4 pb-12 shadow-2xl skew-y-1 w-64 md:w-80"
                                >
                                    <div className="bg-black/5 w-full aspect-square relative overflow-hidden mb-4">
                                        <Image src="/komukuna-event/logo.png" alt="Logo" fill className="object-contain p-4" />
                                    </div>
                                    <p className="text-black font-handwriting text-center text-sm font-bold tracking-tight opacity-80">
                                        {hashtag}
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    )}

                    {/* Variant 2: FILM STRIP (Videobooth) */}
                    {variant === 2 && (
                        <div className="relative z-10 w-full h-full flex items-center justify-center bg-black">
                            {/* Moving Film Strip BG */}
                            <div className="absolute inset-0 opacity-20 overflow-hidden pointer-events-none">
                                <div className="absolute top-0 bottom-0 left-10 w-8 border-x-2 border-dashed border-white/20" />
                                <div className="absolute top-0 bottom-0 right-10 w-8 border-x-2 border-dashed border-white/20" />
                            </div>

                            {count > 0 ? (
                                <div className="relative w-64 h-64 flex items-center justify-center">
                                    <svg className="absolute inset-0 w-full h-full animate-spin-slow">
                                        <circle cx="50%" cy="50%" r="45%" stroke="white" strokeWidth="2" fill="none" strokeDasharray="10 10" />
                                    </svg>
                                    <motion.span
                                        key={count}
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="text-8xl text-white font-mono"
                                    >
                                        {count}
                                    </motion.span>
                                </div>
                            ) : (
                                <motion.div className="flex flex-col items-center">
                                    <motion.h2
                                        initial={{ scale: 2, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="text-6xl md:text-8xl font-black text-white italic tracking-tighter mb-8"
                                    >
                                        ACTION!
                                    </motion.h2>
                                    <motion.div
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="flex items-center gap-4 bg-white/10 px-6 py-3 rounded-full backdrop-blur-md"
                                    >
                                        <Image src="/komukuna-event/logo-circle.png" alt="Logo" width={30} height={30} />
                                        <span className="text-white text-xs tracking-widest">{hashtag}</span>
                                    </motion.div>
                                </motion.div>
                            )}
                        </div>
                    )}

                    {/* Variant 3: LENS FOCUS (Pro Tech) */}
                    {variant === 3 && (
                        <div className="relative z-10 w-full h-full bg-neutral-900 flex items-center justify-center">
                            {/* Viewfinder Overlay */}
                            <div className="absolute inset-8 border border-white/20 rounded-lg pointer-events-none">
                                <span className="absolute top-2 left-2 text-[10px] text-green-400 font-mono">REC [●] 00:00:00</span>
                                <span className="absolute bottom-2 left-2 text-[10px] text-white font-mono">ISO 800</span>
                                <span className="absolute bottom-2 right-2 text-[10px] text-white font-mono">1/50 F2.8</span>
                                {/* Crosshair */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border-2 border-white/50" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-[1px] bg-white/20" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-[1px] bg-white/20" />
                            </div>

                            <motion.div
                                initial={{ filter: "blur(20px)", scale: 1.2 }}
                                animate={{ filter: "blur(0px)", scale: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                className="flex flex-col items-center"
                            >
                                <div className="relative w-40 h-40 mb-6">
                                    <Image src="/komukuna-event/logo-circle.png" alt="Logo" fill className="object-contain" />
                                </div>
                                <motion.div
                                    className="flex items-center gap-2 text-komukuna-pink"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.5 }}
                                >
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-sm tracking-widest uppercase font-medium">In Focus</span>
                                </motion.div>
                                <p className="mt-4 text-white/50 text-[10px] tracking-[0.2em] uppercase">
                                    {hashtag}
                                </p>
                            </motion.div>
                        </div>
                    )}

                    {/* Variant 4: SPOTLIGHT (Original) */}
                    {variant === 4 && (
                        <div className="relative z-10 flex flex-col items-center">
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

                            <motion.div
                                className="relative w-48 h-48 mb-8 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.5, type: "spring" }}
                            >
                                <Image src="/komukuna-event/logo-circle.png" alt="Logo" fill className="object-contain" />
                            </motion.div>

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
                    )}

                    {/* Variant 5: APERTURE (Iris) */}
                    {variant === 5 && (
                        <motion.div
                            className="relative z-10 w-full h-full flex items-center justify-center bg-black"
                            initial={{ clipPath: "circle(0% at 50% 50%)" }}
                            animate={{ clipPath: "circle(150% at 50% 50%)" }}
                            transition={{ duration: 2, ease: [0.7, 0, 0.3, 1], delay: 1 }}
                        >
                            <div className="absolute inset-0 bg-white flex items-center justify-center">
                                <div className="flex flex-col items-center">
                                    <div className="relative w-48 h-48 mb-4">
                                        <Image src="/komukuna-event/logo.png" alt="Logo" fill className="object-contain" />
                                    </div>
                                    <p className="text-black font-bold tracking-widest">{hashtag}</p>
                                </div>
                            </div>

                            {/* Iris Blades Overlay (Simulated with rotating shutter graphic or just SVG) */}
                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                                <Aperture strokeWidth={1} size={128} className="text-white opacity-20 animate-spin-slow" />
                            </div>
                        </motion.div>
                    )}

                    {/* Variant 6: FOCUS PEAKING */}
                    {variant === 6 && (
                        <div className="relative z-10 w-full h-full flex items-center justify-center bg-zinc-900">
                            <motion.div
                                initial={{ opacity: 0.5, filter: "blur(8px) contrast(200%)" }}
                                animate={{ opacity: 1, filter: "blur(0px) contrast(100%)" }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                className="relative w-64 h-64"
                            >
                                <Image src="/komukuna-event/logo.png" alt="Logo" fill className="object-contain" />
                                {/* Peaking Effect Overlay */}
                                <motion.div
                                    className="absolute inset-0 border-2 border-green-500 rounded-lg opacity-0"
                                    animate={{ opacity: [0, 1, 0, 1, 0] }}
                                    transition={{ duration: 2 }}
                                />
                            </motion.div>
                            <div className="absolute bottom-12 text-green-500 font-mono text-xs tracking-widest animate-pulse">
                                PEAKING: ON
                            </div>
                        </div>
                    )}

                    {/* Variant 7: STUDIO FLASH */}
                    {variant === 7 && (
                        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center bg-[#1a1a1a]">
                            <AnimatePresence>
                                {flash && (
                                    <motion.div
                                        initial={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-white z-[100]"
                                    />
                                )}
                            </AnimatePresence>

                            <div className="mb-12 relative w-40 h-40">
                                <Image src="/komukuna-event/logo-circle.png" alt="Logo" fill className="object-contain opacity-20" />
                            </div>

                            {/* Charge Bar */}
                            <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                                <motion.div
                                    className="h-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]"
                                    style={{ width: `${chargeLevel}%` }}
                                />
                            </div>
                            <div className="text-red-500 font-mono text-sm tracking-widest flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${chargeLevel === 100 ? 'bg-green-500 animate-pulse' : 'bg-red-900'}`} />
                                FLASH CHARGING... {Math.round(chargeLevel)}%
                            </div>
                        </div>
                    )}

                    {/* Variant 8: REC MODE */}
                    {variant === 8 && (
                        <div className="relative z-10 w-full h-full bg-black flex items-center justify-center font-mono">
                            {/* Glitch Overlay on Exit */}
                            <div className="absolute inset-0 border-[20px] border-black/50 pointer-events-none z-20" />

                            {/* Info */}
                            <div className="absolute top-8 left-8 flex items-center gap-2 text-white z-10">
                                <div className="w-4 h-4 rounded-full bg-red-600 animate-[pulse_1s_infinite]" />
                                <span className="tracking-widest">REC</span>
                            </div>
                            <div className="absolute top-8 right-8 text-white z-10">
                                00:00:0{3 - count < 0 ? 0 : 3 - count}
                            </div>
                            <div className="absolute bottom-8 left-8 text-white/50 text-xs z-10">
                                BATTERY <span className="text-white">100%</span>
                            </div>

                            {/* Center Content */}
                            <motion.div
                                className="flex flex-col items-center"
                                animate={{ opacity: [1, 0.8, 1, 0.9] }}
                                transition={{ repeat: Infinity, duration: 0.2 }}
                            >
                                <div className="relative w-56 h-56">
                                    <Image src="/komukuna-event/logo-circle.png" alt="Logo" fill className="object-contain" />
                                </div>
                                <p className="mt-4 text-white text-sm tracking-[0.5em] bg-black px-2">{hashtag}</p>
                            </motion.div>

                            {/* Scanlines */}
                            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />
                        </div>
                    )}

                </motion.div>
            )}
        </AnimatePresence>
    );
}
