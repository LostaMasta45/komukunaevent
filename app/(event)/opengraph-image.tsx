import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';
export const alt = 'Komukuna Booth — Photobooth dan Videobooth 360 di Jombang dan Mojokerto';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
    const logo = await readFile(path.join(process.cwd(), 'public/brand/komukuna-dark.png'));
    return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#0f0f0f', color: 'white', padding: 70 }}>
        {/* Local artwork avoids external requests during image generation. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/png;base64,${logo.toString('base64')}`} alt="" width={220} height={160} style={{ objectFit: 'contain' }} />
        <div style={{ fontSize: 62, fontWeight: 700, marginTop: 20 }}>Bawa Pulang Kenangan Manis.</div>
        <div style={{ fontSize: 32, color: '#f596ba', marginTop: 24 }}>Photobooth & Videobooth 360</div>
        <div style={{ fontSize: 26, color: '#d1d5db', marginTop: 18 }}>Jombang & Mojokerto • komukunabooth.web.id</div>
    </div>, size);
}
