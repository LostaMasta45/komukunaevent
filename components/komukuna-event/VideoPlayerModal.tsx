"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

interface VideoPlayerModalProps {
    isOpen: boolean;
    videoSrc: string;
    videoTitle?: string;
    onClose: () => void;
}

export default function VideoPlayerModal({
    isOpen,
    videoSrc,
    videoTitle,
    onClose
}: VideoPlayerModalProps) {

    // Handle ESC key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto'; // Restore scroll
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 md:top-8 md:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all z-50 group"
                >
                    <X size={28} />
                    <span className="sr-only">Close</span>
                </button>

                {/* Video Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative w-full max-w-sm md:max-w-md lg:max-w-lg aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                    onClick={(e) => e.stopPropagation()}
                >
                    <video
                        src={videoSrc}
                        className="w-full h-full object-cover"
                        autoPlay
                        controls
                        playsInline
                    />

                    {videoTitle && (
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none">
                            <h3 className="text-white text-lg font-bold">{videoTitle}</h3>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
