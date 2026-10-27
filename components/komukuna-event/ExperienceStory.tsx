"use client";

import { useState } from 'react';
import Image from '@/components/OptimizedImage';
import AccessibleModal from './AccessibleModal';
import DeferredImage from './DeferredImage';

const steps = [
    { title: 'Crowd Magnet', description: 'Bikin acara pecah & tamu antre panjang!', src: '/komukuna-event/process/exp-crowd.JPG' },
    { title: 'Template Eksklusif', description: 'Desain frame custom yang bikin fotomu aesthetic.', src: '/komukuna-event/process/exp-template.jpg' },
    { title: 'Auto-Glowing', description: 'Lighting studio pro & kamera DSLR. Hasilnya tajam & flawless.', src: '/komukuna-event/process/exp-quality.jpg' },
    { title: 'Cetak 15 Detik', description: 'Foto & cetak secepat update status.', src: '/komukuna-event/process/exp-print.jpg' },
    { title: 'Antrean Panjang', description: 'Bukti acara sukses: tamu rela antre demi souvenir ini.', src: '/komukuna-event/process/exp-queue.jpg' },
];

export default function ExperienceStory() {
    const [index, setIndex] = useState(0);
    const [preview, setPreview] = useState(false);
    const item = steps[index];
    return <div className="w-full max-w-sm mx-auto">
        <button type="button" onClick={() => setPreview(true)} className="relative block w-full aspect-[3/4] rounded-[2.5rem] overflow-hidden border-[6px] border-gray-900 bg-gray-900 text-left">
            <DeferredImage key={item.src} src={item.src} alt="" fill sizes="(max-width: 639px) 90vw, 384px" quality={70} className="object-cover" />
            <span className="absolute inset-x-0 bottom-0 bg-black/90 p-6 text-white">
                <span className="block text-xl font-bold">{item.title}</span>
                <span className="block text-sm mt-2">{item.description}</span>
            </span>
            <span className="sr-only">Perbesar foto</span>
        </button>
        <div className="flex justify-center flex-wrap gap-2 mt-4" role="group" aria-label="Pilih foto pengalaman">
            {steps.map((step, position) => <button key={step.src} type="button" onClick={() => setIndex(position)} aria-label={`${position + 1}. Lihat foto ${step.title}`} aria-pressed={index === position}
                className={`min-h-11 min-w-11 rounded-full border border-white/30 font-bold ${position === index ? 'bg-komukuna-purple text-white' : 'text-gray-200'}`}>{position + 1}</button>)}
        </div>
        <AccessibleModal isOpen={preview} onClose={() => setPreview(false)} title={item.title} size="wide">
            <div className="relative h-[65dvh]"><Image src={item.src} alt={item.title} fill sizes="90vw" className="object-contain" /></div>
        </AccessibleModal>
    </div>;
}
