import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'plus.unsplash.com',
      port: '',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: 'res.cloudinary.com', // ✅ for Cloudinary-hosted images
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: 'images.unsplash.com', // ✅ Added this line
      port: '',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: 'via.placeholder.com',
      port: '',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: 'ucarecdn.com',
      port: '',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: 'i.pinimg.com',
      port: '',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: 'placeimg.com',
      port: '',
      pathname: '/**',
    },
    {
      protocol: 'https',
      hostname: 'oaidalleapiprodscus.blob.core.windows.net',
      port: '',
      pathname: '/**',
    },
  ],
},
}

export default nextConfig;
