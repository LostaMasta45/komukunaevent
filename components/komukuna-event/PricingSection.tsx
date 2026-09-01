"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, ShieldCheck, Camera, Aperture } from 'lucide-react';
import { Button } from './ui/Button';
import Link from 'next/link';

interface PricingTier {
    name: string;
    price: string;
    originalPrice?: string;
    savings?: string;
    description: string;
    unlimitedHeader?: string;
    features: string[];
    cta: string;
    isPopular: boolean;
    theme: string;
}

const photoboothTiers: PricingTier[] = [
    {
        name: 'SILVER',
        price: 'Rp 1.250.000',
        originalPrice: 'Rp 1.750.000',
        savings: 'Hemat Rp 500.000',
        description: 'Paket hemat untuk dokumentasi event yang seru dan berkesan.',
        unlimitedHeader: '♾️ UNLIMITED SESI FOTO',
        features: [
            'Durasi Sewa Selama 2 Jam',
            'Unlimited Sesi Foto',
            'Free 1x Cetak 4R atau Photostrip per Sesi',
            'Request Desain Frame Sesuai Event',
            'Premium Backdrop Glitter Gold atau Silver',
            'Fun Property',
            'Free All Soft File Foto'
        ],
        cta: 'Booking Silver Photobooth',
        isPopular: false,
        theme: 'silver',
    },
    {
        name: 'GOLD',
        price: 'Rp 1.750.000',
        originalPrice: 'Rp 2.250.000',
        savings: 'Hemat Rp 500.000',
        description: 'Paket favorit dengan durasi lebih lama dan pengalaman yang lebih lengkap.',
        unlimitedHeader: '♾️ UNLIMITED SESI FOTO',
        features: [
            'Durasi Sewa Selama 3 Jam',
            'Unlimited Sesi Foto',
            'Free 1x Cetak 4R atau Photostrip per Sesi',
            'Request Desain Frame Sesuai Event',
            'Premium Backdrop Glitter Gold atau Silver',
            'Special Property',
            '3 Kostum Karakter',
            'Free All Soft File Foto',
            'Request Background Full Custom'
        ],
        cta: 'Booking Gold Photobooth',
        isPopular: true,
        theme: 'gold',
    },
];

const videoboothTiers: PricingTier[] = [
    {
        name: 'SILVER 360',
        price: 'Rp 1.250.000',
        originalPrice: undefined,
        savings: undefined,
        description: 'Paket videobooth praktis untuk membuat event lebih seru dan interaktif.',
        features: [
            'Durasi 2 Jam',
            'Lighting 4 Spot',
            'RGB Lighting 2 Spot',
            'QR Sharing System',
            'Template Ready',
            'Music Ready',
            'Fun Property',
            'Semua Video Dikirim Digital'
        ],
        cta: 'Booking Silver 360',
        isPopular: false,
        theme: 'silver',
    },
    {
        name: 'GOLD 360',
        price: 'Rp 1.500.000',
        originalPrice: undefined,
        savings: undefined,
        description: 'Paket videobooth premium dengan hasil lebih personal dan profesional.',
        features: [
            'Durasi 3 Jam',
            'Lighting 4 Spot',
            'RGB Lighting 2 Spot',
            'QR Sharing System',
            'Template Custom',
            'Music Custom',
            'Fun Property',
            'Semua Video Dikirim Digital'
        ],
        cta: 'Booking Gold 360',
        isPopular: true,
        theme: 'gold',
    },
];

export default function PricingSection() {
    const [activeTab, setActiveTab] = useState<'photobooth' | 'videobooth'>('photobooth');
    const [promoDate, setPromoDate] = useState('');

    useEffect(() => {
        // Set promo date to 3 days from now for urgency
        const date = new Date();
        date.setDate(date.getDate() + 3);
        setPromoDate(date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }));
    }, []);

    const currentTiers = activeTab === 'photobooth' ? photoboothTiers : videoboothTiers;

    return (
        <section id="pricing" className="py-24 bg-komukuna-dark relative overflow-hidden">

            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-komukuna-pink/10 to-komukuna-purple/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">

                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Pricelist Spesial</h2>
                    <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                        Paket Unlimited yang transparan dan bersahabat. Pilih layanan favoritmu.
                    </p>

                    {/* Toggle Switch */}
                    <div className="inline-flex bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
                        <button
                            onClick={() => setActiveTab('photobooth')}
                            className={`relative px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'photobooth' ? 'bg-komukuna-pink text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            <Camera size={16} /> Photobooth
                        </button>
                        <button
                            onClick={() => setActiveTab('videobooth')}
                            className={`relative px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'videobooth' ? 'bg-komukuna-purple text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            <Aperture size={16} /> Video Booth 360
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto min-h-[600px]">
                    <AnimatePresence mode="wait">
                        {currentTiers.map((tier, index) => (
                            <motion.div
                                key={`${activeTab}-${tier.name}`}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className={`relative rounded-[2rem] p-8 md:p-10 border flex flex-col transition-all duration-300 group
                    ${tier.isPopular
                                        ? 'bg-gradient-to-b from-white/10 to-white/5 border-komukuna-pink/50 shadow-[0_0_50px_rgba(232,92,144,0.3)] ring-1 ring-komukuna-pink/50 scale-105 z-10'
                                        : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.07]'
                                    }
                  `}
                            >
                                {tier.isPopular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-komukuna-pink to-komukuna-purple rounded-full text-white text-[10px] font-bold uppercase tracking-widest shadow-[0_4px_20px_rgba(232,92,144,0.5)] flex items-center gap-1.5 z-20 animate-pulse">
                                        <Star size={12} fill="currentColor" /> Best Seller
                                    </div>
                                )}

                                <div className="mb-8 text-center md:text-left">
                                    <h3 className={`text-xl font-bold mb-2 tracking-wide ${tier.isPopular ? 'text-komukuna-pink' : 'text-gray-300'}`}>{tier.name}</h3>

                                    {/* Unlimited Header Badge */}
                                    {tier.unlimitedHeader && (
                                        <div className="mb-3 py-1 px-3 rounded-full bg-komukuna-pink/10 border border-komukuna-pink/30 text-komukuna-pink text-xs font-semibold inline-flex items-center gap-1.5">
                                            <span>{tier.unlimitedHeader}</span>
                                        </div>
                                    )}

                                    {/* Updated Pricing Display */}
                                    <div className="flex flex-col items-center md:items-start mb-4 relative min-h-[80px]">
                                        {/* Original Price */}
                                        {tier.originalPrice ? (
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-500 text-lg font-medium line-through decoration-red-500/50 decoration-2">
                                                    {tier.originalPrice}
                                                </span>
                                                {/* Savings Badge */}
                                                {tier.savings && (
                                                    <span className="bg-red-500/10 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-500/20">
                                                        {tier.savings.toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="h-7"></div> // Placeholder to maintain alignment
                                        )}

                                        {/* Main Price */}
                                        <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-baseline gap-1">
                                            {tier.price}
                                        </div>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed">{tier.description}</p>
                                </div>

                                <div className="flex-1 mb-8">
                                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />
                                    <ul className="space-y-4">
                                        {tier.features.map((feature, i) => (
                                            <li key={i} className="flex items-start text-sm text-gray-300 group-hover:text-white transition-colors">
                                                <div className={`mt-0.5 mr-3 p-0.5 rounded-full shrink-0 ${tier.isPopular ? 'bg-komukuna-pink/20 text-komukuna-pink' : 'bg-gray-700 text-gray-400'}`}>
                                                    <Check size={12} strokeWidth={3} />
                                                </div>
                                                <span className="leading-snug">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Button
                                    variant={tier.isPopular ? 'gradient' : 'outline'}
                                    className="w-full h-14 text-base font-bold tracking-wide shadow-lg"
                                    asChild
                                >
                                    <Link
                                        href={`https://wa.me/6283122866975?text=Halo Komukuna, saya mau booking paket *${tier.name} ${activeTab === 'photobooth' ? 'Photobooth' : 'Video 360'}*.`}
                                        target="_blank"
                                    >
                                        {tier.cta}
                                    </Link>
                                </Button>

                                {tier.isPopular && (
                                    <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-komukuna-pink/80 font-medium opacity-80">
                                        <ShieldCheck size={12} /> Unlimited Session Guaranteed
                                    </div>
                                )}

                                {/* FOMO & Scarcity Trigger */}
                                <div className="mt-6 pt-4 border-t border-white/5 text-center">
                                    <p className="text-red-400 text-xs font-bold mb-1 animate-pulse">
                                        🔥 Promo berakhir {promoDate}
                                    </p>
                                    <p className="text-gray-400 text-[10px]">
                                        Booking sekarang, <span className="text-white font-medium">kunci harga hemat ini</span> untuk event kapanpun!
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Sistem Foto & Ketentuan Unlimited Section */}
                {activeTab === 'photobooth' && (
                    <div className="mt-16 max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
                        {/* Sistem Foto */}
                        <div className="bg-gradient-to-b from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 md:p-8 relative overflow-hidden">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2.5 rounded-xl bg-komukuna-pink/20 text-komukuna-pink">
                                    <Camera size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">📸 Sistem Foto</h3>
                                    <p className="text-xs text-gray-400">Foto Berkali-kali Selama Durasi Sewa</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                                Tamu dapat melakukan sesi foto berkali-kali selama durasi photobooth masih berlangsung.
                            </p>
                            <div className="bg-black/30 border border-white/10 rounded-xl p-4 mb-3">
                                <p className="text-xs font-bold text-komukuna-pink uppercase tracking-wider mb-2">Setiap Sesi Mendapatkan:</p>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-xs md:text-sm text-white font-medium">
                                    <span className="bg-white/10 px-3 py-1 rounded-md border border-white/10">✓ 1x Cetak 4R</span>
                                    <span className="text-xs text-gray-400 font-normal">atau</span>
                                    <span className="bg-white/10 px-3 py-1 rounded-md border border-white/10">✓ 1x Cetak Photostrip</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 italic">
                                *Jumlah jepretan mengikuti jumlah frame pada desain yang digunakan.
                            </p>
                        </div>

                        {/* Ketentuan Unlimited */}
                        <div className="bg-gradient-to-b from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2.5 rounded-xl bg-komukuna-purple/20 text-komukuna-purple">
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">📌 Ketentuan Unlimited</h3>
                                    <p className="text-xs text-gray-400">Sesi Foto Tanpa Batas</p>
                                </div>
                            </div>
                            <ul className="space-y-2.5 text-xs md:text-sm text-gray-300">
                                <li className="flex items-start gap-2.5">
                                    <Check size={14} className="mt-0.5 text-komukuna-pink shrink-0" />
                                    <span>Tidak ada batasan jumlah sesi foto per orang.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <Check size={14} className="mt-0.5 text-komukuna-pink shrink-0" />
                                    <span>Tamu dapat kembali berfoto berkali-kali.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <Check size={14} className="mt-0.5 text-komukuna-pink shrink-0" />
                                    <span>Berlaku selama durasi sewa masih berlangsung.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <Check size={14} className="mt-0.5 text-komukuna-pink shrink-0" />
                                    <span>Jika tidak ada antrean, tamu dapat langsung foto kembali.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <Check size={14} className="mt-0.5 text-komukuna-pink shrink-0" />
                                    <span>Jika ada antrean, sesi dilakukan secara bergantian.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* Add-ons Section */}
                <div className="mt-20 max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <h3 className="text-2xl font-bold text-white mb-3">🖼️ Add-On Favorit Customer</h3>
                        <p className="text-gray-400 text-sm">Tambahkan sentuhan premium untuk membuat hasil foto lebih berkesan.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Add-on 1 */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors flex flex-col justify-between">
                            <div>
                                <div className="text-3xl mb-4">🖼️</div>
                                <h4 className="text-white font-bold mb-1">Premium Photo Frame</h4>
                                <div className="text-komukuna-pink font-bold text-lg mb-3">+ Rp 200.000</div>
                                <p className="text-gray-400 text-xs mb-4">Jadikan hasil foto lebih eksklusif dan siap menjadi kenang-kenangan spesial.</p>
                                <ul className="space-y-2">
                                    <li className="text-xs text-gray-300 flex items-start gap-2"><Check size={12} className="mt-0.5 text-komukuna-pink shrink-0" /> Tampilan lebih premium</li>
                                    <li className="text-xs text-gray-300 flex items-start gap-2"><Check size={12} className="mt-0.5 text-komukuna-pink shrink-0" /> Cocok sebagai pajangan / souvenir</li>
                                    <li className="text-xs text-gray-300 flex items-start gap-2"><Check size={12} className="mt-0.5 text-komukuna-pink shrink-0" /> Ideal untuk Wedding, Anniversary & Event Spesial</li>
                                </ul>
                            </div>
                        </div>
                        {/* Add-on 2 */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors flex flex-col justify-between">
                            <div>
                                <div className="text-3xl mb-4">⏰</div>
                                <h4 className="text-white font-bold mb-1">Tambah Durasi</h4>
                                <div className="text-white font-bold text-lg mb-3">By Request</div>
                                <p className="text-xs text-gray-400">Cocok untuk event dengan jumlah tamu lebih banyak.</p>
                            </div>
                        </div>
                        {/* Add-on 3 */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors flex flex-col justify-between">
                            <div>
                                <div className="text-3xl mb-4">🎨</div>
                                <h4 className="text-white font-bold mb-1">Custom Request</h4>
                                <div className="text-white font-bold text-lg mb-3">By Request</div>
                                <p className="text-xs text-gray-400">Untuk kebutuhan branding perusahaan atau konsep acara khusus.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex justify-center">
                    <p className="text-gray-500 text-sm bg-white/5 inline-flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-sm border border-white/5 shadow-lg">
                        💡 <span className="text-gray-300 font-medium">Butuh Paket Custom?</span> Hubungi kami di 0831-2286-6975
                    </p>
                </div>

            </div>
        </section>
    );
}
