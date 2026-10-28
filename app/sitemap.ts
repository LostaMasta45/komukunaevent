import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/event-site';

export default function sitemap(): MetadataRoute.Sitemap {
    return ['/', '/portofolio', '/kebijakan-privasi', '/syarat-ketentuan'].map(path => ({ url: `${siteUrl}${path}` }));
}
