// Upload video-bts6 to Cloudinary
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'rezanurhamami',
  api_key: '127236488133995',
  api_secret: 'iBI5IyMz2gb1hYj3HUTqlVFkJGA'
});

async function uploadVideo() {
  console.log('Uploading video-bts6.mp4 to Cloudinary...');
  
  try {
    const result = await cloudinary.uploader.upload(
      'public/komukuna-event/process/video-bts6.mp4',
      {
        resource_type: 'video',
        public_id: 'komukuna/process/video-bts6',
        overwrite: true,
        chunk_size: 6000000,
      }
    );
    
    console.log('✅ Upload successful!');
    console.log('URL:', result.secure_url);
    console.log('Size:', Math.round(result.bytes / 1024 / 1024), 'MB');
  } catch (error) {
    console.error('❌ Upload failed:', error.message);
  }
}

uploadVideo();
