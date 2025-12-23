// Upload ALL videobooth videos to Cloudinary
const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'rezanurhamami',
  api_key: '127236488133995',
  api_secret: 'iBI5IyMz2gb1hYj3HUTqlVFkJGA'
});

// Videobooth videos with simple public IDs
const videoboothVideos = [
  { file: 'Aksara 27 April 2025 @komukunastudio.mp4', id: 'aksara-27-april' },
  { file: 'Aksara Janari Majapahit 18 Januari 2025 @komukunastudio.mp4', id: 'aksara-janari' },
  { file: 'CAMPUSFAIR2025 MAN 2 Mojokerto, 20 Januari 2025 @komukunastudio_2.mp4', id: 'campusfair-2025' },
  { file: 'Carnaval Fun Kuripan Sumobito.mp4', id: 'carnaval-fun' },
  { file: 'Dialog Cinta 19-20 Juli 2025 @komukunastudio.mp4', id: 'dialog-cinta' },
  { file: 'Forkopimda Cotton Run 25-05-2025 @𝗸𝗼𝗺𝘂𝗸𝘂𝗻𝗮𝘀𝘁𝘂𝗱𝗶𝗼, 𝗢𝗥𝗗𝗘𝗥 𝗕𝗬 𝗪𝗔 𝟬𝟴𝟯𝟭-𝟮𝟮𝟴𝟲-𝟲𝟵𝟳𝟱_2.mp4', id: 'forkopimda' },
  { file: 'Gemilang SMKN 1 Jombang 24 Mei 2025 @komukunastudio.mp4', id: 'gemilang-smkn1' },
  { file: 'Gesit Run Jombang, 15 Juni 2025 @komukunastudio.mp4', id: 'gesit-run' },
  { file: 'Halal bi Halal 19 April 2025 @komukunastudio_2.mp4', id: 'halal-bihalal' },
  { file: 'JOMBANG FEST 2025 @komukunastudio Copy.mp4', id: 'jombang-fest-2025' },
  { file: 'Jalan Ceria & Bazar Kapas Gading SBY.mp4', id: 'jalan-ceria' },
  { file: 'Jalan Santai Pondok Teratai.mp4', id: 'jalan-santai-teratai' },
  { file: 'Jalan Santai Warga Melati SBY.mp4', id: 'jalan-santai-melati' },
  { file: 'Jombang Fun Run by @komukunastudio - SEWA WA 0895-3328-78425_2.mp4', id: 'jombang-fun-run' },
  { file: 'MAJAPAHIT RUN MJK - 22 JUNI 2025 - Videobooth by @komukunastudio.mp4', id: 'majapahit-run' },
  { file: 'PT Graha Mutu Persada Mojokerto 28 Januari 2025 @komukunastudio_3.mp4', id: 'pt-graha' },
  { file: 'Purnawiyata MI Khoiriyah Sumobito 2024 Copy.mp4', id: 'purnawiyata-mi-khoiriyah' },
  { file: 'Purnawiyata MI Sabilul Huda Senden Jombang 19 Juni 2024.mp4', id: 'purnawiyata-mi-sabilul' },
  { file: 'Purnawiyata SMK Khoiriyah Sumobito 2024.mp4', id: 'purnawiyata-smk' },
  { file: 'Reuni Descons 26 PPNS 12 Januari 2025 @komukunastudio Copy.mp4', id: 'reuni-descons' },
  { file: 'SD Khatolik Wijana Jbg 2 Juni 2025 @komukunastudio.mp4', id: 'sd-khatolik' },
  { file: 'SD MUHAMMADIYAH BRAWIJAYA MJK 14 Juni 2025 @komukunastudio.mp4', id: 'sd-muhammadiyah' },
  { file: 'SD PLUS Muhammadiyah Brawijaya Mojokerto.mp4', id: 'sd-plus' },
  { file: 'SDN BALONGSARI 2 MJK 11 Juni 2025 @komukunastudio.mp4', id: 'sdn-balongsari' },
  { file: 'SMABP 24 Mei 2025 @komukunastudio.mp4', id: 'smabp-24' },
  { file: 'SMABP 25 Mei 2025 @komukunastudio Copy.mp4', id: 'smabp-25' },
  { file: 'SMP Negeri 2 Sumobito, 16 Januari 2025 @komukunastudio.mp4', id: 'smp-negeri-2' },
  { file: 'Tasyakuran Khitan_2.mp4', id: 'tasyakuran' },
  { file: 'Wedding Lisa & Agus 19 Juni 2025 by @komukunastudio.mp4', id: 'wedding-lisa' },
  { file: 'Wedding Reza & Yola 07-07-2024.mp4', id: 'wedding-reza' },
  { file: "Wisuda Tahfidz Akbar Raudhatul Qur'an Mojokerto 14 Desember 2024 @komukunastudio.mp4", id: 'wisuda-tahfidz' },
  { file: 'Jombang Fest @komukunastudio.mp4', id: 'jombang-fest-1' },
  { file: 'Jombang Fest @komukunastudio_2.mp4', id: 'jombang-fest-2' },
  { file: 'SD MUHAMMADIYAH BRAWIJAYA MJK 14 Juni 2025 @komukunastudio Copy.mp4', id: 'sd-muhammadiyah-copy' },
];

const baseDir = 'public/portofolio/videobooth';

async function uploadVideo(filePath, publicId) {
  try {
    console.log(`Uploading: ${publicId}`);
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'video',
      public_id: `komukuna/videobooth/${publicId}`,
      overwrite: true,
      chunk_size: 6000000,
    });
    console.log(`✅ ${publicId}: ${result.secure_url}`);
    return result;
  } catch (error) {
    console.error(`❌ Error ${publicId}:`, error.message);
    return null;
  }
}

async function main() {
  console.log(`Starting upload of ${videoboothVideos.length} videobooth videos...\n`);
  
  let success = 0;
  let failed = 0;
  
  for (const video of videoboothVideos) {
    const filePath = path.join(baseDir, video.file);
    if (fs.existsSync(filePath)) {
      const result = await uploadVideo(filePath, video.id);
      if (result) success++;
      else failed++;
    } else {
      console.log(`⚠️ File not found: ${video.file}`);
      failed++;
    }
  }
  
  console.log(`\n✅ Complete! Success: ${success}, Failed: ${failed}`);
}

main();
