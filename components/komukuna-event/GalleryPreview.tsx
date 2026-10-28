import Image from '@/components/OptimizedImage';
import { portfolioItems, videoItems } from './portfolio-data';
import { plainTitle } from './portfolio-types';
import { getVideoThumbnail } from '@/lib/cloudinary-videos';

// The server preview retains the gallery content and working media links before
// the interactive gallery is loaded near the viewport.
export default function GalleryPreview() {
    const item = portfolioItems[0];
    return <section className="py-24 bg-[#0F0F0F]">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16"><h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Momen <span className="text-komukuna-pink">Eksklusif</span></h2><p className="text-gray-300">Intip sekilas karya terbaik kami. Eksplorasi koleksi lengkap kami di arsip portfolio.</p></div>
            <div className="flex items-center justify-between gap-4 mb-8"><h3 className="text-2xl font-bold text-white">Featured Event</h3><a href="/portofolio" className="text-gray-200 underline">View All Albums</a></div>
            <div className="grid lg:grid-cols-12 gap-6 mb-20">
                <div className="lg:col-span-4">
                    <a href={item.videoSrc} className="relative block aspect-[9/16] rounded-[2rem] overflow-hidden" aria-label={`Putar video ${plainTitle(item.title)}`}>
                        <Image src={item.posterImage || item.btsImage} alt="" fill sizes="(max-width: 639px) 100vw, 360px" quality={65} className="object-cover" />
                        <span className="absolute bottom-4 left-4 rounded-full bg-black/90 p-3 text-white">Putar video</span>
                    </a>
                    <h4 className="mt-5 text-2xl font-bold text-white">{plainTitle(item.title)}</h4><p className="text-gray-300 mt-2">{item.subtitle}</p>
                </div>
                <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
                    {[
                        { src: item.templateImage, label: 'Premium Template', detail: 'Custom Design' },
                        { src: item.printImage, label: 'Cetak 15 Detik', detail: 'High Quality Print' },
                        { src: item.rawImage, label: 'File Asli (Raw)', detail: 'Foto digital' },
                        { src: item.btsImage, label: 'BTS', detail: 'Di balik layar' },
                    ].map((photo, index) => <a key={photo.src} href={photo.src} className={`relative block rounded-[2rem] overflow-hidden ${index < 2 ? 'aspect-[2/3]' : 'aspect-[3/2]'}`}>
                        <Image src={photo.src} alt="" fill sizes="(max-width: 639px) 100vw, 350px" quality={65} className="object-cover" />
                        <span className="absolute bottom-4 left-4 right-4 rounded-2xl bg-black/85 p-4 text-white"><span className="block font-bold">{photo.label}</span><span className="block text-sm">{photo.detail}</span></span>
                    </a>)}
                </div>
            </div>
            <div className="flex items-center justify-between gap-4 mb-8"><h3 className="text-2xl font-bold text-white">Videobooth 360</h3><a href="/portofolio" className="text-gray-200 underline">Open Video Archive</a></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {videoItems.slice(0, 4).map(video => <a key={video.id} href={video.src} className="block text-white">
                    <span className="relative block aspect-[9/16] rounded-2xl overflow-hidden"><Image src={getVideoThumbnail(video.src)} alt="" fill sizes="(max-width: 639px) 45vw, 25vw" quality={65} className="object-cover" /></span>
                    <span className="block mt-3 text-sm font-semibold">{video.title}</span>
                </a>)}
            </div>
            <div className="text-center mt-12"><a href="/portofolio" className="inline-flex min-h-11 rounded-full bg-komukuna-purple px-8 py-4 font-bold text-white">Jelajahi Semua Portfolio</a></div>
        </div>
    </section>;
}
