"use client";

import AccessibleModal from './AccessibleModal';
import OnDemandVideo from './OnDemandVideo';
import { getVideoThumbnail } from '@/lib/cloudinary-videos';

export default function VideoPlayerModal({ isOpen, videoSrc, videoTitle = 'Pemutar video', onClose }: {
    isOpen: boolean; videoSrc: string; videoTitle?: string; onClose: () => void;
}) {
    return <AccessibleModal isOpen={isOpen} onClose={onClose} title={videoTitle}>
        {isOpen && <div className="h-[65dvh] min-h-40">
            <OnDemandVideo key={videoSrc} src={videoSrc} title={videoTitle} poster={getVideoThumbnail(videoSrc)} fullscreen sizes="440px" />
        </div>}
    </AccessibleModal>;
}
