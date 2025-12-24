import Link from 'next/link';
import { ChevronRight, Play } from 'lucide-react';
import HeroRotatingText from './HeroRotatingText';
import HeroButtons from './HeroButtons';

export default function HeroSection() {
    return (
        <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">

            {/* Background - Animated Gradient */}
            {/* Background - Animated Gradient with Image & Pattern */}
            <div className="absolute inset-0 bg-komukuna-dark overflow-hidden">


                {/* 2. Gradient Overlay (Main Color) */}
                <div className="absolute inset-0 bg-gradient-to-br from-komukuna-purple/30 via-komukuna-dark/90 to-komukuna-pink/20" />

                {/* 3. Animated Blurs */}
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-komukuna-purple/30 blur-[120px] animate-pulse-delayed" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-komukuna-pink/20 blur-[120px] animate-pulse-delayed" style={{ animationDelay: '2s' }} />

                {/* 4. Pattern Overlay (Grid) */}
                <div
                    className="absolute inset-0 opacity-[0.15] mix-blend-screen pointer-events-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                        `
                    }}
                />

                {/* 5. Vignette for focus */}
                <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/80" />
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
