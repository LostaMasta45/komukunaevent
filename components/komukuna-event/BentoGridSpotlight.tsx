"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Camera, Image as ImageIcon, Printer, Layers, Maximize2, X } from 'lucide-react';
import Image from 'next/image';
import { getVideoThumbnail } from '@/lib/cloudinary-videos';

export interface PhotoboothItemProps {
    id: string | number;
    title: string; // e.g., "Fitrah & Okta Wedding"
    subtitle: string; // e.g., "Live 360° Videobooth Experience"
    badge?: string; // e.g., "New Portfolio"
    videoSrc: string; // Vertical video
    templateImage: string; // Vertical template
    printImage: string; // Vertical print result
    rawImage: string; // Landscape/Original raw
    btsImage: string; // Landscape/Original BTS
    reversed?: boolean; // Option to flip layout if needed
    isLandscape?: boolean; // If true, Template and Print images use landscape aspect ratio
}

export default function BentoGridSpotlight({
    item,
    onMaximizeVideo
}: {
    item: PhotoboothItemProps;
    onMaximizeVideo?: (src: string) => void;
}) {
    // Determine aspect ratio based on item.isLandscape
    // Default is Portrait (2/3), Landscape can be 3/2 or 4/3
    const galleryAspectRatio = item.isLandscape ? "aspect-[3/2]" : "aspect-[2/3]";

    // Local state for image lightbox
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <section className="py-12 md:py-16 border-b border-white/5 last:border-0 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                {/* COLUMN 1: Vertical Video (The Reel) - Spans 4 cols (1/3) */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-4 relative rounded-[2rem] overflow-hidden group aspect-[9/16] shadow-2xl border border-white/10"
                >
                    <div className="absolute inset-0 bg-gray-900">
                        <video
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            poster={getVideoThumbnail(item.videoSrc)}
                        >
                            <source src={item.videoSrc} type="video/mp4" />
                        </video>
                    </div>

                    {/* Subtle Gradient for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

                    {/* Content Overlay - Improved visibility */}
                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 pointer-events-none">
                        <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 border border-white/20 group-hover:scale-110 transition-transform shadow-lg">
                            <Play fill="white" className="text-white ml-1 w-6 h-6" />
                        </div>
                        <div className="space-y-2">
                            {item.badge && (
                                <div className="inline-block px-3 py-1 rounded-full bg-komukuna-pink/20 border border-komukuna-pink/30 text-komukuna-pink text-xs font-bold uppercase tracking-wider mb-2">
                                    {item.badge}
                                </div>
                            )}
                            <h3 className="text-white text-3xl font-bold leading-tight drop-shadow-lg p-1" dangerouslySetInnerHTML={{ __html: item.title }} />
                            <p className="text-gray-300 text-sm font-medium">{item.subtitle}</p>
                        </div>
                    </div>

                    {/* Maximize Button - Top Right */}
                    {onMaximizeVideo && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onMaximizeVideo(item.videoSrc);
                            }}
                            className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white/70 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10 pointer-events-auto"
                            title="Fullscreen"
                        >
                            <Maximize2 size={20} />
                        </button>
                    )}
                </motion.div>

                {/* COLUMN 2: Photo Gallery - Spans 8 cols (2/3) */}
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">

                    {/* ROW 1: Photos (Template & Print) - Responsive Aspect Ratio */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className={`relative rounded-[2rem] overflow-hidden ${galleryAspectRatio} group border border-white/10 shadow-xl cursor-zoom-in`}
                        onClick={() => setSelectedImage(item.templateImage)}
                    >
                        <Image
                            src={item.templateImage}
                            alt="Premium Template Design"
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 pointer-events-none" />

                        {/* Zoom Hint Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
                                <Maximize2 size={16} className="text-white" />
                                <span className="text-white text-sm font-medium">Klik Zoom</span>
                            </div>
                        </div>

                        <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                            <div className="bg-black/40 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 flex items-center gap-3">
                                <div className="p-2 bg-komukuna-pink/20 rounded-full text-komukuna-pink">
                                    <Layers size={18} />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">Premium Template</p>
                                    <p className="text-white/60 text-xs">Custom Design</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className={`relative rounded-[2rem] overflow-hidden ${galleryAspectRatio} group border border-white/10 shadow-xl cursor-zoom-in`}
                        onClick={() => setSelectedImage(item.printImage)}
                    >
                        <Image
                            src={item.printImage}
                            alt="Hasil Cetak Photo"
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 pointer-events-none" />

                        {/* Zoom Hint Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 flex items-center gap-2">
                                <Maximize2 size={16} className="text-white" />
                                <span className="text-white text-sm font-medium">Klik Zoom</span>
                            </div>
                        </div>

                        <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                            <div className="bg-black/40 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 flex items-center gap-3">
                                <div className="p-2 bg-komukuna-purple/20 rounded-full text-komukuna-purple">
                                    <Printer size={18} />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">Cetak 15 Detik</p>
                                    <p className="text-white/60 text-xs">High Quality Print</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ROW 2: Landscape Photos (Raw & BTS) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="relative rounded-[2rem] overflow-hidden aspect-[3/2] group border border-white/10 shadow-xl cursor-zoom-in"
                        onClick={() => setSelectedImage(item.rawImage)}
                    >
                        <Image
                            src={item.rawImage}
                            alt="Raw Photo File"
                            fill
                            sizes="(max-width: 768px) 100vw, 25vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                        />

                        {/* Zoom Hint Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-2">
                                <Maximize2 size={14} className="text-white" />
                                <span className="text-white text-xs font-medium">Klik Zoom</span>
                            </div>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                                <ImageIcon size={14} className="text-blue-400" />
                                <span className="text-white text-xs font-bold">File Asli (Raw)</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="relative rounded-[2rem] overflow-hidden aspect-[3/2] group border border-white/10 shadow-xl cursor-zoom-in"
                        onClick={() => setSelectedImage(item.btsImage)}
                    >
                        <Image
                            src={item.btsImage}
                            alt="BTS Photographer"
                            fill
                            sizes="(max-width: 768px) 100vw, 25vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                        />

                        {/* Zoom Hint Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-2">
                                <Maximize2 size={14} className="text-white" />
                                <span className="text-white text-xs font-medium">Klik Zoom</span>
                            </div>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                                <Camera size={14} className="text-yellow-400" />
                                <span className="text-white text-xs font-bold">BTS</span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Lightbox Modal */}
            {/* Using standard conditional rendering instead of AnimatePresence for simplicity if not imported, 
                but based on previous file AnimatePresence wasn't imported. 
                I will duplicate the logic or check imports. 
                Wait, I see motion is imported. I should import AnimatePresence.
            */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
                    onClick={() => setSelectedImage(null)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative w-full max-w-5xl h-[85vh] flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selectedImage}
                            alt="Full Preview"
                            fill
                            className="object-contain"
                        />

                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors border border-white/10"
                        >
                            <X size={24} />
                        </button>
                    </motion.div>
                </div>
            )}
        </section>
    );
}
