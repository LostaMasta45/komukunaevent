import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import type { Viewport } from 'next';
import './design-tokens.css';

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#150F03' };

const display = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500'], style: ['normal', 'italic'], display: 'swap', variable: '--font-wedding-display' });
const ui = DM_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-wedding-ui' });

export default function NavaAkhsanLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${display.variable} ${ui.variable}`}>{children}</div>;
}
