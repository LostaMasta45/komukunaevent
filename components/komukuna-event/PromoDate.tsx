"use client";

import { useEffect, useRef, useState } from 'react';

export default function PromoDate() {
    const ref = useRef<HTMLSpanElement>(null);
    const openedAt = useRef(Date.now());
    const [label, setLabel] = useState('…');
    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            const date = new Date(openedAt.current);
            date.setDate(date.getDate() + 3);
            setLabel(date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }));
            observer.disconnect();
        }, { rootMargin: '200px' });
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return <span ref={ref}>{label}</span>;
}
