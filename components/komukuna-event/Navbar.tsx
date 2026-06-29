"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/Button';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        // Scroll Spy Logic
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { rootMargin: "-20% 0px -60% 0px" });

        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => observer.observe(section));

        return () => {
            window.removeEventListener('scroll', handleScroll);
            sections.forEach(section => observer.unobserve(section));
        };
    }, []);

    const navLinks = [
        { name: 'Layanan', href: '#services' },
        { name: 'Keunggulan', href: '#usp' },
        { name: 'Testimoni', href: '#testimonials' },
        { name: 'Harga', href: '#pricing' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-komukuna-dark/80 backdrop-blur-md py-3 shadow-lg border-b border-white/5' : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <Link href="/komukunaevent" className="relative h-10 w-32 md:h-12 md:w-40 transition-transform hover:scale-105">
                    <Image
                        src="/komukuna-event/logo.png"
                        alt="Komukuna Event"
                        fill
                        className="object-contain object-left"
                        priority
                        sizes="(max-width: 768px) 128px, 160px"
                    />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.substring(1);
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`relative font-medium text-sm tracking-wide transition-colors ${isActive ? 'text-komukuna-pink' : 'text-gray-300 hover:text-white'}`}
                            >
                                {link.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNavIndicator"
                                        className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-komukuna-pink rounded-full"
                                    />
                                )}
                            </Link>
                        );
                    })}
                    <Button variant="gradient" size="sm" asChild className="ml-4 hover:scale-105 transition-transform">
                        <Link href="#pricing">Pesan Sekarang</Link>
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-komukuna-dark border-t border-white/10"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => {
                                const isActive = activeSection === link.href.substring(1);
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`flex items-center justify-between text-lg font-medium transition-colors ${isActive ? 'text-komukuna-pink' : 'text-gray-300 hover:text-white'}`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeNavMobile"
                                                className="w-2 h-2 rounded-full bg-komukuna-pink"
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                            <Button variant="gradient" className="w-full mt-4" asChild>
                                <Link href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>Pesan Sekarang</Link>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
