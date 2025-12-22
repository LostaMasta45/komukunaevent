import { PhotoboothItemProps } from '@/components/komukuna-event/BentoGridSpotlight';
import { cloudinaryProcessVideos, cloudinaryVideoboothVideos } from '@/lib/cloudinary-videos';

// Photobooth Data
export const portfolioItems: PhotoboothItemProps[] = [
    {
        id: 1,
        badge: "Recommended",
        title: "Fitrah & Okta<br />Wedding",
        subtitle: "Live 360° Videobooth Experience",
        videoSrc: cloudinaryProcessVideos['video-bts1'],
        templateImage: "/komukuna-event/process/hasil-template1.jpg",
        printImage: "/komukuna-event/process/hasil-cetak1.jpg",
        rawImage: "/komukuna-event/process/hasil-raw1.jpg",
        btsImage: "/komukuna-event/process/fotobts1.jpg",
    },
    {
        id: 2,
        badge: "New Release",
        title: "EX3 Basketball<br />Competition",
        subtitle: "Sport Event Photobooth & 360°",
        videoSrc: cloudinaryProcessVideos['video-bts2'],
        templateImage: "/komukuna-event/process/hasil-template2.jpg",
        printImage: "/komukuna-event/process/hasil-cetak2.jpeg",
        rawImage: "/komukuna-event/process/hasil-raw2.jpg",
        btsImage: "/komukuna-event/process/fotobts2.JPG",
    },
    {
        id: 3,
        badge: "Special Event",
        title: "Event Stories<br />Highlight",
        subtitle: "Memorable Photobooth Moments",
        videoSrc: cloudinaryProcessVideos['video-bts3'],
        templateImage: "/komukuna-event/process/hasil-template3.jpg",
        printImage: "/komukuna-event/process/hasil-cetak3.jpeg",
        rawImage: "/komukuna-event/process/hasil-raw3.jpg",
        btsImage: "/komukuna-event/process/fotobts3.jpg",
    }
];

// Real Data for Videobooth - All served from Cloudinary CDN
export const videoItems = [
    { id: 1, title: 'Aksara 27 April 2025', src: cloudinaryVideoboothVideos['aksara-27-april'] },
    { id: 2, title: 'Aksara Janari Majapahit', src: cloudinaryVideoboothVideos['aksara-janari'] },
    { id: 3, title: 'CAMPUSFAIR 2025 MAN 2 Mojokerto', src: cloudinaryVideoboothVideos['campusfair-2025'] },
    { id: 4, title: 'Carnaval Fun Kuripan', src: cloudinaryVideoboothVideos['carnaval-fun'] },
    { id: 5, title: 'Dialog Cinta', src: cloudinaryVideoboothVideos['dialog-cinta'] },
    { id: 6, title: 'Forkopimda Cotton Run', src: cloudinaryVideoboothVideos['forkopimda'] },
    { id: 7, title: 'Gemilang SMKN 1 Jombang', src: cloudinaryVideoboothVideos['gemilang-smkn1'] },
    { id: 8, title: 'Gesit Run Jombang', src: cloudinaryVideoboothVideos['gesit-run'] },
    { id: 9, title: 'Halal bi Halal', src: cloudinaryVideoboothVideos['halal-bihalal'] },
    { id: 10, title: 'JOMBANG FEST 2025', src: cloudinaryVideoboothVideos['jombang-fest-2025'] },
    { id: 11, title: 'Jalan Ceria & Bazar Kapas Gading', src: cloudinaryVideoboothVideos['jalan-ceria'] },
    { id: 12, title: 'Jalan Santai Pondok Teratai', src: cloudinaryVideoboothVideos['jalan-santai-teratai'] },
    { id: 13, title: 'Jalan Santai Warga Melati', src: cloudinaryVideoboothVideos['jalan-santai-melati'] },
    { id: 14, title: 'Jombang Fun Run', src: cloudinaryVideoboothVideos['jombang-fun-run'] },
    { id: 15, title: 'MAJAPAHIT RUN MJK', src: cloudinaryVideoboothVideos['majapahit-run'] },
    { id: 16, title: 'PT Graha Mutu Persada', src: cloudinaryVideoboothVideos['pt-graha'] },
    { id: 17, title: 'Purnawiyata MI Khoiriyah', src: cloudinaryVideoboothVideos['purnawiyata-mi-khoiriyah'] },
    { id: 18, title: 'Purnawiyata MI Sabilul Huda', src: cloudinaryVideoboothVideos['purnawiyata-mi-sabilul'] },
    { id: 19, title: 'Purnawiyata SMK Khoiriyah', src: cloudinaryVideoboothVideos['purnawiyata-smk'] },
    { id: 20, title: 'Reuni Descons 26 PPNS', src: cloudinaryVideoboothVideos['reuni-descons'] },
    { id: 21, title: 'SD Khatolik Wijana Jbg', src: cloudinaryVideoboothVideos['sd-khatolik'] },
    { id: 22, title: 'SD MUHAMMADIYAH BRAWIJAYA', src: cloudinaryVideoboothVideos['sd-muhammadiyah'] },
    { id: 23, title: 'SD PLUS Muhammadiyah Brawijaya', src: cloudinaryVideoboothVideos['sd-plus'] },
    { id: 24, title: 'SDN BALONGSARI 2 MJK', src: cloudinaryVideoboothVideos['sdn-balongsari'] },
    { id: 25, title: 'SMABP 24 Mei 2025', src: cloudinaryVideoboothVideos['smabp-24'] },
    { id: 26, title: 'SMABP 25 Mei 2025', src: cloudinaryVideoboothVideos['smabp-25'] },
    { id: 27, title: 'SMP Negeri 2 Sumobito', src: cloudinaryVideoboothVideos['smp-negeri-2'] },
    { id: 28, title: 'Tasyakuran Khitan', src: cloudinaryVideoboothVideos['tasyakuran'] },
    { id: 29, title: 'Wedding Lisa & Agus', src: cloudinaryVideoboothVideos['wedding-lisa'] },
    { id: 30, title: 'Wedding Reza & Yola', src: cloudinaryVideoboothVideos['wedding-reza'] },
    { id: 31, title: 'Wisuda Tahfidz Akbar', src: cloudinaryVideoboothVideos['wisuda-tahfidz'] },
];
