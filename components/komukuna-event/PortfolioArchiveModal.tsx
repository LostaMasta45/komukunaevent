"use client";

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, Layers } from 'lucide-react';
import BentoGridSpotlight, { PhotoboothItemProps } from '@/components/komukuna-event/BentoGridSpotlight';
import VideoPreviewCard from '@/components/komukuna-event/VideoPreviewCard';
import VideoPlayerModal from '@/components/komukuna-event/VideoPlayerModal';

interface VideoItemProps {
    id: number;
    title: string;
    src: string;
}

interface PortfolioArchiveModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialTab: 'photobooth' | 'videobooth';
    photoItems: PhotoboothItemProps[];
    videoItems: VideoItemProps[];
}

export default function PortfolioArchiveModal({
    isOpen,
    onClose,
    initialTab,
    photoItems,
    videoItems
}: PortfolioArchiveModalProps) {
    const [activeTab, setActiveTab] = useState<'photobooth' | 'videobooth'>(initialTab);
    const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);

    // Sync internal tab state with prop when modal opens
    useEffect(() => {
        if (isOpen) {
            setActiveTab(initialTab);
            document.body.style.overflow = 'hidden';
        } else {
            // Only reset overflow if the video modal is NOT open
            if (!selectedVideoUrl) {
                document.body.style.overflow = 'auto';
            }
        }
        return () => {
            // Cleanup handled by individual modals
        };
    }, [isOpen, initialTab, selectedVideoUrl]);

    const handleMaximizeVideo = (src: string) => {
        setSelectedVideoUrl(src);
    };

    // For SSR compatibility - only render portal on client
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ isolation: 'isolate' }}>
                    {/* Backdrop - Solid black to fully hide landing page */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black"
                    />

                    {/* Modal Container - Full screen on mobile, centered on desktop */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="relative w-screen h-screen md:h-[95vh] md:w-[95vw] md:max-w-7xl md:rounded-3xl bg-[#0F0F0F] flex flex-col overflow-hidden shadow-2xl md:border md:border-white/10"
                    >
                        {/* Header - Clean and organized */}
                        <div className="flex-none bg-[#0F0F0F] pt-[env(safe-area-inset-top)]">
                            <div className="px-4 py-3 md:px-6 md:py-4 border-b border-white/10 flex items-center gap-4">
                                {/* Title */}
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-komukuna-pink to-komukuna-purple flex items-center justify-center shadow-lg shadow-komukuna-pink/20 flex-shrink-0">
                                        <Layers className="text-white" size={18} />
                                    </div>
                                    <div className="min-w-0">
                                        <h2 className="text-base md:text-xl font-bold text-white tracking-tight truncate">Portfolio</h2>
                                        <p className="text-[10px] md:text-xs text-gray-400 font-medium hidden md:block">Explore our best moments</p>
                                    </div>
                                </div>

                                {/* Desktop Tabs */}
                                <div className="hidden md:flex bg-white/5 p-1 rounded-full relative flex-shrink-0">
                                    <motion.div
                                        className="absolute top-1 bottom-1 bg-komukuna-pink rounded-full shadow-lg"
                                        initial={false}
                                        animate={{
                                            left: activeTab === 'photobooth' ? '4px' : '50%',
                                            width: 'calc(50% - 4px)',
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                    <button
                                        onClick={() => setActiveTab('photobooth')}
                                        className={`relative z-10 px-6 py-1.5 rounded-full text-sm font-bold transition-colors ${activeTab === 'photobooth' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        Photobooth
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('videobooth')}
                                        className={`relative z-10 px-6 py-1.5 rounded-full text-sm font-bold transition-colors ${activeTab === 'videobooth' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        Videobooth
                                    </button>
                                </div>

                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center flex-shrink-0"
                                    aria-label="Close"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Mobile Tabs */}
                        <div className="md:hidden flex bg-[#0F0F0F] border-b border-white/5">
                            <button
                                onClick={() => setActiveTab('photobooth')}
                                className={`flex-1 py-3 text-center text-sm font-semibold transition-all relative ${activeTab === 'photobooth' ? 'text-white' : 'text-gray-500'}`}
                            >
                                📸 Photobooth
                                {activeTab === 'photobooth' && (
                                    <motion.div layoutId="mobile-tab-indicator" className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-komukuna-pink to-komukuna-purple rounded-full" />
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab('videobooth')}
                                className={`flex-1 py-3 text-center text-sm font-semibold transition-all relative ${activeTab === 'videobooth' ? 'text-white' : 'text-gray-500'}`}
                            >
                                🎬 Videobooth
                                {activeTab === 'videobooth' && (
                                    <motion.div layoutId="mobile-tab-indicator" className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-komukuna-pink to-komukuna-purple rounded-full" />
                                )}
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            <AnimatePresence mode="wait">
                                {activeTab === 'photobooth' ? (
                                    /* Photobooth: Stacked Bento Grids ("Like Homepage") */
                                    <motion.div
                                        key="photobooth"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-12 md:space-y-16"
                                    >
                                        <div className="max-w-6xl mx-auto">
                                            {photoItems.map((item, idx) => (
                                                <motion.div
                                                    key={item.id}
                                                    initial={{ opacity: 0, y: 50 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true, margin: "-100px" }}
                                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                                    className="mb-12 last:mb-0"
                                                >
                                                    {/* Bento Grid Item */}
                                                    <BentoGridSpotlight
                                                        item={item}
                                                        onMaximizeVideo={handleMaximizeVideo}
                                                    />
                                                </motion.div>
                                            ))}

                                            {photoItems.length === 0 && (
                                                <div className="text-center py-20 text-gray-500">
                                                    No photobooth albums found.
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ) : (
                                    /* Video Grid View (Updated with VideoPreviewCard) */
                                    <motion.div
                                        key="videobooth"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto"
                                    >
                                        {videoItems.map((video, idx) => (
                                            <motion.div
                                                key={video.id}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: idx * 0.05 }}
                                            >
                                                <VideoPreviewCard
                                                    item={video}
                                                    onMaximize={() => handleMaximizeVideo(video.src)}
                                                />
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* Internal Video Player Modal for Archive */}
                    <VideoPlayerModal
                        isOpen={!!selectedVideoUrl}
                        videoSrc={selectedVideoUrl || ''}
                        onClose={() => setSelectedVideoUrl(null)}
                    />
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
