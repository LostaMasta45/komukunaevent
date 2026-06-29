import Link from 'next/link';
import { ChevronRight, Play } from 'lucide-react';
import HeroRotatingText from './HeroRotatingText';
import HeroButtons from './HeroButtons';

export default function HeroSection() {
    return (
        <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">

            {/* Cinematic Video Background */}
            <div className="absolute inset-0 overflow-hidden bg-komukuna-dark">
                <video
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="https://res.cloudinary.com/rezanurhamami/video/upload/so_0,w_1280,c_fill,f_auto,q_auto/komukuna/process/video-bts1.jpg"
                    preload="auto"
                >
                    {/* Menggunakan video dari CDN Cloudinary dengan optimasi on-the-fly (q_auto:eco) agar loading instan di HP */}
                    <source src="https://res.cloudinary.com/rezanurhamami/video/upload/f_auto,q_auto:eco,w_1280,c_limit/komukuna/process/video-bts1.mp4" type="video/mp4" />
                </video>

                {/* 2. Gradient Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-komukuna-dark/80 via-komukuna-dark/50 to-komukuna-dark" />
                <div className="absolute inset-0 bg-gradient-to-r from-komukuna-purple/30 to-komukuna-pink/20 mix-blend-multiply" />

                {/* 3. Pattern Overlay (Grid) */}
                <div
                    className="absolute inset-0 opacity-[0.1] mix-blend-screen pointer-events-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* 4. Vignette for focus */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-black/90" />
            </div>

            <div className="container relative z-10 px-4 text-center">
                <div className="space-y-8 max-w-5xl mx-auto">

                    {/* Tagline */}
                    <div className="flex justify-center animate-fast-fade">
                        <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-komukuna-pink opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-komukuna-pink"></span>
                            </span>
                            <span className="text-gray-300 text-xs md:text-sm font-medium tracking-wide uppercase">New Era of Event Experience</span>
                        </div>
                    </div>

                    {/* Mega Headline (Updated per Plan) */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white min-h-[3.3em] md:min-h-[2.2em]">
                        <span className="block">
                            Tamu Pulang Membawa
                        </span>

                        {/* Client Component for Rotating Text */}
                        <HeroRotatingText />
                    </h1>

                    {/* Subheader POINTER: LCP ELEMENT */}
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-fast-fade">
                        Bikin <span className="text-white font-semibold">Corporate Gathering, Wedding, atau Party</span> Anda pecah! Hadirkan pengalaman
                        <span className="text-white font-semibold"> Photobooth & Video 360°</span> yang seru, personal, dan langsung tayang di Instagram Story.
                    </p>

                    {/* Client Component for Interactive Buttons */}
                    <HeroButtons />

                </div>
            </div>

            {/* Static Content for Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 flex flex-col items-center gap-2 animate-bounce">
                <span className="text-xs md:text-sm font-medium tracking-widest text-white/50">Lihat Bukti Viralnya 👇</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent" />
            </div>
        </section>
    );
}
