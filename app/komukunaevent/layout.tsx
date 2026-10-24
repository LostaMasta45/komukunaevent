import type { Metadata } from 'next';
import BrandFavicon from '@/components/branding/BrandFavicon';
import { brandIcons } from '@/components/branding/brand-assets';

export const metadata: Metadata = {
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
        <div className="bg-komukuna-dark min-h-screen text-gray-100 selection:bg-komukuna-pink selection:text-white font-sans">
            <BrandFavicon mode="dark" />
            {children}
        </div>
    );
}
