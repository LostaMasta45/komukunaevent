import { eventMetadata, siteUrl } from '@/lib/event-site';
import Navbar from '@/components/komukuna-event/Navbar';
import HeroSection from '@/components/komukuna-event/HeroSection';
import { partnerAssets } from '@/components/komukuna-event/partner-assets';

import TrustBar from '@/components/komukuna-event/TrustBar';
import PartnerLogos from '@/components/komukuna-event/PartnerLogos';
import ServicesSection from '@/components/komukuna-event/ServicesSection';
import USPSection from '@/components/komukuna-event/USPSection';
import VideoboothSpotlight from '@/components/komukuna-event/VideoboothSpotlight';
import GalleryPreview from '@/components/komukuna-event/GalleryPreview';
import DeferredFeature from '@/components/komukuna-event/DeferredFeature';

import PricingPreview from '@/components/komukuna-event/PricingPreview';
import HowItWorksSection from '@/components/komukuna-event/HowItWorksSection';
import FAQSection from '@/components/komukuna-event/FAQSection';
import Footer from '@/components/komukuna-event/Footer';
import FloatingCTA from '@/components/komukuna-event/FloatingCTA';


export const metadata = eventMetadata('/', 'Komukuna Booth | Photobooth & Videobooth Jombang dan Mojokerto', 'Photobooth unlimited cetak dan videobooth 360 untuk wedding, corporate gathering, dan party di Jombang dan Mojokerto. Konsultasikan paket dan jadwal acara Anda.');

const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Organization',
            '@id': `${siteUrl}/#organization`,
            name: 'Komukuna Booth',
            alternateName: 'Komukuna Studio',
            url: `${siteUrl}/`,
            logo: `${siteUrl}/brand/komukuna-dark.png`,
            telephone: '+6283122866975',
            email: 'komukuna@gmail.com',
            areaServed: ['Jombang', 'Mojokerto'],
            sameAs: ['https://instagram.com/komukunastudio', 'https://www.tiktok.com/@komukunastudio'],
        },
        {
            '@type': 'WebSite',
            '@id': `${siteUrl}/#website`,
            url: `${siteUrl}/`,
            name: 'Komukuna Booth',
            inLanguage: 'id-ID',
            publisher: { '@id': `${siteUrl}/#organization` },
        },
    ],
};

export default function KomukunaEventPage() {

    return (
        <main className="event-home relative w-full overflow-hidden">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
            <Navbar />
            <HeroSection />
            <TrustBar />
            <PartnerLogos partners={partnerAssets} />
            <ServicesSection />
            <VideoboothSpotlight />
            <USPSection />
            <DeferredFeature feature="gallery"><GalleryPreview /></DeferredFeature>
            <DeferredFeature feature="pricing"><PricingPreview /></DeferredFeature>
            <HowItWorksSection />
            <FAQSection />
            <Footer />
            <FloatingCTA />
        </main>
    );
}

