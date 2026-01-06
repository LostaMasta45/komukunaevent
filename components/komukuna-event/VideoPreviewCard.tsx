"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Maximize2 } from 'lucide-react';
import { getVideoThumbnail, getVideoThumbnailBlur } from '@/lib/cloudinary-videos';

interface VideoPreviewCardProps {
    item: {
        id: number | string;
        title: string;
        src: string;
    };
    onMaximize: () => void;
}

export default function VideoPreviewCard({ item, onMaximize }: VideoPreviewCardProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Get optimized thumbnail URLs
    const blurUrl = getVideoThumbnailBlur(item.src);
    const thumbnailUrl = getVideoThumbnail(item.src);

    const togglePlay = () => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsPlaying(true);
                }).catch(error => {
                    console.error("Play interrupted:", error);
                    setIsPlaying(false);
                });
            }
        }
    };

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-gray-900 border border-white/10 cursor-pointer shadow-lg"
            onClick={togglePlay}
        >
            {/* Blur placeholder - shows instantly */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
                style={{
                    backgroundImage: `url(${blurUrl})`,
                    filter: 'blur(10px)',
                    transform: 'scale(1.1)',
                    opacity: isLoaded ? 0 : 1
                }}
            />

            {/* Main thumbnail image */}
            <img
                src={thumbnailUrl}
                alt={item.title}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-80 group-hover:opacity-100' : 'opacity-0'}`}
            />

            {/* Video element - hidden until play */}
            <video
                ref={videoRef}
                src={item.src}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
                muted
                playsInline
                loop
                preload="none"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />

            {/* Play Button - Centered */}
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform">
                    <Play size={20} fill="white" className="text-white ml-1" />
                </div>
            </div>

            {/* Maximize Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onMaximize();
                }}
                className="absolute top-2 right-2 p-2 bg-black/40 backdrop-blur-md rounded-full text-white/70 hover:text-white transition-opacity md:opacity-0 md:group-hover:opacity-100 z-10"
                title="Fullscreen"
            >
                <Maximize2 size={16} />
            </button>

            {/* Content */}
            <div className={`absolute bottom-4 left-4 right-4 transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
                <p className="text-white text-xs md:text-sm font-bold line-clamp-2 leading-snug">{item.title}</p>
            </div>
        </motion.div>
    );
}
