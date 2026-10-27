"use client";

import { Maximize2 } from 'lucide-react';
import OnDemandVideo from './OnDemandVideo';
import { getVideoThumbnail } from '@/lib/cloudinary-videos';
import type { VideoItem } from './portfolio-types';

export default function VideoPreviewCard({ item, onMaximize }: { item: VideoItem; onMaximize: () => void }) {
    return <div className="min-w-0">
        <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-gray-900 border border-white/10 shadow-lg">
            <OnDemandVideo src={item.src} poster={getVideoThumbnail(item.src)} title={item.title}
                sizes="(max-width: 639px) 45vw, (max-width: 1023px) 30vw, 280px" />
            <button type="button" onClick={onMaximize} aria-label={`Tampilkan video ${item.title} layar penuh`} className="absolute top-2 right-2 event-close bg-black/80">
                <Maximize2 size={18} aria-hidden="true" />
            </button>
        </div>
        <p className="text-white text-sm font-semibold mt-3">{item.title}</p>
    </div>;
}
