"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Camera, Layers, Image as ImageIcon, Printer, Video } from 'lucide-react';
import { cloudinaryProcessVideos } from '@/lib/cloudinary-videos';

const steps = [
    {
        id: 'bts-video',
        title: 'The Vibe',
        description: 'Serunya Suasana Antrian & Gaya',
        icon: Video,
        type: 'video',
        src: cloudinaryProcessVideos['video-bts1'],
        poster: ''
    },
    {
        id: 'bts-photo',
        title: 'The Action',
        description: 'Directed by Professional Photographer',
        icon: Camera,
        type: 'image',
        src: '/komukuna-event/process/fotobts1.jpg'
    },
    {
        id: 'raw',
        title: 'The Shot',
        description: 'Kualitas Asli (Raw) - Tajam & Jernih',
        icon: ImageIcon,
        type: 'image',
        src: '/komukuna-event/process/hasil-raw1.jpg'
    },
    {
        id: 'template',
        title: 'The Art',
        description: 'Custom Layout Design Premium',
        icon: Layers,
        type: 'image',
        src: '/komukuna-event/process/hasil-template1.jpg'
    },
    {
        id: 'print',
        title: 'The Memory',
        description: 'Cetak Kilat 15 Detik di Tangan',
        icon: Printer,
        type: 'image',
        src: '/komukuna-event/process/hasil-cetak1.jpg'
    }
];

export default function PhotoboothProcess() {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % steps.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative mx-auto w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-800 bg-gray-900 group">

            {/* Story Progress Bar */}
            <div className="absolute top-4 left-0 w-full px-4 flex gap-1 z-30">
                {steps.map((step, index) => (
                    <div key={step.id} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-white"
                            initial={{ width: "0%" }}
                            animate={{ width: index === currentStep ? "100%" : index < currentStep ? "100%" : "0%" }}
                            transition={{ duration: index === currentStep ? 3 : 0, ease: "linear" }}
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
                    transition={{ duration: 0.5 }}
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

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Text Overlay */}
            <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                <motion.div
                    key={`text-${currentStep}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        {(() => {
                            const Icon = steps[currentStep].icon; // FIX: Capitalize component name
                            return (
                                <div className="p-2 rounded-full bg-komukuna-pink/20 text-komukuna-pink">
                                    <Icon size={18} />
                                </div>
                            );
                        })()}
                        <span className="text-sm font-bold text-komukuna-pink uppercase tracking-wider">
                            Step {currentStep + 1}: {steps[currentStep].title}
                        </span>
                    </div>
                    <h3 className="text-xl font-bold text-white leading-tight">
                        {steps[currentStep].description}
                    </h3>
                </motion.div>
            </div>

        </div>
    );
}
