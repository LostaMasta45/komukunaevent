"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Camera, Zap, Sparkles, Users, Palette } from 'lucide-react';

const steps = [
    {
        id: 'hype',
        title: 'Crowd Magnet',
        description: 'Bikin acara pecah & tamu antri panjang!',
        icon: Users,
        type: 'video',
        src: '/komukuna-event/process/exp-crowd.mp4',
    },
    {
        id: 'direction',
        title: 'Pro Directed',
        description: 'Gaya mati gaya? Crew kami arahkan sampai kece.',
        icon: Camera,
        type: 'image',
        src: '/komukuna-event/process/exp-direction.jpg'
    },
    {
        id: 'speed',
        title: 'Kilat 15 Detik',
        description: 'Foto & cetak secepat update status.',
        icon: Zap,
        type: 'image',
        src: '/komukuna-event/process/exp-print.jpg'
    },
    {
        id: 'branding',
        title: 'Exclusive Branding',
        description: 'Template desain premium sesuai tema acara.',
        icon: Palette,
        type: 'image',
        src: '/komukuna-event/process/exp-template.jpg'
    }
];

export default function ExperienceStory() {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % steps.length);
        }, 3500); // Slightly slower for better reading

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative mx-auto w-full max-w-sm aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-gray-900 bg-gray-900 group ring-1 ring-white/10">

            {/* Story Progress Bar */}
            <div className="absolute top-5 left-0 w-full px-5 flex gap-1.5 z-30">
                {steps.map((step, index) => (
                    <div key={step.id} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                        <motion.div
                            className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                            initial={{ width: "0%" }}
                            animate={{ width: index === currentStep ? "100%" : index < currentStep ? "100%" : "0%" }}
                            transition={{ duration: index === currentStep ? 3.5 : 0, ease: "linear" }}
                        />
                    </div>
                ))}
            </div>

            {/* Content Carousel */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 w-full h-full"
                >
                    {steps[currentStep].type === 'video' ? (
                        <div className="relative w-full h-full bg-gray-900">
                            <video
                                className="absolute inset-0 w-full h-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                            >
                                <source src={steps[currentStep].src} type="video/mp4" />
                            </video>
                        </div>
                    ) : (
                        <Image
                            src={steps[currentStep].src}
                            alt={steps[currentStep].title}
                            fill
                            className="object-cover"
                        />
                    )}

                    {/* Gradient Overlay - Cinematic */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 opacity-90" />
                </motion.div>
            </AnimatePresence>

            {/* Text Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-8 z-20">
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
    );
}
