import { Metadata } from 'next';
import Navbar from '@/components/komukuna-event/Navbar';
import Footer from '@/components/komukuna-event/Footer';
import FloatingCTA from '@/components/komukuna-event/FloatingCTA';
import PortfolioPageContent from '@/components/komukuna-event/PortfolioPageContent';
import { portfolioItems, videoItems } from '@/components/komukuna-event/portfolio-data';

export const metadata: Metadata = {
    title: 'Portofolio | Komukuna Event',
    description: 'Jelajahi momen-momen terbaik yang telah kami abadikan. Koleksi portofolio photobooth dan videobooth 360 dari Komukuna Event.',
};

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
