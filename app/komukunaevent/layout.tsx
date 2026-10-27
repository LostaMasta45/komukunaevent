import type { Metadata } from 'next';
import '@/components/komukuna-event/event.css';
import { brandIcons } from '@/components/branding/brand-assets';
import { siteUrl } from '@/lib/event-site';

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    icons: {
        icon: { url: brandIcons.dark, type: 'image/png', sizes: '64x64' },
        shortcut: brandIcons.dark,
        apple: { url: brandIcons.apple, type: 'image/png', sizes: '180x180' },
    },
    title: 'Komukuna Event | Photobooth & 360 Videobooth Services',
    description: 'Premium Photobooth and 360 Videobooth services for weddings, corporate events, and parties. Featuring customizable templates and instant sharing. Part of Komukuna Studio.',
};

export default function KomukunaEventLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
        <div className="event-site bg-komukuna-dark min-h-screen text-gray-100 selection:bg-komukuna-pink selection:text-white font-sans">
            {children}
        </div>
        </>
    );
}
