"use client";

import { motion } from 'framer-motion';
import { Camera, Aperture, Check } from 'lucide-react';
import PhotoboothProcess from '@/components/komukuna-event/PhotoboothProcess';

export default function ServicesSection() {
    return (
        <section id="services" className="py-24 bg-komukuna-dark relative">
            <div className="container mx-auto px-4 md:px-6">

                {/* Intro: Problem & Solution (Updated per Plan) */}
                <div className="text-center mb-20 space-y-6 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Event <span className="text-komukuna-pink">Next Level</span>, Bukan Sekadar Kumpul.
                        </h2>
                        <p className="text-xl text-gray-400">
                            Apapun acaranya—<span className="text-white">Corporate Gathering, Launching Produk, Wedding, atau Sweet 17th</span>—kami siap bikin tamu Anda antri panjang demi konten seru.
                        </p>
                    </motion.div>
                </div>

                <div className="space-y-32">

                    {/* SERVICE 1: PHOTOBOOTH */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="order-2 lg:order-1"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 text-sm font-medium mb-6">
                                <Camera size={16} /> Photobooth
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Cetak 15 Detik. Kualitas Studio. Wajah Glowing.
                            </h3>
                            <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                Biarkan tamu Anda membawa pulang souvenir terbaik berupa foto cetak berkualitas studio.
                                Dilengkapi dengan properti seru dan pencahayaan profesional, dijamin setiap senyum terlihat glowing.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {[
                                    'Kamera DSLR & Lighting Studio Professional',
                                    'Cetak 4R High-Quality dalam 15 Detik',
                                    'Unlimited Session & Print',
                                    'Softcopy Full via Google Drive'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start text-gray-300">
                                        <Check className="w-5 h-5 text-komukuna-pink mr-3 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="order-1 lg:order-2 relative flex justify-center"
                        >
                            <PhotoboothProcess />
                        </motion.div>
                    </div>



                </div>

            </div>
        </section>
    );
}
