import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* config options here */
  server: {
    port: process.env.FRONT_PORT || 3001,
  },
};

export default nextConfig;
