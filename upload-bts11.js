// Upload video-bts11 to Cloudinary
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
        public_id: publicId,
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
    await uploadVideo('public/komukuna-event/process/video-bts11.mp4', 'komukuna/process/video-bts11');
}

main();
