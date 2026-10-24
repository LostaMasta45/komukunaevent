export const ALBUM_URL = 'https://fotoshare.co/e/gkIxT6P9khFR9HhdzP_Np';
export const ALBUM_EMBED_URL = `${ALBUM_URL}?embed=1`;

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
