import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import { brandIcons } from '@/components/branding/brand-assets';
import './design-tokens.css';

export const metadata: Metadata = {
  icons: {
    icon: { url: brandIcons.light, type: 'image/png', sizes: '64x64' },
    shortcut: brandIcons.light,
    apple: { url: brandIcons.apple, type: 'image/png', sizes: '180x180' },
  },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#FAF4E8' };

const display = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500'], style: ['normal', 'italic'], display: 'swap', variable: '--font-wedding-display' });
const ui = DM_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-wedding-ui' });

export default function WeddingLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${display.variable} ${ui.variable}`}>{children}</div>;
}
