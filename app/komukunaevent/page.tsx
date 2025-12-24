import Link from 'next/link';
import Navbar from '@/components/komukuna-event/Navbar';
import HeroSection from '@/components/komukuna-event/HeroSection';
import Preloader from '@/components/komukuna-event/Preloader';
import dynamic from 'next/dynamic';
import fs from 'fs';
import path from 'path';

// Lazy Load components below the fold to reduce initial bundle size (LCP optimization)
const TrustBar = dynamic(() => import('@/components/komukuna-event/TrustBar'));
const PartnerLogos = dynamic(() => import('@/components/komukuna-event/PartnerLogos'));
const ServicesSection = dynamic(() => import('@/components/komukuna-event/ServicesSection'));
const USPSection = dynamic(() => import('@/components/komukuna-event/USPSection'));
const VideoboothSpotlight = dynamic(() => import('@/components/komukuna-event/VideoboothSpotlight'));
const GallerySection = dynamic(() => import('@/components/komukuna-event/GallerySection'));
const PricingSection = dynamic(() => import('@/components/komukuna-event/PricingSection'));
const HowItWorksSection = dynamic(() => import('@/components/komukuna-event/HowItWorksSection'));
const FAQSection = dynamic(() => import('@/components/komukuna-event/FAQSection'));
const Footer = dynamic(() => import('@/components/komukuna-event/Footer'));
const FloatingCTA = dynamic(() => import('@/components/komukuna-event/FloatingCTA'));


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
