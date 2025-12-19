"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Aperture, ArrowRight, Play, Layers, Maximize2 } from 'lucide-react';
import BentoGridSpotlight, { PhotoboothItemProps } from '@/components/komukuna-event/BentoGridSpotlight';
import PortfolioArchiveModal from '@/components/komukuna-event/PortfolioArchiveModal';
import VideoPlayerModal from '@/components/komukuna-event/VideoPlayerModal';
import VideoPreviewCard from '@/components/komukuna-event/VideoPreviewCard';

// Photobooth Data (Only needed here for the array)
const portfolioItems: PhotoboothItemProps[] = [
    {
        id: 1,
        badge: "Featured Wedding",
        title: "Fitrah & Okta<br />Wedding",
        subtitle: "Live 360° Videobooth Experience",
        videoSrc: "/komukuna-event/process/video-bts1.mp4",
        templateImage: "/komukuna-event/process/hasil-template1.jpg",
        printImage: "/komukuna-event/process/hasil-cetak1.jpg",
        rawImage: "/komukuna-event/process/hasil-raw1.jpg",
        btsImage: "/komukuna-event/process/fotobts1.jpg",
    },
    {
        id: 2,
        badge: "New Release",
        title: "EX3 Basketball<br />Competition",
        subtitle: "Sport Event Photobooth & 360°",
        videoSrc: "/komukuna-event/process/video-bts2.mp4",
        templateImage: "/komukuna-event/process/hasil-template2.jpg",
        printImage: "/komukuna-event/process/hasil-cetak2.jpeg",
        rawImage: "/komukuna-event/process/hasil-raw2.jpg",
        btsImage: "/komukuna-event/process/fotobts2.JPG",
    }
];

// Real Data for Videobooth
const videoItems = [
    { id: 1, title: 'Aksara 27 April 2025', src: '/portofolio/videobooth/Aksara 27 April 2025 @komukunastudio.mp4' },
    { id: 2, title: 'Aksara Janari Majapahit', src: '/portofolio/videobooth/Aksara Janari Majapahit 18 Januari 2025 @komukunastudio.mp4' },
    { id: 3, title: 'CAMPUSFAIR 2025 MAN 2 Mojokerto', src: '/portofolio/videobooth/CAMPUSFAIR2025 MAN 2 Mojokerto, 20 Januari 2025 @komukunastudio_2.mp4' },
    { id: 4, title: 'Carnaval Fun Kuripan', src: '/portofolio/videobooth/Carnaval Fun Kuripan Sumobito.mp4' },
    { id: 5, title: 'Dialog Cinta', src: '/portofolio/videobooth/Dialog Cinta 19-20 Juli 2025 @komukunastudio.mp4' },
    { id: 6, title: 'Forkopimda Cotton Run', src: '/portofolio/videobooth/Forkopimda Cotton Run 25-05-2025 @𝗸𝗼𝗺𝘂𝗸𝘂𝗻𝗮𝘀𝘁𝘂𝗱𝗶𝗼, 𝗢𝗥𝗗𝗘𝗥 𝗕𝗬 𝗪𝗔 𝟬𝟴𝟯𝟭-𝟮𝟮𝟴𝟲-𝟲𝟵𝟳𝟱_2.mp4' },
    { id: 7, title: 'Gemilang SMKN 1 Jombang', src: '/portofolio/videobooth/Gemilang SMKN 1 Jombang 24 Mei 2025 @komukunastudio.mp4' },
    { id: 8, title: 'Gesit Run Jombang', src: '/portofolio/videobooth/Gesit Run Jombang, 15 Juni 2025 @komukunastudio.mp4' },
    { id: 9, title: 'Halal bi Halal', src: '/portofolio/videobooth/Halal bi Halal 19 April 2025 @komukunastudio_2.mp4' },
    { id: 10, title: 'JOMBANG FEST 2025', src: '/portofolio/videobooth/JOMBANG FEST 2025 @komukunastudio Copy.mp4' },
    { id: 11, title: 'Jalan Ceria & Bazar Kapas Gading', src: '/portofolio/videobooth/Jalan Ceria & Bazar Kapas Gading SBY.mp4' },
    { id: 12, title: 'Jalan Santai Pondok Teratai', src: '/portofolio/videobooth/Jalan Santai Pondok Teratai.mp4' },
    { id: 13, title: 'Jalan Santai Warga Melati', src: '/portofolio/videobooth/Jalan Santai Warga Melati SBY.mp4' },
    { id: 14, title: 'Jombang Fun Run', src: '/portofolio/videobooth/Jombang Fun Run by @komukunastudio - SEWA WA 0895-3328-78425_2.mp4' },
    { id: 15, title: 'MAJAPAHIT RUN MJK', src: '/portofolio/videobooth/MAJAPAHIT RUN MJK - 22 JUNI 2025 - Videobooth by @komukunastudio.mp4' },
    { id: 16, title: 'PT Graha Mutu Persada', src: '/portofolio/videobooth/PT Graha Mutu Persada Mojokerto 28 Januari 2025 @komukunastudio_3.mp4' },
    { id: 17, title: 'Purnawiyata MI Khoiriyah', src: '/portofolio/videobooth/Purnawiyata MI Khoiriyah Sumobito 2024 Copy.mp4' },
    { id: 18, title: 'Purnawiyata MI Sabilul Huda', src: '/portofolio/videobooth/Purnawiyata MI Sabilul Huda Senden Jombang 19 Juni 2024.mp4' },
    { id: 19, title: 'Purnawiyata SMK Khoiriyah', src: '/portofolio/videobooth/Purnawiyata SMK Khoiriyah Sumobito 2024.mp4' },
    { id: 20, title: 'Reuni Descons 26 PPNS', src: '/portofolio/videobooth/Reuni Descons 26 PPNS 12 Januari 2025 @komukunastudio Copy.mp4' },
    { id: 21, title: 'SD Khatolik Wijana Jbg', src: '/portofolio/videobooth/SD Khatolik Wijana Jbg 2 Juni 2025 @komukunastudio.mp4' },
    { id: 22, title: 'SD MUHAMMADIYAH BRAWIJAYA', src: '/portofolio/videobooth/SD MUHAMMADIYAH BRAWIJAYA MJK 14 Juni 2025 @komukunastudio.mp4' },
    { id: 23, title: 'SD PLUS Muhammadiyah Brawijaya', src: '/portofolio/videobooth/SD PLUS Muhammadiyah Brawijaya Mojokerto.mp4' },
    { id: 24, title: 'SDN BALONGSARI 2 MJK', src: '/portofolio/videobooth/SDN BALONGSARI 2 MJK 11 Juni 2025 @komukunastudio.mp4' },
    { id: 25, title: 'SMABP 24 Mei 2025', src: '/portofolio/videobooth/SMABP 24 Mei 2025 @komukunastudio.mp4' },
    { id: 26, title: 'SMABP 25 Mei 2025', src: '/portofolio/videobooth/SMABP 25 Mei 2025 @komukunastudio Copy.mp4' },
    { id: 27, title: 'SMP Negeri 2 Sumobito', src: '/portofolio/videobooth/SMP Negeri 2 Sumobito, 16 Januari 2025 @komukunastudio.mp4' },
    { id: 28, title: 'Tasyakuran Khitan', src: '/portofolio/videobooth/Tasyakuran Khitan_2.mp4' },
    { id: 29, title: 'Wedding Lisa & Agus', src: '/portofolio/videobooth/Wedding Lisa & Agus 19 Juni 2025 by @komukunastudio.mp4' },
    { id: 30, title: 'Wedding Reza & Yola', src: '/portofolio/videobooth/Wedding Reza & Yola 07-07-2024.mp4' },
    { id: 31, title: 'Wisuda Tahfidz Akbar', src: "/portofolio/videobooth/Wisuda Tahfidz Akbar Raudhatul Qur'an Mojokerto 14 Desember 2024 @komukunastudio.mp4" },
];

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
