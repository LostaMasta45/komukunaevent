"use client";

import { useState, type ComponentProps, type ComponentType } from 'react';
import { ChevronRight, Play } from 'lucide-react';
import { Button } from './ui/Button';
import type Archive from './PortfolioArchiveModal';
import { bookingHref } from './navigation';

type ArchiveProps = ComponentProps<typeof Archive>;

export default function HeroButtons() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [failed, setFailed] = useState(false);
    const [archive, setArchive] = useState<{ Component: ComponentType<ArchiveProps>; data: Pick<ArchiveProps, 'photoItems' | 'videoItems'> } | null>(null);
    async function openArchive() {
        if (archive) { setOpen(true); return; }
        setLoading(true); setFailed(false);
        try {
            const [module, data] = await Promise.all([import('./PortfolioArchiveModal'), import('./portfolio-data')]);
            setArchive({ Component: module.default, data: { photoItems: data.portfolioItems, videoItems: data.videoItems } });
            setOpen(true);
        } catch { setFailed(true); }
        finally { setLoading(false); }
    }
    return <>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button variant="gradient" size="lg" asChild><a href={bookingHref}>Cek Ketersediaan <ChevronRight className="ml-2" size={18} aria-hidden="true" /></a></Button>
            <Button variant="ghost" size="lg" className="border border-white/40" aria-haspopup="dialog" disabled={loading} onClick={openArchive}>
                <Play size={18} className="mr-2" aria-hidden="true" />{loading ? 'Memuat portofolio…' : 'Lihat Portfolio'}
            </Button>
        </div>
        {failed && <p role="alert" className="text-white">Portofolio belum dapat dibuka. <button type="button" onClick={openArchive} className="underline min-h-11">Coba lagi</button></p>}
        {archive && open && <archive.Component isOpen onClose={() => setOpen(false)} initialTab="photobooth" {...archive.data} />}
    </>;
}
