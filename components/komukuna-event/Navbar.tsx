"use client";

import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import BrandLogo from '@/components/branding/BrandLogo';
import { Button } from './ui/Button';
import { eventNavigation, bookingHref } from './navigation';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const toggle = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        const scroll = () => setScrolled(window.scrollY > 50);
        scroll();
        window.addEventListener('scroll', scroll, { passive: true });
        const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); }), { rootMargin: '-20% 0px -60% 0px' });
        document.querySelectorAll('section[id]').forEach(section => observer.observe(section));
        const resize = () => { if (window.matchMedia('(min-width: 768px)').matches) setOpen(false); };
        window.addEventListener('resize', resize);
        return () => { observer.disconnect(); window.removeEventListener('scroll', scroll); window.removeEventListener('resize', resize); };
    }, []);
    return <nav aria-label="Navigasi utama" onKeyDown={event => { if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); } }}
        className={`fixed top-0 left-0 right-0 z-50 ${scrolled || open ? 'bg-komukuna-dark border-b border-white/10' : 'bg-transparent'} py-3`}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
            <a href="/komukunaevent" aria-label="Komukuna Studio, beranda" className="inline-flex rounded-xl"><BrandLogo surface="dark" className="!h-16 !w-24 md:!h-[72px] md:!w-28" sizes="(max-width: 768px) 96px, 112px" priority /></a>
            <div className="hidden md:flex items-center gap-8">
                {eventNavigation.map(link => <a key={link.id} href={link.href} aria-current={activeSection === link.id ? 'location' : undefined} className={`font-medium text-sm ${activeSection === link.id ? 'text-pink-300 underline underline-offset-8' : 'text-gray-200'}`}>{link.name}</a>)}
                <Button variant="gradient" asChild><a href={bookingHref}>Pesan Sekarang</a></Button>
            </div>
            <button ref={toggle} type="button" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls="event-mobile-navigation" aria-label={open ? 'Tutup Menu Navigasi' : 'Buka Menu Navigasi'} className="md:hidden min-h-11 min-w-11 flex items-center justify-center text-white">
                {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
        </div>
        <div id="event-mobile-navigation" hidden={!open} className="md:hidden bg-komukuna-dark border-t border-white/10">
            <div className="container mx-auto p-4 flex flex-col gap-2">
                {eventNavigation.map(link => <a key={link.id} href={link.href} onClick={() => setOpen(false)} className="min-h-11 py-3 text-gray-100 font-medium">{link.name}</a>)}
                <Button variant="gradient" asChild><a href={bookingHref} onClick={() => setOpen(false)}>Pesan Sekarang</a></Button>
            </div>
        </div>
    </nav>;
}
