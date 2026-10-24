import { getAlbum } from '@/app/nava-akhsan/album-source';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

function filename(original: string, fallback: string) {
  return new URL(original).pathname.split('/').pop()?.replace(/[^a-zA-Z0-9._-]/g, '_') || fallback;
}

async function getOriginal(url: string) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok || !response.body) throw new Error('File tidak tersedia.');
  const type = response.headers.get('content-type') ?? 'application/octet-stream';
  if (!type.startsWith('image/') && !type.startsWith('video/') && type !== 'application/octet-stream') throw new Error('Format tidak didukung.');
  return { response, type };
}

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const id = params.get('id');
  try {
    const photo = (await getAlbum()).photos.find((item) => item.id === id);
    if (!photo) return Response.json({ error: 'Foto tidak ditemukan.' }, { status: 404 });
    const itemId = params.get('item');
    const item = itemId ? photo.items.find((entry) => entry.id === itemId) : photo.items.find((entry) => entry.id === photo.id) ?? photo.items[0];
    if (!item) return Response.json({ error: 'Berkas tidak ditemukan dalam sesi ini.' }, { status: 404 });
    const { response, type } = await getOriginal(item.original);
    return new Response(response.body, { headers: { 'Content-Type': type, 'Content-Disposition': `attachment; filename="${filename(item.original, item.id)}"`, 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff' } });
  } catch {
    return Response.json({ error: 'Unduhan belum berhasil. Silakan coba lagi.' }, { status: 502 });
  }
}
