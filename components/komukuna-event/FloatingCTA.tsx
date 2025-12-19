"use client";

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function FloatingCTA() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="fixed z-50 bottom-6 inset-x-4 md:inset-x-auto md:right-8 md:bottom-8 flex justify-center md:block"
        >
            <Link href="https://wa.me/6283122866975?text=Halo Komukuna, saya mau tanya-tanya dulu dong." target="_blank" className="w-full md:w-auto">
                <div className="relative group w-full md:w-auto">

                    {/* Mobile: Wide Button */}
                    <button className="md:hidden relative w-full bg-[#25D366] text-white py-3.5 px-6 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] active:scale-95 transition-transform flex items-center justify-center gap-3 font-bold text-base">
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse z-0" />
                        <MessageCircle size={24} fill="white" className="z-10" />
                        <span className="z-10">Tanya Jadwal & Pricelist</span>
                    </button>

                    {/* Desktop: Compact Expandable Pill */}
                    <div className="hidden md:flex justify-end">
                        <motion.button
                            className="bg-[#25D366] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] flex items-center overflow-hidden group hover:bg-[#20b857] transition-colors"
                            whileHover={{ width: 'auto' }}
                            initial={{ width: '60px' }}
                        >
                            <div className="w-[60px] h-[60px] flex items-center justify-center shrink-0">
                                <MessageCircle size={28} fill="white" className="text-white" />
                            </div>

                            <motion.span
                                className="whitespace-nowrap font-bold text-sm pr-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -ml-1"
                            >
                                Tanya Jadwal & Pricelist
                            </motion.span>
                        </motion.button>
                    </div>

                </div>
            </Link>
        </motion.div>
    );
}
