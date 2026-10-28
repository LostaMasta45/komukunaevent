import type { Metadata } from 'next';

const configuredUrl = new URL(process.env.SITE_URL || 'https://komukunabooth.web.id');
if (!['https:', 'http:'].includes(configuredUrl.protocol)) throw new Error('SITE_URL must be an absolute HTTP(S) URL');
export const siteUrl = configuredUrl.origin;

export function eventMetadata(path: string, title: string, description: string): Metadata {
    const url = `${siteUrl}${path}`;
    return {
        metadataBase: new URL(siteUrl),
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            type: 'website', locale: 'id_ID', siteName: 'Komukuna Booth', url, title, description,
            images: [{ url: `${siteUrl}/opengraph-image`, width: 1200, height: 630, alt: 'Komukuna Booth — Photobooth dan Videobooth 360 di Jombang dan Mojokerto' }],
        },
        twitter: { card: 'summary_large_image', title, description, images: [`${siteUrl}/opengraph-image`] },
    };
}
