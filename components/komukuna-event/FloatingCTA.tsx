"use client";

import { lazy, Suspense, useState } from 'react';
import { MessageCircle } from 'lucide-react';

const LeadCaptureModal = lazy(() => import('./LeadCaptureModal'));

export default function FloatingCTA() {
    const [open, setOpen] = useState(false);
    return <>
        <div className="fixed z-50 bottom-5 inset-x-4 md:inset-x-auto md:right-8 md:bottom-8">
            <button type="button" aria-haspopup="dialog" onClick={() => setOpen(true)} className="min-h-12 w-full rounded-full bg-[#25D366] px-6 py-3.5 text-gray-950 shadow-lg font-bold flex items-center justify-center gap-3">
                <MessageCircle size={24} aria-hidden="true" /><span>Tanya Jadwal & Pricelist</span>
            </button>
        </div>
        {open && <Suspense fallback={<p role="status" className="fixed bottom-24 inset-x-4 z-50 text-center text-white bg-komukuna-dark rounded-xl p-3">Memuat formulir…</p>}><LeadCaptureModal isOpen onClose={() => setOpen(false)} /></Suspense>}
    </>;
}
