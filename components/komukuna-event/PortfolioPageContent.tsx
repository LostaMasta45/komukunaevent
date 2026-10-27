import PortfolioCollection from './PortfolioCollection';
import type { PhotoboothItemProps } from './BentoGridSpotlight';
import type { VideoItem } from './portfolio-types';

export default function PortfolioPageContent({ photoItems, videoItems }: { photoItems: PhotoboothItemProps[]; videoItems: VideoItem[] }) {
    return <section className="min-h-screen bg-[#0F0F0F] pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Our <span className="text-komukuna-pink">Portfolio</span></h1>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">Jelajahi momen-momen terbaik yang telah kami abadikan. Temukan inspirasi untuk event Anda selanjutnya.</p>
            </div>
            <PortfolioCollection photoItems={photoItems} videoItems={videoItems} priorityMedia />
        </div>
    </section>;
}
