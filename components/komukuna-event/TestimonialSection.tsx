"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Play, Volume2, VolumeX, Star, Quote } from 'lucide-react';

// Sample data using existing videos as placeholders
// Nanti arahkan ke folder public/komukuna-event/testimonials/ yang baru dibuat
const testimonials = [
    {
        id: 1,
        name: 'Sarah & Budi',
        event: 'Wedding Reception',
        quote: 'Momen sempurna bersama Komukuna!',
        videoSrc: '/komukuna-event/process/video-bts11.mp4', // Placeholder
        rating: 5,
    },
    {
        id: 2,
        name: 'PT. Inovasi Cipta',
        event: 'Corporate Gathering',
        quote: 'Komukuna keren banget, asik parah!',
        videoSrc: '/komukuna-event/process/video-bts1.mp4', // Placeholder
        rating: 5,
    },
    {
        id: 3,
        name: 'Dina',
        event: 'Sweet Seventeen',
        quote: 'Hasil cetaknya kilat, kualitas raw mantap!',
        videoSrc: '/komukuna-event/process/exp-crowd.mp4', // Placeholder
        rating: 5,
    },
    {
        id: 4,
        name: 'Event Organizer SBY',
        event: 'Music Festival',
        quote: 'Selalu puas pakai jasa Komukuna!',
        videoSrc: '/komukuna-event/process/video-bts2.mp4', // Placeholder
        rating: 5,
    }
];

export default function TestimonialSection() {
    const [activeVideo, setActiveVideo] = useState<number | null>(null);

    return (
        <section className="relative py-24 bg-black overflow-hidden" id="testimonials">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-komukuna-pink/10 blur-[120px]" />
                <div className="absolute bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-komukuna-yellow/10 blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                    >
                        Kata Mereka Tentang <span className="text-transparent bg-clip-text bg-gradient-to-r from-komukuna-pink to-komukuna-yellow">KOMUKUNA</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-lg max-w-2xl mx-auto"
                    >
                        Ratusan senyum telah kami abadikan. Dengarkan langsung pengalaman mereka.
                    </motion.p>
                </div>

                {/* Reels Style Horizontal Scroll */}
                <div className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard 
                            key={testimonial.id} 
                            testimonial={testimonial} 
                            index={index}
                            isActive={activeVideo === testimonial.id}
                            onPlay={() => setActiveVideo(testimonial.id)}
                            onStop={() => setActiveVideo(null)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function TestimonialCard({ testimonial, index, isActive, onPlay, onStop }: any) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMuted, setIsMuted] = useState(true);
    const isInView = useInView(containerRef, { once: true, margin: "200px" });

    useEffect(() => {
        if (isActive && videoRef.current) {
            videoRef.current.play().catch(e => console.log("Play interrupted:", e));
            setIsMuted(false);
            videoRef.current.muted = false;
        } else if (videoRef.current) {
            // When not active, but in view, we want it to autoplay muted
            if (isInView) {
                videoRef.current.muted = true;
                videoRef.current.play().catch(e => console.log("Auto-play preview interrupted:", e));
            } else {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
            setIsMuted(true);
        }
    }, [isActive, isInView]);

    const handleToggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    return (
        <motion.div 
            ref={containerRef}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`relative flex-shrink-0 w-[280px] h-[500px] md:w-[320px] md:h-[568px] rounded-3xl overflow-hidden snap-center cursor-pointer group border border-gray-800 transition-all duration-300 ${isActive ? 'ring-2 ring-komukuna-pink shadow-[0_0_30px_rgba(255,20,147,0.3)]' : 'hover:border-gray-600'}`}
            onClick={isActive ? onStop : onPlay}
        >
            {/* Video Background (Only loads when approaching viewport to save PageSpeed) */}
            {isInView && (
                <video
                    ref={videoRef}
                    src={testimonial.videoSrc}
                    className="absolute inset-0 w-full h-full object-cover scale-[1.02] group-hover:scale-105 transition-transform duration-700"
                    loop
                    muted
                    playsInline
                    preload="none"
                />
            )}

            {/* Gradient Overlay for Text Visibility */}
            <div className={`absolute inset-0 transition-opacity duration-300 ${isActive ? 'bg-gradient-to-t from-black/90 via-black/30 to-transparent' : 'bg-gradient-to-t from-black/90 via-black/40 to-black/20'}`} />

            {/* Play Button Overlay (when not active) */}
            <AnimatePresence>
                {!isActive && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center z-20"
                    >
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white transform group-hover:scale-110 transition-transform">
                            <Play size={24} className="ml-1" fill="currentColor" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mute/Unmute Toggle (when active) */}
            <AnimatePresence>
                {isActive && (
                    <motion.button 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={handleToggleMute}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white z-30 hover:bg-black/70 border border-white/20"
                    >
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Content (Bottom) */}
            <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col justify-end">
                <Quote className="text-komukuna-pink/40 w-10 h-10 mb-2 transform -translate-x-2" />
                
                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight mb-3">
                    &quot;{testimonial.quote}&quot;
                </h3>
                
                <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-komukuna-yellow" fill="currentColor" />
                    ))}
                </div>

                <div className="mt-2">
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.event}</p>
                </div>
            </div>
        </motion.div>
    );
}
