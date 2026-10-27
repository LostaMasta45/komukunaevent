"use client";

import { useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';

export default function DeferredFeature({ feature, children }: { feature: 'gallery' | 'pricing'; children: ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const [Component, setComponent] = useState<ComponentType | null>(null);
    const [failed, setFailed] = useState(false);
    async function load() {
        setFailed(false);
        try {
            const featureModule = feature === 'gallery' ? await import('./GallerySection') : await import('./PricingSection');
            setComponent(() => featureModule.default);
        } catch { setFailed(true); }
    }
    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { observer.disconnect(); void load(); }
        }, { rootMargin: '1000px' });
        observer.observe(ref.current);
        return () => observer.disconnect();
        // The feature is fixed for this boundary; loading never hides its server preview.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [feature]);
    return <div ref={ref} className="event-feature" data-feature={feature} data-ready={!!Component}>
        {Component ? <Component /> : children}
        {failed && <p role="alert" className="px-4 py-5 text-center text-white">Pilihan interaktif belum dapat dimuat. <button type="button" onClick={load} className="min-h-11 underline">Coba lagi</button></p>}
    </div>;
}
