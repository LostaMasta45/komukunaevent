import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Play } from 'lucide-react';
import HeroRotatingText from './HeroRotatingText';
import HeroButtons from './HeroButtons';
import HeroVideoBackground from './HeroVideoBackground';

export default function HeroSection() {
    return (
        <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">

            {/* Optimized Media Background */}
            <div className="absolute inset-0 overflow-hidden bg-komukuna-dark">
                {/* Instant LCP Image poster for mobile & initial paint */}
                <Image
                    src="/komukuna-event/hero-bg.jpg"
                    alt="Komukuna Photobooth Experience"
                    fill
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 768px) 100vw, 100vw"
                    quality={70}
                    className="object-cover opacity-60 pointer-events-none"
                />

                {/* Deferred Video Background */}
                <HeroVideoBackground />

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
                    <div className="flex justify-center">
                        <div className="px-5 py-2 rounded-full border border-komukuna-pink/30 bg-komukuna-pink/10 backdrop-blur-md flex items-center gap-2 shadow-[0_0_20px_rgba(232,92,144,0.2)]">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-komukuna-pink opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-komukuna-pink"></span>
                            </span>
                            <span className="text-white text-xs md:text-sm font-semibold tracking-wide">
                                ♾️ 100% Unlimited Cetak Tanpa Kuota • Termurah se-Jombang & Mojokerto
                            </span>
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
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
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
