"use client";

import AccessibleModal from './AccessibleModal';
import PortfolioCollection from './PortfolioCollection';
import type { PhotoboothItemProps } from './BentoGridSpotlight';
import type { VideoItem } from './portfolio-types';

export default function PortfolioArchiveModal({ isOpen, onClose, initialTab, photoItems, videoItems }: {
    isOpen: boolean; onClose: () => void; initialTab: 'photobooth' | 'videobooth'; photoItems: PhotoboothItemProps[]; videoItems: VideoItem[];
}) {
    return <AccessibleModal isOpen={isOpen} onClose={onClose} title="Arsip portofolio" size="archive">
        {isOpen && <PortfolioCollection photoItems={photoItems} videoItems={videoItems} initialTab={initialTab} headingLevel={3} />}
    </AccessibleModal>;
}
