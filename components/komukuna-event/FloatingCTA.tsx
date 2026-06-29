"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import LeadCaptureModal from './LeadCaptureModal';

export default function FloatingCTA() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showBubble, setShowBubble] = useState(false);

    useEffect(() => {
        // Show proactive bubble after 5 seconds
        const timer = setTimeout(() => {
            setShowBubble(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                className="fixed z-50 bottom-6 inset-x-4 md:inset-x-auto md:right-8 md:bottom-8 flex flex-col md:items-end items-center"
            >
                {/* Proactive Message Bubble */}
                <AnimatePresence>
                    {showBubble && !isModalOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            className="mb-4 bg-white text-gray-900 p-4 rounded-2xl rounded-bl-sm md:rounded-bl-2xl md:rounded-br-sm shadow-xl max-w-[280px] md:max-w-[250px] relative md:mr-2"
                        >
                            <button 
                                onClick={(e) => { e.stopPropagation(); setShowBubble(false); }}
                                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                            >
                                <X size={14} />
                            </button>
                            <p className="text-sm font-medium pr-4">Halo! 👋 Butuh photobooth untuk event apa nih?</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div onClick={() => { setIsModalOpen(true); setShowBubble(false); }} className="w-full md:w-auto cursor-pointer">
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
                </div>
            </motion.div>

            <LeadCaptureModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </>
    );
}
