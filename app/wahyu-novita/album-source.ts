import { ALBUM_URL, type AlbumData, type AlbumPhoto, type SessionMedia } from './album-config';

function decode(value: string) {
  return value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

function isMediaUrl(url: URL) {
  return url.protocol === 'https:' && ['cdn-bz-op.fotoshare.co', 'cdn-bz.fotoshare.co', 'fotoshare.s3.us-east-005.backblazeb2.com'].includes(url.hostname);
}

function readSessions(html: string): Record<string, unknown> {
  const marker = /\b(?:let|const|var)\s+sessionImages\s*=\s*/.exec(html);
  if (!marker) return {};
  const start = marker.index + marker[0].length;
  if (html[start] !== '{') return {};
  let depth = 0;
  let quoted = false;
  let escaped = false;
  for (let index = start; index < html.length; index++) {
    const char = html[index];
    if (quoted) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === '"') quoted = false;
    } else if (char === '"') quoted = true;
    else if (char === '{') depth++;
    else if (char === '}' && --depth === 0) {
      try { return JSON.parse(html.slice(start, index + 1)); } catch { return {}; }
    }
  }
  return {};
}

function sessionMedia(value: unknown): SessionMedia | null {
  if (!value || typeof value !== 'object') return null;
  const item = value as Record<string, unknown>;
  if (typeof item.hash !== 'string' || !/^[\w-]+$/.test(item.hash) || typeof item.img !== 'string') return null;
  try {
    const original = new URL(item.img);
    const thumbnail = new URL(typeof item.thumb_url === 'string' ? item.thumb_url : item.img);
    if (!isMediaUrl(original) || !isMediaUrl(thumbnail)) return null;
    const extension = original.pathname.split('.').pop()?.toLowerCase();
    const type = extension === 'gif' ? 'gif' : ['mp4', 'webm', 'mov'].includes(extension ?? '') ? 'video' : 'image';
    thumbnail.searchParams.delete('aspect_ratio');
    thumbnail.searchParams.set('width', '240');
    const preview = new URL(original);
    if (type === 'image') {
      preview.hostname = 'cdn-bz-op.fotoshare.co';
      preview.searchParams.set('width', '1400');
    }
    const raw = /\/IMG_[^/]+$/i.test(original.pathname);
    return { id: item.hash, original: original.href, thumbnail: thumbnail.href, preview: preview.href, sourceUrl: `https://fotoshare.co/i/${item.hash}`, type, label: type === 'gif' ? 'GIF' : type === 'video' ? 'Video / animasi' : raw ? 'Foto mentah' : 'Foto berframe' };
  } catch { return null; }
}

function mediaOrder(item: SessionMedia) {
  return item.type === 'gif' ? 2 : item.type === 'video' ? 3 : item.label === 'Foto mentah' ? 0 : 1;
}

// Read public album metadata only; never execute scripts from the source page.
export function parseAlbum(html: string): AlbumData {
  const title = decode(html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? 'Album photobooth');
  const sessions = readSessions(html);
  const originals = new Map<string, string>();
  for (const match of html.matchAll(/https:\/\/cdn-bz\.fotoshare\.co\/[^'"\s<>]+/g)) {
    const url = new URL(decode(match[0]));
    if (isMediaUrl(url)) originals.set(url.pathname, url.href);
  }
  const photos: AlbumPhoto[] = [];
  const seen = new Set<string>();
  for (const match of html.matchAll(/<div\b([^>]*\bdata-hash="[^"]+"[^>]*)>([\s\S]*?)<\/div>/gi)) {
    const attribute = (name: string) => decode(match[1].match(new RegExp(`\\b${name}="([^"]*)"`, 'i'))?.[1] ?? '');
    const id = attribute('data-hash');
    if (!/^[\w-]+$/.test(id) || seen.has(id)) continue;
    try {
      const thumbnail = new URL(attribute('data-thumb'));
      if (!isMediaUrl(thumbnail)) continue;
      thumbnail.searchParams.delete('aspect_ratio');
      thumbnail.searchParams.set('width', '360');
      const preview = new URL(thumbnail);
      preview.searchParams.set('width', '1400');
      const original = originals.get(thumbnail.pathname);
      if (!original) continue;
      const session = sessions[attribute('data-session-id')];
      const sourceItems = session && typeof session === 'object' ? Object.values(session) : [];
      const items = sourceItems.map(sessionMedia).filter((item): item is SessionMedia => item !== null);
      items.sort((a, b) => mediaOrder(a) - mediaOrder(b) || a.original.localeCompare(b.original));
      const hasSession = match[2].includes('session-thumb-overlay');
      const sourceUrl = `https://fotoshare.co/i/${id}`;
      photos.push({ id, thumbnail: thumbnail.href, preview: preview.href, original, sourceUrl, hasSession: hasSession || items.length > 1, items: items.length ? items : [{ id, thumbnail: thumbnail.href, preview: preview.href, original, sourceUrl, type: 'image', label: 'Foto' }], sessionComplete: sourceItems.length > 0 ? items.length === sourceItems.length : !hasSession });
      seen.add(id);
    } catch { /* Skip malformed media without affecting other photos. */ }
  }
  if (!photos.length && !html.includes('id="items"')) throw new Error('Album tidak tersedia.');
  return { title, photos };
}

export async function getAlbum(): Promise<AlbumData> {
  const response = await fetch(ALBUM_URL, { next: { revalidate: 60 }, signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error('Album tidak dapat dimuat.');
  return parseAlbum(await response.text());
}
