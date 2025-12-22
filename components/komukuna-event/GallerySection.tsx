"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Aperture, ArrowRight, Play, Layers, Maximize2 } from 'lucide-react';
import BentoGridSpotlight, { PhotoboothItemProps } from '@/components/komukuna-event/BentoGridSpotlight';
import PortfolioArchiveModal from '@/components/komukuna-event/PortfolioArchiveModal';
import VideoPlayerModal from '@/components/komukuna-event/VideoPlayerModal';
import VideoPreviewCard from '@/components/komukuna-event/VideoPreviewCard';

import { portfolioItems, videoItems } from '@/components/komukuna-event/portfolio-data';

export default function GallerySection() {
    const [isArchiveOpen, setIsArchiveOpen] = useState(false);
    const [initialArchiveTab, setInitialArchiveTab] = useState<'photobooth' | 'videobooth'>('photobooth');

    // Video Player Modal State
    const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);

    const openArchive = (tab: 'photobooth' | 'videobooth') => {
        setInitialArchiveTab(tab);
        setIsArchiveOpen(true);
    };

    const handleMaximizeVideo = (src: string) => {
        setSelectedVideoUrl(src);
    };

    return (
        <section className="py-24 bg-[#0F0F0F] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-komukuna-pink/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-komukuna-purple/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4">
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">Momen <span className="text-komukuna-pink">Eksklusif</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Intip sekilas karya terbaik kami. Eksplorasi koleksi lengkap kami di arsip portfolio.
                    </p>
                </div>

                {/* 1. FEATURED PHOTOBOOTH (Bento Grid) */}
                <div className="mb-20">
                    <div className="flex items-center justify-between mb-8 px-2">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/5 rounded-full ring-1 ring-white/10">
                                <Camera className="text-komukuna-pink" size={20} />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Featured Event</h3>
                        </div>
                        <button
                            onClick={() => openArchive('photobooth')}
                            className="group flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors"
                        >
                            View All Albums
                            <span className="bg-white/10 p-1.5 rounded-full group-hover:bg-white/20 transition-colors">
                                <ArrowRight size={14} />
                            </span>
                        </button>
                    </div>

                    {/* Show only the FIRST item as Featured */}
                    <div className="border border-white/5 rounded-[2.5rem] bg-white/[0.02] overflow-hidden">
                        <BentoGridSpotlight
                            item={portfolioItems[0]}
                            onMaximizeVideo={handleMaximizeVideo}
                        />
                    </div>
                </div>

                {/* 2. RECENT VIDEOBOOTH (Horizontal Scroll / Grid) */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-8 px-2">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/5 rounded-full ring-1 ring-white/10">
                                <Aperture className="text-komukuna-purple" size={20} />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Latest Reels</h3>
                        </div>
                        <button
                            onClick={() => openArchive('videobooth')}
                            className="group flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors"
                        >
                            Open Video Archive
                            <span className="bg-white/10 p-1.5 rounded-full group-hover:bg-white/20 transition-colors">
                                <Layers size={14} />
                            </span>
                        </button>
                    </div>

                    {/* Display only first 4 videos */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {videoItems.slice(0, 4).map((item, index) => (
                            <VideoPreviewCard
                                key={item.id}
                                item={item}
                                onMaximize={() => handleMaximizeVideo(item.src)}
                            />
                        ))}
                    </div>
                </div>

                {/* Call to Action for Archive */}
                <div className="text-center mt-12 md:mt-16">
                    <button
                        onClick={() => openArchive('photobooth')}
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-komukuna-pink to-komukuna-purple text-white font-bold text-lg shadow-lg hover:shadow-komukuna-pink/25 hover:scale-105 transition-all duration-300"
                    >
                        <span>Jelajahi Semua Portfolio</span>
                        <GridIcon />
                    </button>
                </div>

            </div>

            {/* Archive Modal System */}
            <PortfolioArchiveModal
                isOpen={isArchiveOpen}
                onClose={() => setIsArchiveOpen(false)}
                initialTab={initialArchiveTab}
                photoItems={portfolioItems}
                videoItems={videoItems}
            />

            {/* Individual Video Player Modal (Global) */}
            <VideoPlayerModal
                isOpen={!!selectedVideoUrl}
                videoSrc={selectedVideoUrl || ''}
                onClose={() => setSelectedVideoUrl(null)}
            />
        </section>
    );
}

// Sub-components for cleaner code
// UPDATED: Now supports inline play and separate Maximize button


function GridIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="7" height="7" x="3" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="3" rx="1" />
            <rect width="7" height="7" x="14" y="14" rx="1" />
            <rect width="7" height="7" x="3" y="14" rx="1" />
        </svg>
    )
}
