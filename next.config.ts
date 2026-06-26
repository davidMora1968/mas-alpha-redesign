import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Serve images straight from /public instead of Vercel's image optimizer.
  // The optimizer hit its free-tier quota (HTTP 402), which broke every
  // next/image across the site. Unoptimized is fine for a noindexed,
  // low-traffic demo and removes the quota dependency entirely.
  images: { unoptimized: true },
};

export default nextConfig;
