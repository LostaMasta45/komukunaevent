'use client';

import { useEffect, useRef, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import type { SessionMedia } from './album-config';
import styles from './native-album.module.css';

export default function MediaPreview({ media, label, onSize }: {
  media: SessionMedia;
  label: string;
  onSize: (size: { id: string; ratio: number }) => void;
}) {
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [attempt, setAttempt] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const source = media.type === 'video' ? media.original : media.preview;
  // A manual retry must start a new request rather than reuse a stalled one.
  const src = attempt ? `${source}${source.includes('?') ? '&' : '?'}_retry=${attempt}` : source;

  useEffect(() => {
    // Cached media can finish before its load handler is attached.
    const image = imageRef.current;
    const video = videoRef.current;
    if ((image?.complete && image.naturalWidth) || (video && video.readyState >= 1)) {
      setState('ready');
      return;
    }
    const timeout = window.setTimeout(() => {
      setState((current) => current === 'loading' ? 'error' : current);
    }, 15000);
    return () => window.clearTimeout(timeout);
  }, [attempt]);

  return <>
    {/* Show the small CDN image immediately while the full preview loads. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    {state !== 'ready' && <img className={styles.previewPlaceholder} src={media.thumbnail} alt="" aria-hidden="true" />}
    {state === 'error' && <span className={styles.imageStatus} role="alert">Berkas belum dapat ditampilkan.<button type="button" onClick={() => { setState('loading'); setAttempt((value) => value + 1); }}><RefreshCw size={16} />Muat ulang berkas</button></span>}
    {media.type === 'video' ? <video ref={videoRef} key={attempt} src={src} controls playsInline loop preload="metadata" poster={media.thumbnail} onLoadedMetadata={(event) => {
      const video = event.currentTarget;
      if (video.videoWidth && video.videoHeight) onSize({ id: media.id, ratio: video.videoWidth / video.videoHeight });
      setState('ready');
    }} onError={() => setState('error')} aria-label={label} style={{ display: state === 'ready' ? undefined : 'none' }} /> :
      // eslint-disable-next-line @next/next/no-img-element
      <img ref={imageRef} key={attempt} src={src} alt={label} fetchPriority="high" decoding="async" onLoad={(event) => {
        const image = event.currentTarget;
        if (image.naturalWidth && image.naturalHeight) onSize({ id: media.id, ratio: image.naturalWidth / image.naturalHeight });
        setState('ready');
      }} onError={() => setState('error')} style={{ display: state === 'ready' ? undefined : 'none' }} />}
  </>;
}
