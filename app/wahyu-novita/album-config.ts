// Ganti tautan ini saat album Wahyu & Novita sudah siap.
export const ALBUM_URL = 'https://fotoshare.co/e/0zqaj5YmjfiCyfQHMIzgd';

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
