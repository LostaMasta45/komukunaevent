"use client";

import { lazy, Suspense, useId, useState, type KeyboardEvent } from 'react';
import BentoGridSpotlight, { type PhotoboothItemProps } from './BentoGridSpotlight';
import VideoPreviewCard from './VideoPreviewCard';
import type { VideoItem } from './portfolio-types';

const VideoPlayerModal = lazy(() => import('./VideoPlayerModal'));
type Tab = 'photobooth' | 'videobooth';

export default function PortfolioCollection({ photoItems, videoItems, initialTab = 'photobooth', headingLevel = 2, priorityMedia = false }: {
    photoItems: PhotoboothItemProps[]; videoItems: VideoItem[]; initialTab?: Tab; headingLevel?: 2 | 3 | 4; priorityMedia?: boolean;
}) {
    const [tab, setTab] = useState<Tab>(initialTab);
    const [photoCount, setPhotoCount] = useState(3);
    const [videoCount, setVideoCount] = useState(8);
    const [selectedVideo, setSelectedVideo] = useState<{ src: string; title?: string } | null>(null);
    const id = useId();
    const tabs: Tab[] = ['photobooth', 'videobooth'];
    function moveTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : (index + 1) % 2;
        setTab(tabs[next]);
        document.getElementById(`${id}-${tabs[next]}`)?.focus();
    }
    return <>
        <div role="tablist" aria-label="Jenis portofolio" className="flex justify-center gap-2 mb-8">
            {tabs.map((value, index) => <button key={value} id={`${id}-${value}`} type="button" role="tab"
                aria-selected={tab === value} aria-controls={`${id}-${value}-panel`} tabIndex={tab === value ? 0 : -1}
                onKeyDown={event => moveTab(event, index)} onClick={() => setTab(value)}
                className={`min-h-11 rounded-full px-5 py-3 text-sm font-bold ${tab === value ? 'bg-komukuna-purple text-white' : 'bg-white/5 text-gray-200'}`}>
                {value === 'photobooth' ? 'Photobooth' : 'Videobooth'}
            </button>)}
        </div>
        {tabs.map(value => <div key={value} id={`${id}-${value}-panel`} role="tabpanel" aria-labelledby={`${id}-${value}`} hidden={tab !== value} tabIndex={0}>
            {tab === value && (value === 'photobooth' ? <>
                <div className="max-w-6xl mx-auto">
                    {photoItems.slice(0, photoCount).map((item, index) => <BentoGridSpotlight key={item.id} item={item} headingLevel={headingLevel}
                        priorityMedia={priorityMedia && index === 0} onMaximizeVideo={(src, title) => setSelectedVideo({ src, title })} />)}
                </div>
                {photoCount < photoItems.length && <button type="button" className="event-load-more" onClick={() => setPhotoCount(count => count + 3)}>Muat lebih banyak album ({Math.min(photoCount, photoItems.length)}/{photoItems.length})</button>}
                {photoItems.length === 0 && <p className="text-center text-gray-300">Belum ada album photobooth.</p>}
            </> : <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {videoItems.slice(0, videoCount).map(item => <VideoPreviewCard key={item.id} item={item} onMaximize={() => setSelectedVideo({ src: item.src, title: item.title })} />)}
                </div>
                {videoCount < videoItems.length && <button type="button" className="event-load-more" onClick={() => setVideoCount(count => count + 8)}>Muat lebih banyak video ({Math.min(videoCount, videoItems.length)}/{videoItems.length})</button>}
                {videoItems.length === 0 && <p className="text-center text-gray-300">Belum ada video.</p>}
            </>)}
        </div>)}
        {selectedVideo && <Suspense fallback={<p role="status" className="text-center text-white">Memuat pemutar video…</p>}><VideoPlayerModal isOpen videoSrc={selectedVideo.src} videoTitle={selectedVideo.title} onClose={() => setSelectedVideo(null)} /></Suspense>}
    </>;
}
