// Cloudinary Video Configuration
// All videos are served from Cloudinary CDN for optimal performance

const CLOUD_NAME = 'rezanurhamami';
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload`;

// Process Videos
export const cloudinaryProcessVideos = {
    'exp-crowd': `${BASE_URL}/e_accelerate:-15/komukuna/process/exp-crowd.mp4`,
    'video-bts1': `${BASE_URL}/komukuna/process/video-bts1.mp4`,
    'video-bts2': `${BASE_URL}/komukuna/process/video-bts2.mp4`,
    'video-bts3': `${BASE_URL}/komukuna/process/video-bts3.mp4`,
    'video-bts4': `${BASE_URL}/komukuna/process/video-bts4_pnpnzf.mp4`,
};

// Videobooth Portfolio Videos
export const cloudinaryVideoboothVideos = {
    '20260208_121636610': `${BASE_URL}/komukuna/videobooth/20260208_121636610_vk1aen.mp4`,
    'aksara-27-april': `${BASE_URL}/komukuna/videobooth/aksara-27-april.mp4`,
    'aksara-janari': `${BASE_URL}/komukuna/videobooth/aksara-janari.mp4`,
    'campusfair-2025': `${BASE_URL}/komukuna/videobooth/campusfair-2025.mp4`,
    'carnaval-fun': `${BASE_URL}/komukuna/videobooth/carnaval-fun.mp4`,
    'dialog-cinta': `${BASE_URL}/komukuna/videobooth/dialog-cinta.mp4`,
    'forkopimda': `${BASE_URL}/komukuna/videobooth/forkopimda.mp4`,
    'gemilang-smkn1': `${BASE_URL}/komukuna/videobooth/gemilang-smkn1.mp4`,
    'gesit-run': `${BASE_URL}/komukuna/videobooth/gesit-run.mp4`,
    'halal-bihalal': `${BASE_URL}/komukuna/videobooth/halal-bihalal.mp4`,
    'jombang-fest-2025': `${BASE_URL}/komukuna/videobooth/jombang-fest-2025.mp4`,
    'jalan-ceria': `${BASE_URL}/komukuna/videobooth/jalan-ceria.mp4`,
    'jalan-santai-teratai': `${BASE_URL}/komukuna/videobooth/jalan-santai-teratai.mp4`,
    'jalan-santai-melati': `${BASE_URL}/komukuna/videobooth/jalan-santai-melati.mp4`,
    'jombang-fun-run': `${BASE_URL}/komukuna/videobooth/jombang-fun-run.mp4`,
    'majapahit-run': `${BASE_URL}/komukuna/videobooth/majapahit-run.mp4`,
    'pt-graha': `${BASE_URL}/komukuna/videobooth/pt-graha.mp4`,
    'purnawiyata-mi-khoiriyah': `${BASE_URL}/komukuna/videobooth/purnawiyata-mi-khoiriyah.mp4`,
    'purnawiyata-mi-sabilul': `${BASE_URL}/komukuna/videobooth/purnawiyata-mi-sabilul.mp4`,
    'purnawiyata-smk': `${BASE_URL}/komukuna/videobooth/purnawiyata-smk.mp4`,
    'reuni-descons': `${BASE_URL}/komukuna/videobooth/reuni-descons.mp4`,
    'sd-khatolik': `${BASE_URL}/komukuna/videobooth/sd-khatolik.mp4`,
    'sd-muhammadiyah': `${BASE_URL}/komukuna/videobooth/sd-muhammadiyah.mp4`,
    'sd-plus': `${BASE_URL}/komukuna/videobooth/sd-plus.mp4`,
    'sdn-balongsari': `${BASE_URL}/komukuna/videobooth/sdn-balongsari.mp4`,
    'smabp-24': `${BASE_URL}/komukuna/videobooth/smabp-24.mp4`,
    'smabp-25': `${BASE_URL}/komukuna/videobooth/smabp-25.mp4`,
    'smp-negeri-2': `${BASE_URL}/komukuna/videobooth/smp-negeri-2.mp4`,
    'tasyakuran': `${BASE_URL}/komukuna/videobooth/tasyakuran.mp4`,
    'wedding-lisa': `${BASE_URL}/komukuna/videobooth/wedding-lisa.mp4`,
    'wedding-reza': `${BASE_URL}/komukuna/videobooth/wedding-reza.mp4`,
    'wisuda-tahfidz': `${BASE_URL}/komukuna/videobooth/wisuda-tahfidz.mp4`,
    'jombang-fest-1': `${BASE_URL}/komukuna/videobooth/jombang-fest-1.mp4`,
    'jombang-fest-2': `${BASE_URL}/komukuna/videobooth/jombang-fest-2.mp4`,
    'sd-muhammadiyah-copy': `${BASE_URL}/komukuna/videobooth/sd-muhammadiyah-copy.mp4`,
};

// Helper function to generate video thumbnail URL from Cloudinary video URL
// Uses Cloudinary's on-the-fly video transformation to extract a poster frame
export function getVideoThumbnail(videoUrl: string): string {
    // Transform: start at 1s, resize to 200x356 (smaller for faster load), auto format, auto quality
    return videoUrl
        .replace('/video/upload/', '/video/upload/so_auto,w_200,h_356,c_fill,f_auto,q_auto/')
        .replace('.mp4', '.jpg');
}

// Tiny blur placeholder for instant display while real thumbnail loads
export function getVideoThumbnailBlur(videoUrl: string): string {
    // Very small (20px) blurred placeholder
    return videoUrl
        .replace('/video/upload/', '/video/upload/so_1,w_20,h_36,c_fill,e_blur:500,f_auto,q_10/')
        .replace('.mp4', '.jpg');
}

// Higher quality thumbnail for when image is in view (lazy load this)
export function getVideoThumbnailHQ(videoUrl: string): string {
    return videoUrl
        .replace('/video/upload/', '/video/upload/so_1,w_400,h_711,c_fill,f_auto,q_70/')
        .replace('.mp4', '.jpg');
}

// Optimized video URL for web playback (smaller size, auto format)
export function getOptimizedVideoUrl(videoUrl: string, width: number = 450): string {
    return videoUrl.replace('/video/upload/', `/video/upload/f_auto,q_auto,w_${width},c_limit/`);
}
