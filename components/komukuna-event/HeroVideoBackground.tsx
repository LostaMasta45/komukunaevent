"use client";

import { lazy, Suspense, useState } from 'react';
import { Play } from 'lucide-react';
import { cloudinaryProcessVideos } from '@/lib/cloudinary-videos';

const VideoPlayerModal = lazy(() => import('./VideoPlayerModal'));

export default function HeroVideoBackground() {
    const [open, setOpen] = useState(false);
    return <>
        <button type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" className="min-h-11 inline-flex items-center justify-center gap-2 rounded-full border border-white/50 px-5 py-3 text-white bg-black/60">
            <Play size={18} aria-hidden="true" />Putar video pengalaman Komukuna
        </button>
        {open && <Suspense fallback={<p role="status" className="text-white">Memuat pemutar video…</p>}><VideoPlayerModal isOpen videoSrc={cloudinaryProcessVideos['video-bts1']} videoTitle="Pengalaman Komukuna" onClose={() => setOpen(false)} /></Suspense>}
    </>;
}
