'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useDragControls, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Camera, Heart, Mic, Video, X } from 'lucide-react';
import { WEDDING_EVENT } from './event-config';
import styles from './kenang-dulu.module.css';

const SEEN_KEY = 'nava-akhsan:kenang-dulu-prompt:shown';

function MemoryMark() {
  return <div className={styles.memoryMark} aria-hidden="true">
    <span className={styles.photoTile}><Camera size={23} strokeWidth={1.3} /></span>
    <span className={styles.heartTile}><Heart size={30} strokeWidth={1.2} /><span>N <i>&</i> A</span></span>
    <span className={styles.voiceTile}><Mic size={23} strokeWidth={1.3} /></span>
  </div>;
}

function MessageFormats() {
  return <ul className={styles.formats} aria-label="Pilihan ucapan">
    <li><Camera size={14} aria-hidden="true" />Foto</li>
    <li><Video size={14} aria-hidden="true" />Video</li>
    <li><Mic size={14} aria-hidden="true" />Pesan suara</li>
  </ul>;
}

function KenangDialog({ mobile, onDismiss, onVisit }: { mobile: boolean; onDismiss: () => void; onVisit: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const draggedRef = useRef(false);
  const controls = useDragControls();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);

  const closedTransform = reduceMotion ? 'none' : mobile ? 'translateY(100%)' : 'translateY(16px) scale(0.96)';
  const openTransform = reduceMotion ? 'none' : mobile ? 'translateY(0%)' : 'translateY(0px) scale(1)';

  return <dialog ref={dialogRef} className={styles.dialog} aria-labelledby="kenang-title" aria-describedby="kenang-description" onCancel={(event) => { event.preventDefault(); onDismiss(); }}>
    <div className={styles.dialogLayout}>
      <motion.div className={styles.backdrop} aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? .12 : .2 }} onClick={onDismiss} />
      <motion.div className={styles.frame}
        initial={{ opacity: mobile && !reduceMotion ? 1 : 0, transform: closedTransform }}
        animate={{ opacity: 1, transform: openTransform }}
        exit={{ opacity: mobile && !reduceMotion ? 1 : 0, transform: closedTransform, transition: { duration: reduceMotion ? .12 : .2 } }}
        transition={{ duration: reduceMotion ? .12 : .28, ease: mobile ? [.32, .72, 0, 1] : [.23, 1, .32, 1] }}>
        <motion.div className={styles.panel} drag={mobile && !reduceMotion ? 'y' : false} dragControls={controls} dragListener={false}
          dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: .5 }}
          onDragStart={() => { draggedRef.current = true; }}
          onDragEnd={(_, info) => { if (info.offset.y > 80 || info.velocity.y > 600) onDismiss(); }}>
          <button type="button" className={styles.dragHandle} aria-label="Tutup panel ucapan" onPointerDown={(event) => { draggedRef.current = false; if (!reduceMotion) controls.start(event); }} onClick={(event) => { if (event.detail === 0 || !draggedRef.current) onDismiss(); }}><span /></button>
          <button ref={closeRef} type="button" className={styles.close} onClick={onDismiss} aria-label="Tutup ajakan Kenang Dulu"><X size={20} strokeWidth={1.5} /></button>
          <div className={styles.panelScroll}>
            <div className={styles.cover}><span className={styles.coverLabel}>A LITTLE LOVE TO LEAVE</span><MemoryMark /><span className={styles.coverNames}>{WEDDING_EVENT.names}</span></div>
            <div className={styles.panelContent}>
              <span className={styles.eyebrow}>KENANG DULU</span>
              <h2 id="kenang-title">Sudah menyimpan<br /><em>kenanganmu?</em></h2>
              <p id="kenang-description">Sekarang, titipkan kenangan untuk {WEDDING_EVENT.names}. Kirim ucapan lewat foto, video, atau pesan suara.</p>
              <MessageFormats />
              <a className={styles.cta} href={WEDDING_EVENT.kenangDuluUrl} target="_blank" rel="noopener noreferrer" onClick={onVisit}>Titipkan Ucapan<ArrowUpRight size={18} aria-hidden="true" /><span className={styles.srOnly}> di tab baru</span></a>
              <button type="button" className={styles.later} onClick={onDismiss}>Nanti saja</button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </dialog>;
}

export default function KenangDulu({ ready, blocked }: { ready: boolean; blocked: boolean }) {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [visible, setVisible] = useState(true);
  const seenRef = useRef(false);

  const markSeen = useCallback(() => {
    seenRef.current = true;
    try { window.sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* Keep the in-memory limit when storage is unavailable. */ }
  }, []);
  const dismiss = useCallback(() => setOpen(false), []);
  const visit = useCallback(() => { markSeen(); setOpen(false); }, [markSeen]);

  useEffect(() => {
    try { seenRef.current = window.sessionStorage.getItem(SEEN_KEY) === '1'; } catch { /* Use the in-memory limit. */ }
    const media = window.matchMedia('(max-width: 767px)');
    const updateMobile = () => setMobile(media.matches);
    const updateVisibility = () => setVisible(document.visibilityState === 'visible');
    updateMobile();
    updateVisibility();
    media.addEventListener('change', updateMobile);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      media.removeEventListener('change', updateMobile);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (blocked) setOpen(false);
  }, [blocked]);

  useEffect(() => {
    if (!ready || blocked || !visible || seenRef.current) return;
    const timer = window.setTimeout(() => {
      if (seenRef.current || document.visibilityState !== 'visible') return;
      markSeen();
      setOpen(true);
    }, 700);
    return () => window.clearTimeout(timer);
  }, [ready, blocked, visible, markSeen]);

  return <>
    <aside className={styles.card} aria-labelledby="kenang-card-title">
      <div className={styles.cardArt}><MemoryMark /></div>
      <div className={styles.cardContent}>
        <span className={styles.eyebrow}>KENANG DULU</span>
        <h2 id="kenang-card-title">Titipkan ucapan untuk<br /><em>{WEDDING_EVENT.names}.</em></h2>
        <p>Foto sudah jadi kenangan. Sekarang, lengkapi hari bahagia mereka dengan ucapan darimu.</p>
        <MessageFormats />
        <a className={styles.cta} href={WEDDING_EVENT.kenangDuluUrl} target="_blank" rel="noopener noreferrer" onClick={visit}>Titipkan Ucapan<ArrowUpRight size={18} aria-hidden="true" /><span className={styles.srOnly}> di tab baru</span></a>
      </div>
    </aside>
    <AnimatePresence>{open && !blocked && <KenangDialog key="kenang-dialog" mobile={mobile} onDismiss={dismiss} onVisit={visit} />}</AnimatePresence>
  </>;
}
