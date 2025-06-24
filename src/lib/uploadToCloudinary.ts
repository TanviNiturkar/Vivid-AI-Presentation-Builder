import { v2 as cloudinary } from 'cloudinary';
import axios from 'axios';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function uploadToCloudinary(imageUrl: string): Promise<string> {
  try {
    // 1. Download the image as a buffer
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');
    const mimeType = response.headers['content-type'];
    const base64 = buffer.toString('base64');
    const dataUri = `data:${mimeType};base64,${base64}`;

    // 2. Upload the base64 Data URI to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: 'presentations',
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET, // Optional, if you're using presets
    });

    // 3. Return secure URL
    if (!uploadResult.secure_url) {
      throw new Error('Cloudinary upload failed');
    }

    return uploadResult.secure_url;
  } catch (error) {
    console.error('🔴 Cloudinary upload failed:', error);
    throw new Error('Cloudinary upload failed');
  }
}
