"use client";

import { useEffect, useState } from 'react';

export default function HeroVideoBackground() {
    const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

    useEffect(() => {
        // Defer video loading until after initial page paint on desktop
        const isMobile = window.innerWidth < 768;
        if (!isMobile) {
            const timer = setTimeout(() => {
                setShouldLoadVideo(true);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    if (!shouldLoadVideo) return null;

    return (
        <video
            className="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-1000"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
        >
            <source src="https://res.cloudinary.com/rezanurhamami/video/upload/f_auto,q_auto:eco,w_1280,c_limit/komukuna/process/video-bts1.mp4" type="video/mp4" />
        </video>
    );
}
