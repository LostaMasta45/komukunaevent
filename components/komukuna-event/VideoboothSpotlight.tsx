

import OnDemandVideo from './OnDemandVideo';
import { Aperture, Check, QrCode, Zap, Smartphone, Music, Play } from 'lucide-react';
import { cloudinaryVideoboothVideos } from '@/lib/cloudinary-videos';

function LazyVideo() {
    return <div className="relative aspect-[9/16] rounded-[2rem] border-[6px] border-gray-900 bg-black shadow-xl overflow-hidden">
        <OnDemandVideo src={cloudinaryVideoboothVideos['majapahit-run']} poster="/komukuna-event/hero-bg.jpg" title="360 Videobooth Komukuna" sizes="(max-width: 639px) 300px, 400px" />
    </div>;
}

export default function VideoboothSpotlight() {
    return (
        <section className="py-24 bg-[#0F0F0F] overflow-hidden relative">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-komukuna-pink/10 rounded-full blur-[128px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-komukuna-purple/10 rounded-full blur-[128px]" />
            </div>

            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

                    {/* Visual Side (Mockup) */}
                    <div
                        className="flex-1 w-full max-w-[320px] lg:max-w-[400px] relative mx-auto lg:mx-0"
                    >
                        {/* Phone Frame with Lazy Video */}
                        <LazyVideo />

                        {/* Floating Badge */}
                        <div
                            className="absolute -bottom-6 -right-6 bg-white text-black px-6 py-3 rounded-2xl shadow-xl border-2 border-komukuna-pink z-30 transform rotate-6"
                        >
                            <p className="font-bold font-heading text-sm">🔥 Viral Ready</p>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div
                        className="flex-1 text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                            <Aperture size={16} className="text-komukuna-purple" />
                            <span className="text-sm font-bold text-gray-300">360 Videobooth</span>
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                            Video Slow-Mo. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-komukuna-pink to-komukuna-purple">
                                Musik Custom.
                            </span> <br />
                            Langsung Share.
                        </h2>

                        <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Tingkatkan level acara Anda dengan video slow-motion 360 derajat ala selebriti red carpet.
                            Hasil video bisa langsung diunduh tamu via QR Code tepat setelah mereka turun dari panggung.
                        </p>

                        <div className="space-y-4 max-w-lg mx-auto lg:mx-0">
                            {[
                                { icon: Zap, text: "Hasil Video High Resolution & Smooth Slow-Mo" },
                                { icon: Music, text: "Overlay Musik & Efek Visual Custom" },
                                { icon: QrCode, text: "Sharing Instan via QR Code & AirDrop" },
                                { icon: Smartphone, text: "Lighting RGB Ring Light Besar" }
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-komukuna-purple/50 transition-colors group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-komukuna-pink/20 to-komukuna-purple/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Check className="text-komukuna-pink w-5 h-5" />
                                    </div>
                                    <span className="text-gray-200 font-medium">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
