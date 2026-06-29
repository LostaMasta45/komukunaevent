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
                className="fixed z-50 bottom-6 right-4 md:right-8 md:bottom-8 flex flex-col items-end"
            >
                {/* Proactive Message Bubble */}
                <AnimatePresence>
                    {showBubble && !isModalOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            className="mb-4 mr-2 bg-white text-gray-900 p-4 rounded-2xl rounded-br-sm shadow-xl max-w-[250px] relative"
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

                        {/* Mobile: Wide Button (if you want it full width on mobile, keep w-full, but since it's aligned right, let's make it floating circle on mobile too or keep pill) */}
                        <button className="md:hidden relative bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] active:scale-95 transition-transform flex items-center justify-center">
                            <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse z-0" />
                            <MessageCircle size={28} fill="white" className="z-10" />
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
