import { getAlbum } from '@/app/wahyu-novita/album-source';

export async function GET() {
  try {
    return Response.json(await getAlbum());
  } catch {
    return Response.json({ error: 'Album belum bisa dimuat. Silakan coba lagi.' }, { status: 502 });
  }
}
