"use client";

import { motion } from 'framer-motion';
import { Play, Camera, Image as ImageIcon, Printer, Layers } from 'lucide-react';
import Image from 'next/image';

export default function BentoGridSpotlight() {
    return (
        <section className="py-12 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                {/* COLUMN 1: Vertical Video (The Reel) - Spans 4 cols (1/3) */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
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
                        >
                            <source src="/komukuna-event/process/video-bts1.mp4" type="video/mp4" />
                        </video>
                    </div>

                    {/* Subtle Gradient for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

                    {/* Content Overlay - Improved visibility */}
                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                        <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 border border-white/20 group-hover:scale-110 transition-transform shadow-lg">
                            <Play fill="white" className="text-white ml-1 w-6 h-6" />
                        </div>
                        <div className="space-y-2">
                            <div className="inline-block px-3 py-1 rounded-full bg-komukuna-pink/20 border border-komukuna-pink/30 text-komukuna-pink text-xs font-bold uppercase tracking-wider mb-2">
                                New Portfolio
                            </div>
                            <h3 className="text-white text-3xl font-bold leading-tight drop-shadow-lg">Fitrah & Okta<br />Wedding</h3>
                            <p className="text-gray-300 text-sm font-medium">Live 360° Videobooth Experience</p>
                        </div>
                    </div>
                </motion.div>

                {/* COLUMN 2: Photo Gallery - Spans 8 cols (2/3) */}
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">

                    {/* ROW 1: Vertical Photos (Premium Template & Cetak) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="relative rounded-[2rem] overflow-hidden aspect-[2/3] group border border-white/10 shadow-xl"
                    >
                        <Image
                            src="/komukuna-event/process/hasil-template1.jpg"
                            alt="Premium Template Design"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-6 left-6 right-6">
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
                        className="relative rounded-[2rem] overflow-hidden aspect-[2/3] group border border-white/10 shadow-xl"
                    >
                        <Image
                            src="/komukuna-event/process/hasil-cetak1.jpg"
                            alt="Hasil Cetak Photo"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-6 left-6 right-6">
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
                    {/* Note: User asked for "Ukuran aslinya" for the first two. 
                        The original code had Raw & BTS as landscape (3:2) but labeled them as aspect-[3/2] which is landscape.
                        Assuming these are correct.
                    */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="relative rounded-[2rem] overflow-hidden aspect-[3/2] group border border-white/10 shadow-xl"
                    >
                        <Image
                            src="/komukuna-event/process/hasil-raw1.jpg"
                            alt="Raw Photo File"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute bottom-4 left-4 right-4">
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
                        className="relative rounded-[2rem] overflow-hidden aspect-[3/2] group border border-white/10 shadow-xl"
                    >
                        <Image
                            src="/komukuna-event/process/fotobts1.jpg"
                            alt="BTS Photographer"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute bottom-4 left-4 right-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                                <Camera size={14} className="text-yellow-400" />
                                <span className="text-white text-xs font-bold">Studio Lighting</span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
