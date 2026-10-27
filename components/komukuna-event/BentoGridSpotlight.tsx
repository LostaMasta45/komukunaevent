"use client";

import { useState } from 'react';
import Image, { getImageProps } from '@/components/OptimizedImage';
import { Maximize2 } from 'lucide-react';
import AccessibleModal from './AccessibleModal';
import OnDemandVideo from './OnDemandVideo';
import { plainTitle } from './portfolio-types';
import DeferredImage from './DeferredImage';

export interface PhotoboothItemProps {
    id: string | number;
    title: string;
    subtitle: string;
    badge?: string;
    videoSrc: string;
    templateImage: string;
    printImage: string;
    rawImage: string;
    btsImage: string;
    posterImage?: string;
    reversed?: boolean;
    isLandscape?: boolean;
}

export default function BentoGridSpotlight({ item, onMaximizeVideo, priorityMedia = false, headingLevel = 3 }: {
    item: PhotoboothItemProps;
    onMaximizeVideo?: (src: string, title?: string) => void;
    priorityMedia?: boolean;
    headingLevel?: 2 | 3 | 4;
}) {
    const [selectedImage, setSelectedImage] = useState<{ src: string; label: string } | null>(null);
    const title = plainTitle(item.title);
    const Heading = `h${headingLevel}` as 'h2' | 'h3' | 'h4';
    const imageSizes = '(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) 45vw, 350px';
    const printProps = priorityMedia ? getImageProps({ src: item.printImage, alt: '', fill: true, sizes: imageSizes, quality: 65 }).props : null;
    const photos = [
        { src: item.templateImage, label: 'Premium Template', detail: 'Custom Design' },
        { src: item.printImage, label: 'Cetak 15 Detik', detail: 'High Quality Print' },
        { src: item.rawImage, label: 'File Asli (Raw)', detail: 'Foto digital' },
        { src: item.btsImage, label: 'BTS', detail: 'Di balik layar' },
    ];
    return <section className="py-8 md:py-12 border-b border-white/5 last:border-0 relative" aria-label={`Album ${title}`}>
        {printProps && <link rel="preload" as="image" media="(min-width: 1024px)" imageSrcSet={printProps.srcSet} imageSizes={printProps.sizes} fetchPriority="high" />}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 min-w-0">
                <div className="relative rounded-[2rem] overflow-hidden aspect-[9/16] border border-white/10 shadow-xl">
                    <OnDemandVideo src={item.videoSrc} poster={item.posterImage || item.btsImage} title={title} priority={priorityMedia}
                        sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) 600px, 360px" />
                    {onMaximizeVideo && <button type="button" onClick={() => onMaximizeVideo(item.videoSrc, title)}
                        aria-label={`Tampilkan video ${title} layar penuh`} className="absolute top-3 right-3 event-close bg-black/80">
                        <Maximize2 size={20} aria-hidden="true" />
                    </button>}
                </div>
                <div className="p-5">
                    {item.badge && <p className="text-sm font-semibold text-pink-300 mb-2">{item.badge}</p>}
                    <Heading className="text-white text-2xl font-bold leading-tight">{title}</Heading>
                    <p className="text-gray-300 text-sm mt-2">{item.subtitle}</p>
                </div>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 min-w-0">
                {photos.map((photo, index) => <button type="button" key={photo.label} onClick={() => setSelectedImage(photo)}
                    className={`relative rounded-[2rem] overflow-hidden ${index < 2 && !item.isLandscape ? 'aspect-[2/3]' : 'aspect-[3/2]'} group border border-white/10 shadow-xl cursor-zoom-in text-left`}>
                    <DeferredImage src={photo.src} alt="" fill quality={65} sizes={imageSizes} className="object-cover" />
                    <span className="absolute bottom-4 left-4 right-4 rounded-2xl bg-black/85 px-4 py-3 text-white">
                        <span className="block text-sm font-bold">{photo.label}</span>
                        <span className="block text-xs text-gray-200">{photo.detail}</span>
                    </span>
                    <span className="sr-only">Perbesar foto {title}</span>
                </button>)}
            </div>
        </div>
        <AccessibleModal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)} title={selectedImage ? `${selectedImage.label} — ${title}` : 'Pratinjau foto'} size="wide">
            {selectedImage && <div className="relative h-[65dvh] min-h-40">
                <Image src={selectedImage.src} alt={`${selectedImage.label} — ${title}`} fill sizes="(max-width: 768px) 90vw, 1000px" className="object-contain" />
            </div>}
        </AccessibleModal>
    </section>;
}
