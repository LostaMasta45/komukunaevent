// Upload new videobooth videos to Cloudinary
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'rezanurhamami',
  api_key: '127236488133995',
  api_secret: 'iBI5IyMz2gb1hYj3HUTqlVFkJGA'
});

async function uploadVideo(filePath, publicId) {
  console.log(`Uploading ${filePath} to Cloudinary...`);
  try {
    const result = await cloudinary.uploader.upload(
      filePath,
      {
        resource_type: 'video',
        public_id: `komukuna/videobooth/${publicId}`,
        overwrite: true,
        chunk_size: 6000000,
      }
    );
    console.log(`✅ Upload successful for ${publicId}!`);
    console.log('URL:', result.secure_url);
    console.log('Size:', Math.round(result.bytes / 1024 / 1024), 'MB\n');
    return result;
  } catch (error) {
    console.error(`❌ Upload failed for ${publicId}:`, error.message);
  }
}

async function main() {
    await uploadVideo('public/portofolio/videobooth/aksara tka 2026 @komukunastudio.mp4', 'aksara-tka-2026');
    await uploadVideo('public/portofolio/videobooth/TK Aisyiyah Bustanul Athfal 9 Mjk.mp4', 'tk-aisyiyah-bustanul');
    await uploadVideo('public/portofolio/videobooth/GRADUATION SD PLUS MUHAMMADIYAH BRAWIJAYA.mp4', 'graduation-sd-plus');
}

main();
