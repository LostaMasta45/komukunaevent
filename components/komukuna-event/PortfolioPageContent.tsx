"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers } from 'lucide-react';
import BentoGridSpotlight, { PhotoboothItemProps } from '@/components/komukuna-event/BentoGridSpotlight';
import VideoPreviewCard from '@/components/komukuna-event/VideoPreviewCard';
import VideoPlayerModal from '@/components/komukuna-event/VideoPlayerModal';

interface VideoItemProps {
    id: number;
    title: string;
    src: string;
}

interface PortfolioPageContentProps {
    photoItems: PhotoboothItemProps[];
    videoItems: VideoItemProps[];
}

export default function PortfolioPageContent({ photoItems, videoItems }: PortfolioPageContentProps) {
    const [activeTab, setActiveTab] = useState<'photobooth' | 'videobooth'>('photobooth');
    const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);

    const handleMaximizeVideo = (src: string) => {
        setSelectedVideoUrl(src);
    };

    return (
        <section className="min-h-screen bg-[#0F0F0F] pt-32 pb-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-komukuna-pink/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-komukuna-purple/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-komukuna-pink to-komukuna-purple rounded-full shadow-lg shadow-komukuna-pink/20 mb-6"
                    >
                        <Layers className="text-white" size={24} />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                    >
                        Our <span className="text-komukuna-pink">Portfolio</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-lg max-w-2xl mx-auto"
                    >
                        Jelajahi momen-momen terbaik yang telah kami abadikan. Temukan inspirasi untuk event Anda selanjutnya.
                    </motion.p>
                </div>

                {/* Tabs Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center mb-12"
                >
                    <div className="flex bg-white/5 p-1.5 rounded-full relative">
                        <motion.div
                            className="absolute top-1.5 bottom-1.5 bg-gradient-to-r from-komukuna-pink to-komukuna-purple rounded-full shadow-lg"
                            initial={false}
                            animate={{
                                left: activeTab === 'photobooth' ? '6px' : '50%',
                                width: 'calc(50% - 6px)',
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                        <button
                            onClick={() => setActiveTab('photobooth')}
                            className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold transition-colors md:text-base ${activeTab === 'photobooth' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            📸 Photobooth
                        </button>
                        <button
                            onClick={() => setActiveTab('videobooth')}
                            className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold transition-colors md:text-base ${activeTab === 'videobooth' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            🎬 Videobooth
                        </button>
                    </div>
                </motion.div>

                {/* Content Area */}
                <div className="min-h-[50vh]">
                    <AnimatePresence mode="wait">
                        {activeTab === 'photobooth' ? (
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
                                            className="mb-12 last:mb-0 border border-white/5 rounded-[2.5rem] bg-white/[0.02] overflow-hidden"
                                        >
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
                            <motion.div
                                key="videobooth"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto"
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
            </div>

            {/* Individual Video Player Modal (Global) */}
            <VideoPlayerModal
                isOpen={!!selectedVideoUrl}
                videoSrc={selectedVideoUrl || ''}
                onClose={() => setSelectedVideoUrl(null)}
            />
        </section>
    );
}
