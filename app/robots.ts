import type { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

// While the site is a client demo on a vercel.app URL, DEMO_NOINDEX=1 keeps
// it out of search engines entirely. Unset it when the real domain goes live.
const DEMO = process.env.DEMO_NOINDEX === '1';

export default function robots(): MetadataRoute.Robots {
  if (DEMO) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
