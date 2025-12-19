"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Aperture, X, Maximize2, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import Image from 'next/image';
import BentoGridSpotlight from '@/components/komukuna-event/BentoGridSpotlight';

// Real Data for Photobooth
const photoItems: { id: number; title: string; image: string; ratio: string }[] = [
    // Add more real selected photos here in the future
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
    const initialVideoCount = 8;
    const [activeTab, setActiveTab] = useState<'photobooth' | 'videobooth'>('photobooth');
    const [visibleVideoCount, setVisibleVideoCount] = useState(initialVideoCount);
    const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);

    const handleLoadMore = () => {
        setVisibleVideoCount(videoItems.length);
    };

    const handleOpenModal = (index: number) => {
        setSelectedVideoIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseModal = () => {
        setSelectedVideoIndex(null);
        document.body.style.overflow = 'auto';
    };

    const handleNextVideo = () => {
        if (selectedVideoIndex !== null) {
            setSelectedVideoIndex((prev) => (prev! + 1) % videoItems.length);
        }
    };

    const handlePrevVideo = () => {
        if (selectedVideoIndex !== null) {
            setSelectedVideoIndex((prev) => (prev! - 1 + videoItems.length) % videoItems.length);
        }
    };

    return (
        <section className="py-24 bg-[#0F0F0F] overflow-hidden">
            <div className="container mx-auto px-4">

                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Momen Terbaik yang <span className="text-komukuna-pink">Tak Terlupakan</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Ribuan senyuman dan tawa bahagia telah kami abadikan. Berikut adalah bukti nyata kebahagiaan klien kami.
                    </p>

                    {/* Tabs Switcher */}
                    <div className="flex justify-center mt-8">
                        <div className="bg-white/5 p-1 rounded-full flex relative">
                            <motion.div
                                className="absolute top-1 bottom-1 bg-gradient-to-r from-komukuna-pink to-komukuna-purple rounded-full shadow-lg"
                                initial={false}
                                animate={{
                                    left: activeTab === 'photobooth' ? '4px' : '50%',
                                    width: 'calc(50% - 4px)',
                                    x: activeTab === 'videobooth' ? '0%' : '0'
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />

                            <button
                                onClick={() => setActiveTab('photobooth')}
                                className={`relative z-10 px-8 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === 'photobooth' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                <span className="flex items-center gap-2"><Camera size={16} /> Photobooth</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('videobooth')}
                                className={`relative z-10 px-8 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === 'videobooth' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                <span className="flex items-center gap-2"><Aperture size={16} /> Videobooth</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="min-h-[500px]">
                    <AnimatePresence mode="wait">
                        {activeTab === 'photobooth' ? (
                            <motion.div
                                key="photobooth"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <BentoGridSpotlight />

                                <div className="columns-2 md:columns-3 gap-4 space-y-4">
                                    {photoItems.map((item, i) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className={`break-inside-avoid group relative rounded-xl overflow-hidden bg-gray-900 ${item.ratio || 'aspect-square'} hover:scale-[1.02] transition-transform duration-300 border border-white/10`}
                                        >
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                sizes="(max-width: 768px) 50vw, 33vw"
                                            />

                                            {/* Overlay Info */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                                <p className="text-white text-sm font-bold tracking-wide">{item.title}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <div className="flex flex-col items-center space-y-8">
                                <motion.div
                                    key="videobooth"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full"
                                >
                                    {/* Responsive Container: Flex Slider on Mobile, Grid on Desktop */}
                                    <div className="flex overflow-x-auto md:grid md:grid-cols-4 gap-4 pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                                        {videoItems.slice(0, visibleVideoCount).map((item, index) => (
                                            <VideoCard key={item.id} item={item} onExpand={() => handleOpenModal(index)} />
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Load More Button */}
                                {visibleVideoCount < videoItems.length && (
                                    <button
                                        onClick={handleLoadMore}
                                        className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-medium transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                                    >
                                        <span>Lihat Semua Portfolio ({videoItems.length})</span>
                                        <div className="w-2 h-2 rounded-full bg-komukuna-pink animate-ping" />
                                    </button>
                                )}
                            </div>
                        )}
                    </AnimatePresence>
                </div>

            </div>

            {/* Fullscreen Video Modal */}
            <AnimatePresence>
                {selectedVideoIndex !== null && (
                    <VideoModal
                        isOpen={selectedVideoIndex !== null}
                        video={videoItems[selectedVideoIndex]}
                        onClose={handleCloseModal}
                        onNext={handleNextVideo}
                        onPrev={handlePrevVideo}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}

function VideoCard({ item, onExpand }: { item: any, onExpand: () => void }) {
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = (e: React.MouseEvent<HTMLDivElement>) => {
        // Prevent click if clicking the maximize button
        if ((e.target as HTMLElement).closest('.maximize-btn')) return;

        const video = e.currentTarget.querySelector('video');
        if (video) {
            if (video.paused) {
                video.play();
                setIsPlaying(true);
            } else {
                video.pause();
                setIsPlaying(false);
            }
        }
    };

    return (
        <div
            onClick={togglePlay}
            className="relative aspect-[9/16] bg-gray-900 rounded-xl border border-gray-800 overflow-hidden group cursor-pointer snap-center shrink-0 w-[80vw] md:w-auto"
        >
            <video
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                preload="metadata"
            >
                <source src={item.src} type="video/mp4" />
            </video>

            {/* Play Overlay - Visible when NOT playing */}
            {!isPlaying && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-2 animate-pulse">
                        <Play className="text-white ml-1 fill-white" size={20} />
                    </div>
                    <span className="text-white font-medium text-xs tracking-wider uppercase">Click to Play</span>
                </div>
            )}

            {/* Maximize Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onExpand();
                }}
                className="maximize-btn absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white/80 hover:text-white transition-all opacity-0 group-hover:opacity-100 z-10"
                title="Fullscreen View"
            >
                <Maximize2 size={18} />
            </button>


            {/* Footer Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
                <p className="text-white text-xs font-bold line-clamp-2">{item.title}</p>
            </div>
        </div>
    );
}

function VideoModal({ isOpen, video, onClose, onNext, onPrev }: {
    isOpen: boolean;
    video: typeof videoItems[0];
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}) {
    // Handle keyboard navigation
    if (typeof window !== 'undefined') {
        window.onkeydown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
        };
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={onClose}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all z-50"
            >
                <X size={32} />
            </button>

            {/* Navigation Buttons (Desktop) */}
            <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white hidden md:block p-4"
            >
                <ChevronLeft size={48} />
            </button>

            <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white hidden md:block p-4"
            >
                <ChevronRight size={48} />
            </button>

            {/* Main Content */}
            <div
                className="relative w-full max-w-sm md:max-w-md aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                onClick={(e) => e.stopPropagation()}
            >
                <video
                    key={video.id} // Key to force re-render/reset when video changes
                    src={video.src}
                    className="w-full h-full object-cover"
                    autoPlay
                    controls
                    playsInline
                />

                {/* Info Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none">
                    <h3 className="text-white text-lg font-bold mb-1">{video.title}</h3>
                    <p className="text-gray-300 text-sm">Videobooth Selection</p>
                </div>
            </div>

            {/* Mobile Navigation Hints */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 md:hidden text-white/50">
                <ChevronLeft size={32} onClick={(e) => { e.stopPropagation(); onPrev(); }} />
                <ChevronRight size={32} onClick={(e) => { e.stopPropagation(); onNext(); }} />
            </div>

        </motion.div>
    );
}
