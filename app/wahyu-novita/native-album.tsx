'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ChevronLeft, ChevronRight, Download, ExternalLink, FileArchive, Images, LoaderCircle, Play, RefreshCw, X } from 'lucide-react';
import { ALBUM_URL, type AlbumData } from './album-config';
import styles from './native-album.module.css';

export default function NativeAlbum() {
  const [album, setAlbum] = useState<AlbumData | null>(null);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [columns, setColumns] = useState<3 | 4>(3);
  const [limit, setLimit] = useState(36);
  const [selected, setSelected] = useState<number | null>(null);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [imageState, setImageState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [mediaSize, setMediaSize] = useState<{ id: string; ratio: number } | null>(null);
  const [downloading, setDownloading] = useState<'file' | 'session' | null>(null);
  const [downloadError, setDownloadError] = useState('');
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchRef = useRef<{ x: number; y: number } | null>(null);
  const downloadController = useRef<AbortController | null>(null);
  const photo = selected === null ? null : album?.photos[selected];
  const media = photo?.items[mediaIndex];
  const mediaCount = photo?.items.length ?? 0;
  const mediaCountRef = useRef(mediaCount);
  mediaCountRef.current = mediaCount;
  const activeThumbRef = useRef<HTMLButtonElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    setError('');
    setAlbum(null);
    fetch('/api/wahyu-novita/album', { signal: controller.signal })
      .then(async (response) => { if (!response.ok) throw new Error(); return response.json() as Promise<AlbumData>; })
      .then(setAlbum)
      .catch(() => { if (!controller.signal.aborted) setError('Album belum bisa dimuat. Coba lagi atau buka album langsung.'); });
    return () => controller.abort();
  }, [attempt]);

  useEffect(() => () => downloadController.current?.abort(), []);

  useEffect(() => {
    downloadController.current?.abort();
    setDownloading(null);
    setImageState('loading');
    setDownloadError('');
    if (photo) triggerRef.current = gridRef.current?.querySelector<HTMLButtonElement>(`[data-session-id="${photo.id}"]`) ?? triggerRef.current;
    // Browsing files within the same session keeps its download running.
  }, [photo]);

  useEffect(() => {
    setImageState('loading');
    activeThumbRef.current?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
  }, [selected, mediaIndex]);

  const previewOpen = selected !== null;
  useEffect(() => {
    if (!previewOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
      if (!(event.target instanceof HTMLVideoElement)) {
        if (event.key === 'ArrowRight') { event.preventDefault(); setMediaIndex((value) => Math.min(mediaCountRef.current - 1, value + 1)); }
        if (event.key === 'ArrowLeft') { event.preventDefault(); setMediaIndex((value) => Math.max(0, value - 1)); }
      }
      if (event.key === 'Tab') {
        const elements = dialogRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], video[controls]');
        const first = elements?.[0];
        const last = elements?.[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', keydown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', keydown);
      triggerRef.current?.focus({ preventScroll: true });
      triggerRef.current?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
    };
  }, [previewOpen]);

  async function downloadPhoto(all = false) {
    if (!photo || !media || downloading) return;
    setDownloading(all ? 'session' : 'file');
    setDownloadError('');
    const controller = new AbortController();
    downloadController.current = controller;
    try {
      const query = all ? 'all=1' : `item=${encodeURIComponent(media.id)}`;
      const response = await fetch(`/api/wahyu-novita/download?id=${encodeURIComponent(photo.id)}&${query}`, { signal: controller.signal });
      if (!response.ok) {
        const failure = await response.json().catch(() => null);
        throw new Error(failure?.error ?? 'Unduhan belum berhasil. Coba lagi atau buka sesi di album asli.');
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = response.headers.get('content-disposition')?.match(/filename="([^"]+)"/)?.[1] ?? `Komukuna-${photo.id}.${all ? 'zip' : 'jpg'}`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (error) {
      if (!controller.signal.aborted) setDownloadError(error instanceof Error ? error.message : 'Unduhan belum berhasil. Coba lagi atau buka sesi di album asli.');
    } finally {
      if (downloadController.current === controller) setDownloading(null);
    }
  }

  function move(direction: number) {
    setMediaIndex((value) => Math.max(0, Math.min(mediaCount - 1, value + direction)));
  }

  function changeSession(direction: number) {
    if (!album || selected === null) return;
    const next = Math.max(0, Math.min(album.photos.length - 1, selected + direction));
    setLimit((value) => Math.max(value, Math.ceil((next + 1) / 36) * 36));
    setMediaIndex(0);
    setSelected(next);
  }

  return <div className={styles.album}>
    <div className={styles.toolbar}>
      <div><span className={styles.label}>KOLEKSI SESI</span><p>{album ? `${album.photos.length} sesi · ketuk untuk lihat semua isinya` : 'Kenanganmu, dalam satu tempat.'}</p></div>
      <div className={styles.density} role="group" aria-label="Jumlah kolom galeri">
        {([3, 4] as const).map((value) => <button key={value} type="button" aria-pressed={columns === value} onClick={() => setColumns(value)} aria-label={`${value} kolom`}>{value}<span> kolom</span></button>)}
      </div>
    </div>
    {!album && !error && <div className={styles.skeletons} data-columns={columns} aria-label="Memuat album" aria-busy="true">{Array.from({ length: 12 }, (_, index) => <div key={index} />)}<span className={styles.srOnly} role="status">Sedang memuat album…</span></div>}
    {error && <div className={styles.empty} role="alert"><Images size={32} /><h3>Momennya belum terbuka.</h3><p>{error}</p><button type="button" onClick={() => setAttempt((value) => value + 1)}><RefreshCw size={16} />Coba lagi</button><a href={ALBUM_URL} target="_blank" rel="noopener noreferrer">Buka album langsung<ExternalLink size={15} /></a></div>}
    {album && album.photos.length === 0 && <div className={styles.empty}><Images size={32} /><h3>Belum ada foto.</h3><p>Momen akan muncul di sini setelah tersedia di album.</p><button type="button" onClick={() => setAttempt((value) => value + 1)}><RefreshCw size={16} />Muat ulang</button></div>}
    {album && <>
      <div ref={gridRef} className={styles.grid} data-columns={columns}>
        {album.photos.slice(0, limit).map((item, index) => <button type="button" className={styles.card} key={item.id} data-session-id={item.id} onClick={(event) => { triggerRef.current = event.currentTarget; setMediaIndex(0); setSelected(index); }} aria-label={`Buka sesi ${index + 1}, ${item.items.length} berkas`} aria-haspopup="dialog">
          {/* Plain img keeps the original aspect ratio and uses the source CDN thumbnail. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.thumbnail} alt={`Momen photobooth ${index + 1}`} loading="lazy" decoding="async" />
          {item.hasSession && <span className={styles.sessionBadge} aria-hidden="true"><Images size={12} />{item.items.length}</span>}
          <span className={styles.photoNumber} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        </button>)}
      </div>
      {limit < album.photos.length && <button type="button" className={styles.loadMore} onClick={() => setLimit((value) => value + 36)}>Lihat sesi lainnya<span>{Math.min(36, album.photos.length - limit)} berikutnya</span></button>}
      {album.photos.length > 0 && <p className={styles.albumNote}>Satu kartu = satu sesi. Buka untuk melihat foto, frame, dan animasi yang tersedia.</p>}
    </>}
    {photo && media && selected !== null && <div className={styles.backdrop} onClick={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
      <div ref={dialogRef} className={styles.preview} style={{ '--media-ratio': mediaSize?.id === media.id ? mediaSize.ratio : 1.5 } as CSSProperties} role="dialog" aria-modal="true" aria-labelledby="photo-title" aria-describedby="photo-help">
        <header className={styles.previewHeader}><div><span className={styles.label}>SEMUA KENANGAN DALAM SESI INI</span><h3 id="photo-title">Sesi {selected + 1} <span>· {mediaCount} berkas</span></h3></div><button type="button" ref={closeRef} onClick={() => setSelected(null)} aria-label="Tutup sesi, kembali ke galeri"><X size={22} /></button></header>
        <div className={styles.sessionSwitch}><button type="button" disabled={!!downloading || selected === 0} onClick={() => changeSession(-1)}><ChevronLeft size={16} />Sesi sebelumnya</button><span>{selected + 1} / {album?.photos.length}</span><button type="button" disabled={!!downloading || selected === (album?.photos.length ?? 0) - 1} onClick={() => changeSession(1)}>Sesi berikutnya<ChevronRight size={16} /></button></div>
        <div className={styles.viewer} onTouchStart={(event) => { if (event.touches.length !== 1 || event.target instanceof HTMLVideoElement) { touchRef.current = null; return; } touchRef.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }} onTouchEnd={(event) => { const start = touchRef.current; touchRef.current = null; if (!start || !event.changedTouches[0]) return; const dx = event.changedTouches[0].clientX - start.x; const dy = event.changedTouches[0].clientY - start.y; if (Math.abs(dx) > 70 && Math.abs(dy) < 50) move(dx < 0 ? 1 : -1); }}>
          {imageState === 'loading' && <span className={styles.imageStatus} role="status"><LoaderCircle size={24} className={styles.spinner} /><span>Memuat berkas…</span></span>}
          {imageState === 'error' && <span className={styles.imageStatus} role="alert">Berkas belum dapat ditampilkan.<a href={media.sourceUrl} target="_blank" rel="noopener noreferrer">Buka di album asli<ExternalLink size={16} /></a></span>}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {media.type === 'video' ? <video key={media.id} src={media.original} controls playsInline loop preload="metadata" onLoadedMetadata={(event) => { const video = event.currentTarget; if (video.videoWidth && video.videoHeight) setMediaSize({ id: media.id, ratio: video.videoWidth / video.videoHeight }); setImageState('ready'); }} onError={() => setImageState('error')} aria-label={`${media.label}, sesi ${selected + 1}`} style={{ opacity: imageState === 'ready' ? 1 : 0 }} /> : <img key={media.id} src={media.preview} alt={`${media.label}, sesi ${selected + 1}, berkas ${mediaIndex + 1}`} onLoad={(event) => { const image = event.currentTarget; if (image.naturalWidth && image.naturalHeight) setMediaSize({ id: media.id, ratio: image.naturalWidth / image.naturalHeight }); setImageState('ready'); }} onError={() => setImageState('error')} style={{ opacity: imageState === 'ready' ? 1 : 0 }} />}
        </div>
        <div className={styles.previewNav}><button type="button" disabled={mediaIndex === 0} onClick={() => move(-1)} aria-label="Berkas sebelumnya dalam sesi ini"><ChevronLeft size={22} /></button><p id="photo-help" aria-live="polite"><strong>{media.label} · {mediaIndex + 1}/{mediaCount}</strong><span>{mediaIndex === mediaCount - 1 ? 'Berkas terakhir dalam sesi ini' : 'Geser untuk melihat isi sesi ini'}</span></p><button type="button" disabled={mediaIndex === mediaCount - 1} onClick={() => move(1)} aria-label="Berkas berikutnya dalam sesi ini"><ChevronRight size={22} /></button></div>
        <div className={styles.filmstrip} role="group" aria-label="Pilih berkas dalam sesi ini">
          {photo.items.map((item, index) => <button type="button" key={item.id} ref={index === mediaIndex ? activeThumbRef : undefined} aria-pressed={index === mediaIndex} aria-label={`${item.label}, berkas ${index + 1} dari ${mediaCount}`} onClick={() => setMediaIndex(index)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.thumbnail} alt="" loading="lazy" decoding="async" />{item.type === 'video' && <Play size={13} aria-hidden="true" />}<span>{item.label === 'Foto mentah' ? `Foto ${index + 1}` : item.type === 'gif' ? 'GIF' : item.type === 'video' ? 'Video' : 'Frame'}</span>
          </button>)}
        </div>
        <footer className={styles.previewFooter}>
          <button className={styles.download} type="button" disabled={!!downloading || !photo.sessionComplete} onClick={() => downloadPhoto(true)}>{downloading === 'session' ? <LoaderCircle size={18} className={styles.spinner} /> : <FileArchive size={18} />}{downloading === 'session' ? 'Menyiapkan ZIP sesi ini…' : `Unduh semua sesi ini (${mediaCount})`}</button>
          <div className={styles.fileActions}><button type="button" disabled={!!downloading} onClick={() => downloadPhoto()}>{downloading === 'file' ? <LoaderCircle size={15} className={styles.spinner} /> : <Download size={15} />}{downloading === 'file' ? 'Menyiapkan…' : 'Unduh berkas ini'}</button><a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer">Buka sesi asli<ExternalLink size={14} /><span className={styles.srOnly}> di tab baru</span></a></div>
          <p className={styles.zipHint} role="status">{downloading === 'session' ? 'Mengumpulkan semua berkas asli. Tunggu sebentar, ya.' : photo.sessionComplete ? 'Semua berkas asli sesi ini dalam satu ZIP.' : 'Isi sesi belum lengkap. Buka sesi asli untuk semua berkas.'}</p>
          {downloadError && <p className={styles.downloadError} role="alert">{downloadError}</p>}
        </footer>
      </div>
    </div>}
  </div>;
}
