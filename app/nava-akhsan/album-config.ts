export const ALBUM_URL = 'https://fotoshare.co/e/gEp5wvu4yxZnqaxPYpZA-';
export const EMBED_IFRAME = '<iframe allow="web-share" src="https://fotoshare.co/e/gEp5wvu4yxZnqaxPYpZA-?embed=1" style="width:100%;height:100%;border:0;" frameborder="0"></iframe>';

export type SessionMedia = {
  id: string;
  thumbnail: string;
  preview: string;
  original: string;
  sourceUrl: string;
  type: 'image' | 'gif' | 'video';
  label: string;
};

export type AlbumPhoto = {
  id: string;
  thumbnail: string;
  preview: string;
  original: string;
  sourceUrl: string;
  hasSession: boolean;
  items: SessionMedia[];
  sessionComplete: boolean;
};

export type AlbumData = { title: string; photos: AlbumPhoto[] };
