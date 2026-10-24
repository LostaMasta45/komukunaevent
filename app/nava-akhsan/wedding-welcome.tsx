'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Camera, Check, Heart, Printer } from 'lucide-react';
import BrandLogo from '@/components/branding/BrandLogo';
import { WEDDING_EVENT } from './event-config';
import styles from './wedding-welcome.module.css';

type Phase = 'idle' | 'loading' | 'charged' | 'printing' | 'ready' | 'reveal';

function PrintProgress({ running, complete, onComplete }: { running: boolean; complete: boolean; onComplete: () => void }) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!running) return;
    let percent = 1;
    const paint = () => {
      if (numberRef.current) numberRef.current.textContent = `${percent}%`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${percent / 100})`;
      progressRef.current?.setAttribute('aria-valuenow', String(percent));
    };
    paint();
    const timer = window.setInterval(() => {
      percent = Math.min(100, percent + 1);
      paint();
      if (percent === 100) { window.clearInterval(timer); onComplete(); }
    }, 25);
    return () => window.clearInterval(timer);
  }, [running, onComplete]);
  return <div className={styles.progress} data-visible={running || complete} aria-hidden={!running && !complete}>
    <div className={styles.progressHeading}><span>MENYIAPKAN CETAKAN</span><span ref={numberRef} className={styles.percentage} aria-hidden="true">{complete ? '100%' : '1%'}</span></div>
    <div ref={progressRef} className={styles.progressTrack} role="progressbar" aria-label="Progres animasi cetak photostrip" aria-valuemin={1} aria-valuemax={100} aria-valuenow={complete ? 100 : 1}><span ref={barRef} className={styles.progressFill} style={complete ? { transform: 'scaleX(1)' } : undefined} /></div>
  </div>;
}

function StripFrame({ src, index }: { src?: string; index: number }) {
  const [loadedSource, setLoadedSource] = useState('');
  return <div className={styles.photoFrame}>
    <div className={styles.photoFallback} aria-hidden="true"><Camera size={23} strokeWidth={1} /><span>{['A DAY TO REMEMBER', 'A LITTLE JOY TO KEEP', 'WITH LOVE, ALWAYS'][index]}</span></div>
    {src && <>
      {/* Source CDN thumbnails are shared with the gallery, without another album request. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={`Cuplikan photobooth ${WEDDING_EVENT.names}, foto ${index + 1}`} decoding="async" onLoad={() => setLoadedSource(src)} onError={() => setLoadedSource('')} data-loaded={loadedSource === src} />
    </>}
    <span className={styles.frameNumber} aria-hidden="true">0{index + 1}</span>
  </div>;
}

export default function WeddingWelcome({ photos = [], onEnter, onReveal }: { photos?: string[]; onEnter: () => void; onReveal: () => void }) {
  const [phase, setPhase] = useState<Phase>('idle');
  const stripRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<Phase>('idle');
  const enteredRef = useRef(false);
  const completeProgress = useCallback(() => {
    phaseRef.current = 'charged';
    setPhase('charged');
  }, []);

  const enterImmediately = useCallback(() => {
    if (enteredRef.current) return;
    enteredRef.current = true;
    onReveal();
    onEnter();
  }, [onEnter, onReveal]);

  function activate() {
    if (phaseRef.current !== 'idle' && phaseRef.current !== 'ready') return;
    const next = phaseRef.current === 'ready' ? 'reveal' : 'loading';
    phaseRef.current = next;
    setPhase(next);
  }

  useEffect(() => {
    if (phase !== 'charged') return;
    const timer = window.setTimeout(() => {
      phaseRef.current = 'printing';
      setPhase('printing');
    }, 450);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'printing') return;
    const strip = stripRef.current;
    if (!strip) return;
    let cancelled = false;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finish = () => {
      if (cancelled) return;
      phaseRef.current = 'ready';
      setPhase('ready');
    };
    if (!strip.animate) { finish(); return; }
    const animation = strip.animate(reduced ? [{ opacity: 0 }, { opacity: 1 }] : [
      { transform: 'translateY(-88%) rotate(0deg)' },
      { transform: 'translateY(0%) rotate(-1deg)' },
    ], { duration: reduced ? 150 : 2000, easing: 'cubic-bezier(.77, 0, .175, 1)', fill: 'forwards' });
    void animation.finished.then(finish).catch(() => { if (!cancelled) finish(); });
    return () => { cancelled = true; animation.cancel(); };
  }, [phase]);

  useEffect(() => {
    if (phase !== 'reveal') return;
    onReveal();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cancelled = false;
    const finish = () => {
      if (cancelled || enteredRef.current) return;
      enteredRef.current = true;
      onEnter();
    };
    const scene = sceneRef.current;
    if (!scene?.animate) { finish(); return; }
    const animation = scene.animate(reduced ? [{ opacity: 1 }, { opacity: 0 }] : [
      { transform: 'translateY(0) scale(1)', opacity: 1 },
      { transform: 'translateY(-18px) scale(1.08)', opacity: 0 },
    ], { duration: reduced ? 150 : 600, easing: 'cubic-bezier(.23, 1, .32, 1)', fill: 'forwards' });
    void animation.finished.then(finish).catch(() => { if (!cancelled) finish(); });
    return () => { cancelled = true; animation.cancel(); };
  }, [phase, onReveal, onEnter]);

  const busy = phase !== 'idle' && phase !== 'ready';
  const status = phase === 'loading' ? 'Merangkai senyum dan cerita hari bahagia…'
    : phase === 'charged' ? '100%. Kenanganmu siap dicetak.'
    : phase === 'printing' ? 'Sedang mencetak sepotong kenangan untukmu…'
    : phase === 'ready' ? 'Kenangan siap. Yuk, temukan foto dan senyummu.'
      : phase === 'reveal' ? 'Selamat datang di album Nava & Akhsan.'
        : 'Ketuk tombol atau mesin untuk mencetak kenangan.';

  return <section className={styles.welcome} data-phase={phase} aria-labelledby="welcome-title">
    <span className={styles.cornerTop} aria-hidden="true" />
    <span className={styles.cornerBottom} aria-hidden="true" />
    <div className={styles.topline}><Heart size={13} strokeWidth={1.2} aria-hidden="true" /><span>A LITTLE JOY, PRINTED FOR YOU</span></div>
    <button type="button" className={styles.skip} onClick={enterImmediately}>Langsung ke album<ArrowRight size={14} aria-hidden="true" /></button>

    <div className={styles.composition}>
      <div className={styles.heading}>
        <p className={styles.eyebrow}>THE WEDDING OF</p>
        <h1 id="welcome-title">Nava <em>&</em> Akhsan</h1>
        <p className={styles.subtitle}>Satu hari istimewa. Selembar kenangan.</p>
        <p className={styles.eventDetails}><time dateTime={WEDDING_EVENT.date}>{WEDDING_EVENT.dateLabel}</time><span aria-hidden="true">·</span><span>{WEDDING_EVENT.hashtag}</span></p>
      </div>

      <div className={styles.sceneFloat}>
      <div ref={sceneRef} className={styles.scene}>
        <div className={styles.printWindow}>
          <div ref={stripRef} className={styles.strip} aria-label="Photostrip kenangan Nava dan Akhsan" aria-hidden={phase !== 'ready' && phase !== 'reveal'}>
            <div className={styles.stripPhotos}>{[0, 1, 2].map((index) => <StripFrame key={index} src={photos[index]} index={index} />)}</div>
            <div className={styles.stripFooter}><Heart size={15} strokeWidth={1.3} aria-hidden="true" /><strong>Nava <i>&</i> Akhsan</strong><p className={styles.stripMessage}>Terima kasih sudah hadir,<br />tertawa, dan berfoto<br />bersama kami.</p><span className={styles.stripSignoff}>Setiap senyum punya cerita.</span><time dateTime={WEDDING_EVENT.date}>{WEDDING_EVENT.dateLabel}</time><span>{WEDDING_EVENT.hashtag}</span></div>
          </div>
        </div>
        <button type="button" className={styles.machine} onClick={activate} aria-disabled={busy} aria-label={phase === 'ready' ? 'Temukan fotomu di album' : 'Cetak photostrip kenangan'}>
          <div className={styles.machineTop}><BrandLogo surface="light" className={styles.machineLogo} sizes="64px" /><span className={styles.machineLabel}>THE MEMORY MAKER<span><i className={styles.statusDot} />{phase === 'printing' ? 'PRINTING YOUR MOMENT' : phase === 'ready' ? 'YOUR MOMENT IS READY' : 'READY FOR A LITTLE JOY'}</span></span></div>
          <span className={styles.machineLens} aria-hidden="true"><Camera size={34} strokeWidth={1} /><span>SMILE. LOVE. REMEMBER.</span></span>
          <PrintProgress running={phase === 'loading'} complete={phase === 'charged' || phase === 'printing' || phase === 'ready' || phase === 'reveal'} onComplete={completeProgress} />
          <span className={styles.slot} aria-hidden="true" /><span className={styles.slotLabel} aria-hidden="true">GOOD TIMES, IN PRINT.</span>
        </button>
        <span className={styles.sceneCaption} aria-hidden="true">ONE LITTLE STRIP. A THOUSAND MEMORIES.</span>
      </div>
      </div>

      <div className={styles.invitation}>
        <button type="button" className={styles.openButton} onClick={activate} aria-disabled={busy}>
          {phase === 'ready' ? <Check size={17} aria-hidden="true" /> : <Printer size={17} strokeWidth={1.5} aria-hidden="true" />}
          <span>{phase === 'loading' ? 'Menyiapkan kenangan…' : phase === 'charged' ? 'Siap dicetak…' : phase === 'printing' ? 'Mencetak kenangan…' : phase === 'ready' ? 'Temukan Fotomu' : phase === 'reveal' ? 'Membuka album…' : 'Cetak Kenangan'}</span>
          <ArrowRight className={styles.buttonArrow} size={17} aria-hidden="true" />
        </button>
        <p className={styles.hint} role="status" aria-live="polite">{status}</p>
      </div>
    </div>
    <div className={styles.bottomline}><span>KOMUKUNA BOOTH</span><span>THE MEMORY COLLECTION</span></div>
  </section>;
}
