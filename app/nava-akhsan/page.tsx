import type { Metadata } from 'next';
import WeddingGallery from './wedding-gallery';
import { WEDDING_EVENT } from './event-config';

export const metadata: Metadata = {
  title: 'Nava & Akhsan — Our Happy Moments | Komukuna',
  description: `Kenangan pernikahan Nava & Akhsan, ${WEDDING_EVENT.dateLabel}. Temukan dan simpan hasil foto photobooth favoritmu. ${WEDDING_EVENT.hashtag}`,
  robots: { index: false, follow: false },
};

export default function NavaAkhsanPage() {
  return <WeddingGallery />;
}
