// Upload videos to Cloudinary using Node.js SDK
const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'rezanurhamami',
  api_key: '127236488133995',
  api_secret: 'iBI5IyMz2gb1hYj3HUTqlVFkJGA'
});

// Process videos to upload
const processVideos = [
  { file: 'public/komukuna-event/process/exp-crowd.mp4', publicId: 'komukuna/process/exp-crowd' },
  { file: 'public/komukuna-event/process/video-bts1.mp4', publicId: 'komukuna/process/video-bts1' },
  { file: 'public/komukuna-event/process/video-bts2.mp4', publicId: 'komukuna/process/video-bts2' },
  { file: 'public/komukuna-event/process/video-bts3.mp4', publicId: 'komukuna/process/video-bts3' },
];

async function uploadVideo(filePath, publicId) {
  try {
    console.log(`Uploading: ${filePath} -> ${publicId}`);
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'video',
      public_id: publicId,
      overwrite: true,
      chunk_size: 6000000, // 6MB chunks for large files
    });
    console.log(`✅ Success: ${result.secure_url}`);
    return result;
  } catch (error) {
    console.error(`❌ Error uploading ${filePath}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('Starting upload process...\n');
  
  for (const video of processVideos) {
    if (fs.existsSync(video.file)) {
      await uploadVideo(video.file, video.publicId);
    } else {
      console.log(`File not found: ${video.file}`);
    }
  }
  
  console.log('\n✅ Upload process complete!');
  console.log('\nCheck your videos at:');
  console.log('https://console.cloudinary.com/pm/c-b9daa75eb3cac7a01a3ca8ed78efbc/media-explorer/komukuna');
}

main();
