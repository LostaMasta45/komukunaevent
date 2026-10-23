import type { Metadata } from 'next';
import WeddingGallery from './wedding-gallery';
import { WEDDING_EVENT } from './event-config';

export const metadata: Metadata = {
  title: 'Wahyu & Novita — Our Happy Moments | Komukuna',
  description: `Kenangan pernikahan Wahyu & Novita, ${WEDDING_EVENT.dateLabel}. Temukan dan simpan hasil foto photobooth favoritmu. ${WEDDING_EVENT.hashtag}`,
  robots: { index: false, follow: false },
};

export default function WahyuNovitaPage() {
  return <WeddingGallery />;
}
