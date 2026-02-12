"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Camera, Zap, Sparkles, Users, Palette, X } from 'lucide-react';
import { cloudinaryProcessVideos } from '@/lib/cloudinary-videos';

const steps = [
    {
        id: 'hype',
        title: 'Crowd Magnet',
        description: 'Bikin acara pecah & tamu antri panjang!',
        icon: Users,
        type: 'image',
        src: '/komukuna-event/process/exp-crowd.JPG',
        duration: 9000,
        isLandscape: true,
    },
    {
        id: 'template',
        title: 'Template Eksklusif',
        description: 'Desain frame custom yang bikin fotomu otomatis aesthetic.',
        icon: Palette,
        type: 'image',
        src: '/komukuna-event/process/exp-template.jpg',
        duration: 4000,
        isLandscape: false,
    },
    {
        id: 'quality',
        title: 'Auto-Glowing',
        description: 'Lighting studio pro & kamera DSLR. Hasilnya tajam & flawless.',
        icon: Sparkles,
        type: 'image',
        src: '/komukuna-event/process/exp-quality.jpg',
        duration: 9000,
        isLandscape: true,
    },
    {
        id: 'speed',
        title: 'Cetak 15 Detik',
        description: 'Foto & cetak secepat update status.',
        icon: Zap,
        type: 'image',
        src: '/komukuna-event/process/exp-print.jpg',
        duration: 4000,
        isLandscape: false,
    },
    {
        id: 'queue',
        title: 'Antrian Panjang',
        description: 'Bukti acara sukses: Tamu rela antri demi souvenir ini.',
        icon: Users,
        type: 'image',
        src: '/komukuna-event/process/exp-queue.jpg',
        duration: 9000,
        isLandscape: true,
    }
];

export default function ExperienceStory() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    useEffect(() => {
        if (isPreviewOpen) return; // Pause timer if preview is open

        const stepDuration = steps[currentStep].duration;
        const timer = setTimeout(() => {
            setCurrentStep((prev) => (prev + 1) % steps.length);
        }, stepDuration);

        return () => clearTimeout(timer);
    }, [currentStep, isPreviewOpen]);

    return (
        <>
            <div className="relative mx-auto w-full max-w-sm aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-gray-900 bg-gray-900 group ring-1 ring-white/10">

                {/* Story Progress Bar */}
                <div className="absolute top-5 left-0 w-full px-5 flex gap-1.5 z-30 pointer-events-none">
                    {steps.map((step, index) => (
                        <div key={step.id} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                            <motion.div
                                className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                initial={{ width: "0%" }}
                                animate={{ width: index === currentStep && !isPreviewOpen ? "100%" : index < currentStep ? "100%" : "0%" }}
                                transition={{ duration: index === currentStep && !isPreviewOpen ? step.duration / 1000 : 0, ease: "linear" }}
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
                        className="absolute inset-0 w-full h-full bg-black/50 overflow-hidden cursor-zoom-in"
                        onClick={() => setIsPreviewOpen(true)}
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
                            // Use Motion Pan for Landscape items
                            steps[currentStep].isLandscape ? (
                                <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
                                    <motion.div
                                        initial={{ scale: 1.2, x: '-10%' }}
                                        animate={{ scale: 1.2, x: '10%' }}
                                        // Smoother, slower pan for 9s duration
                                        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                                        className="w-full h-full relative opacity-90"
                                    >
                                        <Image
                                            src={steps[currentStep].src}
                                            alt={steps[currentStep].title}
                                            fill
                                            className="object-cover"
                                        />
                                    </motion.div>

                                    {/* Tap Hint for Landscape */}
                                    <div className="absolute bottom-32 right-8 flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/10 z-20 animate-pulse pointer-events-none">
                                        <div className="w-2 h-2 bg-white rounded-full" />
                                        <span className="text-[10px] font-medium text-white/90">Klik zoom</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative w-full h-full">
                                    <Image
                                        src={steps[currentStep].src}
                                        alt={steps[currentStep].title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/20 opacity-90 z-20 pointer-events-none" />
                    </motion.div>
                </AnimatePresence>

                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-8 z-30 pointer-events-none">
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

            {/* Preview Modal */}
            <AnimatePresence>
                {isPreviewOpen && (
                    <div
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
                        onClick={() => setIsPreviewOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center rounded-xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={steps[currentStep].src}
                                alt="Full Preview"
                                fill
                                className="object-contain"
                            />

                            <button
                                onClick={() => setIsPreviewOpen(false)}
                                className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors border border-white/10"
                            >
                                <X size={24} />
                            </button>
                        </motion.div>

                        <div className="absolute bottom-8 left-0 right-0 text-center text-white/50 text-sm pointer-events-none">
                            Klik di mana saja untuk menutup
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
