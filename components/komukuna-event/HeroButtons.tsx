"use client";

import { Button } from './ui/Button';
import Link from 'next/link';
import { ChevronRight, Play } from 'lucide-react';
import { useState } from 'react';
import PortfolioArchiveModal from './PortfolioArchiveModal';
import { portfolioItems, videoItems } from './portfolio-data';

export default function HeroButtons() {
    const [isDemoOpen, setIsDemoOpen] = useState(false);

    return (
        <>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4 animate-fade-in-up delay-1500">
                <div className="relative group w-full sm:w-auto">
                    <div className="absolute -inset-1 bg-gradient-to-r from-komukuna-pink to-komukuna-purple rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                    <Button
                        variant="gradient"
                        size="lg"
                        className="relative w-full sm:w-auto h-12 px-6 text-base overflow-hidden group-hover:scale-[1.02] transition-transform duration-300"
                        asChild
                    >
                        <Link href="#pricing">
                            <span className="relative z-10 flex items-center justify-center">
                                Cek Ketersediaan <ChevronRight className="ml-2 w-4 h-4" />
                            </span>
                            {/* Shine Effect */}
                            <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] animate-[shine_3s_infinite]" />
                        </Link>
                    </Button>
                </div>


                <Button
                    variant="ghost"
                    size="lg"
                    className="h-12 px-6 text-base border border-white/20 hover:bg-white/10 hover:text-white rounded-full flex items-center gap-2 w-full sm:w-auto justify-center group"
                    onClick={() => setIsDemoOpen(true)}
                >
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center transition-transform group-hover:scale-110">
                        <Play size={10} fill="black" className="ml-0.5 text-black" />
                    </div>
                    <span className="font-medium tracking-wide">Lihat Portfolio</span>
                </Button>
            </div>

            {/* Portfolio Modal */}
            <PortfolioArchiveModal
                isOpen={isDemoOpen}
                initialTab="photobooth"
                photoItems={portfolioItems}
                videoItems={videoItems}
                onClose={() => setIsDemoOpen(false)}
            />
        </>
    );
}
