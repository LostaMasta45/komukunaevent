"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Camera, Zap, Sparkles, Users, Palette } from 'lucide-react';
import { cloudinaryProcessVideos } from '@/lib/cloudinary-videos';

interface ExperienceStoryTesProps {
    variant?: 1 | 2 | 3 | 4 | 5;
    title?: string;
}

const steps = [
    {
        id: 'hype',
        title: 'Crowd Magnet',
        description: 'Bikin acara pecah & tamu antri panjang!',
        icon: Users,
        type: 'image',
        src: '/komukuna-event/process/exp-crowd.JPG',
        duration: 9000,
    },
    {
        id: 'template',
        title: 'Template Eksklusif',
        description: 'Desain frame custom yang bikin fotomu otomatis aesthetic.',
        icon: Palette,
        type: 'image',
        src: '/komukuna-event/process/exp-template.jpg',
        duration: 4000,
    },
    {
        id: 'quality',
        title: 'Auto-Glowing',
        description: 'Lighting studio pro & kamera DSLR. Hasilnya tajam & flawless.',
        icon: Sparkles,
        type: 'image',
        src: '/komukuna-event/process/exp-quality.jpg',
        duration: 4000,
    },
    {
        id: 'speed',
        title: 'Cetak 15 Detik',
        description: 'Foto & cetak secepat update status.',
        icon: Zap,
        type: 'image',
        src: '/komukuna-event/process/exp-print.jpg',
        duration: 4000,
    },
    {
        id: 'queue',
        title: 'Antrian Panjang',
        description: 'Bukti acara sukses: Tamu rela antri demi souvenir ini.',
        icon: Users,
        type: 'image',
        src: '/komukuna-event/process/exp-queue.jpg',
        duration: 4000,
    }
];

export default function ExperienceStoryTes({ variant = 1, title }: ExperienceStoryTesProps) {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const stepDuration = steps[currentStep].duration;
        const timer = setTimeout(() => {
            setCurrentStep((prev) => (prev + 1) % steps.length);
        }, stepDuration);

        return () => clearTimeout(timer);
    }, [currentStep]);

    // Helper to render specific variant style for LANDSCAPE images
    const renderLandscapeContent = (step: any) => {
        switch (variant) {
            case 1: // Polaroid (Existing)
                return (
                    <>
                        <div className="absolute inset-0 z-0 bg-neutral-900">
                            <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[50%] bg-komukuna-pink/20 rounded-full blur-3xl animate-pulse" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
                        </div>
                        <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
                            <motion.div
                                initial={{ scale: 0.9, rotate: -2, opacity: 0 }}
                                animate={{ scale: 1, rotate: -2, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="relative bg-white p-3 pb-8 rounded-sm shadow-2xl rotate-[-2deg]"
                                style={{ transform: 'rotate(-2deg)' }}
                            >
                                <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100 shadow-inner">
                                    <Image src={step.src} alt={step.title} fill className="object-cover" />
                                </div>
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/40 backdrop-blur-sm rotate-2 shadow-sm border border-white/20" />
                            </motion.div>
                        </div>
                    </>
                );
            case 2: // Split Screen (Magazine)
                return (
                    <div className="absolute inset-0 bg-neutral-900 flex flex-col">
                        <div className="relative h-[60%] w-full rounded-b-[3rem] overflow-hidden shadow-2xl z-10">
                            <Image src={step.src} alt={step.title} fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>
                        <div className="flex-1 w-full relative">
                            {/* Decorative background for text area */}
                            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                        </div>
                    </div>
                );
            case 3: // Floating Glass
                return (
                    <>
                        <Image src={step.src} alt="bg" fill className="object-cover blur-2xl opacity-40 scale-125" />
                        <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20"
                            >
                                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm z-10" />
                                <Image src={step.src} alt={step.title} fill className="object-cover z-0" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent z-20 pointer-events-none" />
                            </motion.div>
                        </div>
                    </>
                );
            case 4: // Arch Window
                return (
                    <>
                        <div className="absolute inset-0 bg-neutral-900">
                            <div className="absolute top-0 w-full h-[60%] bg-komukuna-pink/10 rounded-full blur-[100px]" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-[70%] z-10 px-4 pb-0">
                            <motion.div
                                initial={{ y: 100 }}
                                animate={{ y: 0 }}
                                className="w-full h-full relative rounded-t-[10rem] overflow-hidden border-4 border-white/10 shadow-2xl"
                            >
                                <Image src={step.src} alt={step.title} fill className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                            </motion.div>
                        </div>
                    </>
                );
            case 5: // Motion Pan (Ken Burns)
                return (
                    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
                        <motion.div
                            initial={{ scale: 1.2, x: '-10%' }}
                            animate={{ scale: 1.2, x: '10%' }}
                            transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                            className="w-full h-full relative opacity-80"
                        >
                            <Image src={step.src} alt={step.title} fill className="object-cover" />
                        </motion.div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            {title && <h3 className="text-white font-bold text-center text-lg">{title}</h3>}

            <div className="relative mx-auto w-full max-w-sm aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-gray-900 bg-gray-900 group ring-1 ring-white/10">

                {/* Story Progress Bar */}
                <div className="absolute top-5 left-0 w-full px-5 flex gap-1.5 z-30">
                    {steps.map((step, index) => (
                        <div key={step.id} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                            <motion.div
                                className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                initial={{ width: "0%" }}
                                animate={{ width: index === currentStep ? "100%" : index < currentStep ? "100%" : "0%" }}
                                transition={{ duration: index === currentStep ? step.duration / 1000 : 0, ease: "linear" }}
                            />
                        </div>
                    ))}
                </div>

                {/* Content Carousel */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 w-full h-full bg-black/50 overflow-hidden"
                    >
                        {steps[currentStep].type === 'video' ? (
                            <div className="relative w-full h-full bg-gray-900">
                                <video
                                    className="absolute inset-0 w-full h-full object-cover"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="none"
                                >
                                    <source src={steps[currentStep].src} type="video/mp4" />
                                </video>
                            </div>
                        ) : (
                            currentStep === 0 ? renderLandscapeContent(steps[currentStep]) : (
                                <Image
                                    src={steps[currentStep].src}
                                    alt={steps[currentStep].title}
                                    fill
                                    className="object-cover"
                                />
                            )
                        )}

                        {/* Gradient Overlay - Cinematic (Adjusted for some variants) */}
                        {variant !== 2 && (
                            <div className={`absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/20 opacity-90 z-20 pointer-events-none ${variant === 4 ? 'via-black/10' : ''}`} />
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-8 z-30">
                    <motion.div
                        key={`text-${currentStep}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            {(() => {
                                const Icon = steps[currentStep].icon;
                                return (
                                    <div className="p-2.5 rounded-full bg-komukuna-pink/20 text-komukuna-pink backdrop-blur-md border border-komukuna-pink/30">
                                        <Icon size={20} />
                                    </div>
                                );
                            })()}
                            <span className="text-xs font-bold text-komukuna-pink uppercase tracking-[0.2em]">
                                Experience #{currentStep + 1}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white leading-tight mb-1">
                            {steps[currentStep].title}
                        </h3>
                        <p className="text-gray-300 text-sm font-medium leading-relaxed">
                            {steps[currentStep].description}
                        </p>
                    </motion.div>
                </div>

            </div>
        </div>
    );
}
