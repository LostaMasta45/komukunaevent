"use client";

import { useState } from 'react';
import PreloaderDemo from '@/components/komukuna-event/PreloaderDemo';
import { Button } from '@/components/ui/button'; // Assuming shadcn/ui button exists, simple button otherwise
import Link from 'next/link';

export default function TestPreloaderPage() {
    const [variant, setVariant] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>(1);
    const [key, setKey] = useState(0); // To force re-render/replay

    const handleSwitch = (v: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) => {
        setVariant(v);
        setKey(prev => prev + 1);
    };

    const handleReplay = () => {
        setKey(prev => prev + 1);
    };

    return (
        <div className="min-h-screen bg-neutral-900 text-white p-8">
            <PreloaderDemo key={key} variant={variant} />

            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[10000] bg-black/80 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-2xl flex flex-col items-center gap-4">
                <p className="text-sm font-medium text-gray-400">Select Loading Screen Variant</p>
                <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl">
                    <button
                        onClick={() => handleSwitch(1)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${variant === 1 ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20'}`}
                    >
                        1. The Snap
                    </button>
                    <button
                        onClick={() => handleSwitch(2)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${variant === 2 ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20'}`}
                    >
                        2. Film Leader
                    </button>
                    <button
                        onClick={() => handleSwitch(3)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${variant === 3 ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20'}`}
                    >
                        3. Lens Focus
                    </button>
                    <button
                        onClick={() => handleSwitch(4)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${variant === 4 ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20'}`}
                    >
                        4. Spotlight
                    </button>
                    <button
                        onClick={() => handleSwitch(5)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${variant === 5 ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20'}`}
                    >
                        5. Aperture
                    </button>
                    <button
                        onClick={() => handleSwitch(6)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${variant === 6 ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20'}`}
                    >
                        6. Focus Peak
                    </button>
                    <button
                        onClick={() => handleSwitch(7)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${variant === 7 ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20'}`}
                    >
                        7. Strobe Flash
                    </button>
                    <button
                        onClick={() => handleSwitch(8)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${variant === 8 ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20'}`}
                    >
                        8. REC Mode
                    </button>
                </div>
                <div className="flex gap-4 w-full">
                    <button
                        onClick={handleReplay}
                        className="flex-1 bg-komukuna-pink hover:bg-pink-600 px-4 py-2 rounded-lg text-sm font-bold"
                    >
                        Replay Animation
                    </button>
                    <Link href="/komukunaevent" className="text-xs text-gray-500 hover:text-white mt-2">
                        Back to Home
                    </Link>
                </div>
            </div>

            <div className="flex items-center justify-center h-screen">
                <h1 className="text-4xl text-white/10 font-black">CONTENT WOULD APPEAR HERE</h1>
            </div>
        </div>
    );
}
