"use client";

import Image from '@/components/OptimizedImage';
import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { getOptimizedVideoUrl } from '@/lib/cloudinary-videos';
import DeferredImage from './DeferredImage';

export default function OnDemandVideo({ src, poster, title, priority = false, fullscreen = false, sizes = '(max-width: 640px) 100vw, 400px' }: {
    src: string; poster: string; title: string; priority?: boolean; fullscreen?: boolean; sizes?: string;
}) {
    const ref = useRef<HTMLVideoElement>(null);
    const [requested, setRequested] = useState(fullscreen);
    const [ready, setReady] = useState(false);
    const [error, setError] = useState(false);
    const [attempt, setAttempt] = useState(0);
    const [posterFailed, setPosterFailed] = useState(false);

    useEffect(() => {
        const video = ref.current;
        if (!requested || !video) return;
        const stop = () => video.pause();
        const visibility = () => { if (document.hidden) stop(); };
        const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) stop(); });
        observer.observe(video);
        document.addEventListener('visibilitychange', visibility);
        void video.play().catch(reason => {
            if (reason.name !== 'AbortError' && reason.name !== 'NotAllowedError') setError(true);
        });
        return () => {
            observer.disconnect();
            document.removeEventListener('visibilitychange', visibility);
            stop();
            video.removeAttribute('src');
            video.load();
        };
    }, [requested, attempt]);

    const Poster = priority ? Image : DeferredImage;
    return <div className="relative w-full h-full bg-gray-900 overflow-hidden">
        {!ready && <Poster src={posterFailed ? '/komukuna-event/hero-bg.jpg' : poster} alt="" fill
            priority={priority} fetchPriority={priority ? 'high' : undefined} sizes={sizes} quality={65} className="object-cover"
            onError={() => setPosterFailed(true)} />}
        {requested && <video key={attempt} ref={ref} src={getOptimizedVideoUrl(src, fullscreen ? 1080 : 480)}
            aria-label={title} className={`absolute inset-0 w-full h-full ${fullscreen ? 'object-contain' : 'object-cover'} ${ready ? '' : 'opacity-0'}`}
            controls muted={!fullscreen} playsInline preload="none"
            onPlaying={() => { setReady(true); setError(false); }}
            onPlay={event => { document.querySelectorAll('video').forEach(video => { if (video !== event.currentTarget) video.pause(); }); }}
            onError={() => setError(true)} />}
        {!requested && <button type="button" onClick={() => setRequested(true)} aria-label={`Putar video ${title}`}
            className="absolute inset-0 flex items-center justify-center bg-black/25 text-white">
            <span className="flex items-center gap-2 rounded-full bg-black/80 px-5 py-3 font-semibold"><Play size={22} aria-hidden="true" />Putar video</span>
        </button>}
        {requested && !ready && !error && <p role="status" className="absolute inset-x-3 bottom-5 rounded-xl bg-black/90 p-3 text-center text-sm text-white">Memuat video…</p>}
        {error && <div role="alert" className="absolute inset-x-3 bottom-5 rounded-xl bg-black/95 p-4 text-center text-white">
            <p>Video belum dapat diputar.</p>
            <button type="button" className="mt-2 min-h-11 rounded-full bg-white px-5 font-semibold text-black" onClick={() => { setError(false); setReady(false); setAttempt(value => value + 1); }}>Coba lagi</button>
        </div>}
    </div>;
}
