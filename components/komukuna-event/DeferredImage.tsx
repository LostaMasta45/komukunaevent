"use client";

import { useEffect, useRef, useState } from 'react';
import Image, { type ImageProps } from '@/components/OptimizedImage';

// Native lazy loading may fetch images several screens away. Keep those requests
// out of the critical path while retaining an image for visitors without JS.
export default function DeferredImage(props: ImageProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
        }, { rootMargin: '200px' });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);
    return <span ref={ref} className={props.fill ? 'absolute inset-0' : 'relative block w-full h-full'}>
        {visible ? <Image {...props} alt={props.alt} /> : <>
            <span role={props.alt ? 'img' : undefined} aria-label={props.alt || undefined} className="absolute inset-0" />
            <noscript><Image {...props} alt={props.alt} /></noscript>
        </>}
    </span>;
}
