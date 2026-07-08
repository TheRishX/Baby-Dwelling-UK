#!/usr/bin/env node
import { v2 as cloudinary } from 'cloudinary';

// 1. Configure Cloudinary using inline credentials provided by the user
cloudinary.config({
  cloud_name: 'f6trn8aq',
  api_key: '189125174732862',
  api_secret: 'QMhsP83giUAwATTXSCYgIey0E6E'
});

async function run() {
  try {
    console.log('--- Step 2: Uploading Sample Image to Cloudinary ---');
    // Using a sample image URL from Cloudinary's demo domain
    const sampleImageUrl = 'https://res.cloudinary.com/demo/image/upload/v1/sample.jpg';
    
    const uploadResult = await cloudinary.uploader.upload(sampleImageUrl, {
      folder: 'onboarding_test'
    });

    console.log('Upload Succeeded!');
    console.log(`Secure URL: ${uploadResult.secure_url}`);
    console.log(`Public ID: ${uploadResult.public_id}`);
    console.log();

    console.log('--- Step 3: Fetching Image Details (Metadata) ---');
    // Retrieve details about the uploaded image using the resource method or upload result
    console.log(`Width: ${uploadResult.width}px`);
    console.log(`Height: ${uploadResult.height}px`);
    console.log(`Format: ${uploadResult.format}`);
    console.log(`File Size: ${uploadResult.bytes} bytes`);
    console.log();

    console.log('--- Step 4: Generating Transformed Image URL ---');
    // f_auto: Automatically delivers the image in the most optimal format based on the requesting browser (e.g., WebP, AVIF).
    // q_auto: Automatically delivers the image with optimal quality and compression level, minimizing file size without visual quality loss.
    const transformedUrl = cloudinary.url(uploadResult.public_id, {
      secure: true,
      fetch_format: 'auto', // f_auto
      quality: 'auto'       // q_auto
    });

    console.log('Done! Click link below to see optimized version of the image. Check the size and the format.');
    console.log(`Transformed URL: ${transformedUrl}`);
    console.log();
  } catch (error) {
    console.error('An error occurred during onboarding script execution:', error);
    process.exit(1);
  }
}

run();
