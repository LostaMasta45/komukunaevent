import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/event-site';

export default function sitemap(): MetadataRoute.Sitemap {
    return ['/komukunaevent', '/komukunaevent/portofolio', '/komukunaevent/kebijakan-privasi', '/komukunaevent/syarat-ketentuan'].map(path => ({ url: `${siteUrl}${path}` }));
}
