"use client";

import { motion } from 'framer-motion';
import { PencilRuler, Type, Image as ImageIcon, Layers } from 'lucide-react';
import Image from 'next/image';

const features = [
    { icon: PencilRuler, title: 'Frame Custom', desc: 'Desain bingkai foto dan overlay video 100% mengikuti tema acara Anda.' },
    { icon: Type, title: 'Teks Personal', desc: 'Tambahkan nama pengantin, tanggal, atau hashtag acara di setiap hasil.' },
    { icon: ImageIcon, title: 'Integrasi Logo', desc: 'Tampilkan logo perusahaan atau monogram wedding Anda dengan elegan.' },
];

export default function USPSection() {
    return (
        <section id="usp" className="py-24 bg-[#0A0A0A] relative overflow-hidden">

            {/* Background Decorative Blob */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-komukuna-purple/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <h4 className="text-komukuna-pink font-semibold tracking-wider uppercase mb-2">Unique Selling Point</h4>
                            {/* Updated Headlines per Copywriting Plan */}
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Bukan Sekadar Tempel Logo.
                            </h2>
                            <h3 className="text-2xl text-gray-300 font-medium mb-6">
                                Kami Desain Template Eksklusif Sesuai Tema Acara Anda.
                            </h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Kami tidak hanya mencetak foto; kami menciptakan souvenir bermerek.
                                Template Komukuna bukan template pasaran. Setiap print dan video menjadi cerminan unik dari identitas acara Anda.
                            </p>
                        </div>

                        <div className="grid gap-6">
                            {features.map((f, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 text-komukuna-purple border border-white/10">
                                        <f.icon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">{f.title}</h4>
                                        <p className="text-gray-500 text-sm">{f.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Visual Showcase */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                            {/* The 3D Render Image */}
                            {/* Replaced img tag with Next.js Image component */}
                            <Image
                                src="/komukuna-event/template-showcase.png"
                                alt="Komukuna Custom Templates Showcase"
                                fill // Use fill to make it cover the parent div
                                className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Example sizes, adjust as needed
                                priority // Load this image with high priority
                            />

                            {/* Floating Overlay Badge */}
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-xl flex items-center gap-2"
                            >
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs text-white font-medium">100% Custom Design</span>
                            </motion.div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
