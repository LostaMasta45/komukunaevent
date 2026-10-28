import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PolicyPage({ title, children }: { title: string; children: ReactNode }) {
    return <>
        <Navbar />
        <main className="container mx-auto max-w-3xl px-5 pt-36 pb-20">
            <Link href="/" prefetch={false} className="text-pink-300 underline">Kembali ke beranda</Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white mt-6">{title}</h1>
            <article className="event-prose mt-8">{children}</article>
        </main>
        <Footer />
    </>;
}
import Link from 'next/link';
