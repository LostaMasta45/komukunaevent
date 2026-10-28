import { eventMetadata } from '@/lib/event-site';
import Navbar from '@/components/komukuna-event/Navbar';
import Footer from '@/components/komukuna-event/Footer';
import FloatingCTA from '@/components/komukuna-event/FloatingCTA';
import PortfolioPageContent from '@/components/komukuna-event/PortfolioPageContent';
import { portfolioItems, videoItems } from '@/components/komukuna-event/portfolio-data';

export const metadata = eventMetadata('/portofolio', 'Portofolio Photobooth & Videobooth | Komukuna Booth', 'Jelajahi hasil photobooth dan videobooth 360 Komukuna Booth. Inspirasi acara wedding, gathering, dan party di Jombang dan Mojokerto.');

export default function PortfolioPage() {
    return (
        <main className="relative w-full overflow-hidden bg-[#0F0F0F]">
            <Navbar />
            <PortfolioPageContent photoItems={portfolioItems} videoItems={videoItems} />
            <Footer />
            <FloatingCTA />
        </main>
    );
}
