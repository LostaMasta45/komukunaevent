import Link from 'next/link';
import Navbar from '@/components/komukuna-event/Navbar';
import HeroSection from '@/components/komukuna-event/HeroSection';
import TrustBar from '@/components/komukuna-event/TrustBar';
import PartnerLogos from '@/components/komukuna-event/PartnerLogos';
import ServicesSection from '@/components/komukuna-event/ServicesSection';
import USPSection from '@/components/komukuna-event/USPSection';
import VideoboothSpotlight from '@/components/komukuna-event/VideoboothSpotlight';
import GallerySection from '@/components/komukuna-event/GallerySection';
import PricingSection from '@/components/komukuna-event/PricingSection';
import HowItWorksSection from '@/components/komukuna-event/HowItWorksSection';
import FAQSection from '@/components/komukuna-event/FAQSection';
import Footer from '@/components/komukuna-event/Footer';
import Preloader from '@/components/komukuna-event/Preloader';
import FloatingCTA from '@/components/komukuna-event/FloatingCTA';


import fs from 'fs';
import path from 'path';

function getLogos() {
    const logoDir = path.join(process.cwd(), 'public', 'komukuna-event', 'logo');
    try {
        const files = fs.readdirSync(logoDir);
        return files
            .filter(file => /\.(png|jpe?g|svg)$/i.test(file)) // Filter images
            .map(file => `/komukuna-event/logo/${file}`);
    } catch (error) {
        console.error("Error reading logo directory:", error);
        return [];
    }
}

export default function KomukunaEventPage() {
    const logos = getLogos();

    return (
        <main className="relative w-full overflow-hidden">
            <Preloader />
            <Navbar />
            <HeroSection />
            <TrustBar />
            <PartnerLogos logos={logos} />
            <ServicesSection />
            <VideoboothSpotlight />
            <USPSection />
            <GallerySection />
            <PricingSection />
            <HowItWorksSection />
            <FAQSection />
            <Footer />
            <FloatingCTA />
        </main>
    );
}
