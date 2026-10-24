import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { brandAssets } from '@/components/branding/brand-assets';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const mode = params.get('mode') === 'light' ? 'light' : 'dark';
  const size = params.get('size') === '180' ? 180 : 64;
  const source = await readFile(path.join(process.cwd(), 'public', decodeURIComponent(brandAssets[mode]).slice(1)));
  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', background: size === 180 ? '#150F03' : 'transparent' }}>
      {/* The existing brand artwork is fitted without cropping or recoloring. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`data:image/png;base64,${source.toString('base64')}`} alt="" width={size} height={size} style={{ objectFit: 'contain' }} />
    </div>,
    { width: size, height: size, headers: { 'Cache-Control': 'public, max-age=86400' } },
  );
}
