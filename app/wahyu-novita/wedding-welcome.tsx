'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Heart } from 'lucide-react';
import { WEDDING_EVENT } from './event-config';
import styles from './wedding-welcome.module.css';

type Phase = 'idle' | 'loading' | 'charged' | 'opening' | 'reveal';

// This percentage describes the opening sequence, not the network request.
// Updating these nodes directly keeps the envelope and gallery out of each tick.
function OpeningProgress({ running, onComplete }: { running: boolean; onComplete: () => void }) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!running) return;
    let value = 1;
    const paint = () => {
      if (numberRef.current) numberRef.current.textContent = `${value}%`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${value / 100})`;
      progressRef.current?.setAttribute('aria-valuenow', String(value));
    };
    paint();
    const interval = window.setInterval(() => {
      value += 1;
      paint();
      if (value === 100) {
        window.clearInterval(interval);
        onComplete();
      }
    }, 28);
    return () => window.clearInterval(interval);
  }, [running, onComplete]);

  return (
    <div className={styles.progress}>
      <div className={styles.progressHeading}><span>MEMBUKA CERITA KITA</span><span ref={numberRef} className={styles.percentage} aria-hidden="true">1%</span></div>
      <div ref={progressRef} className={styles.progressTrack} role="progressbar" aria-label="Progres animasi pembuka album" aria-valuemin={1} aria-valuemax={100} aria-valuenow={1}>
        <span ref={barRef} className={styles.progressFill} />
      </div>
    </div>
  );
}

export default function WeddingWelcome({ onEnter, onReveal }: { onEnter: () => void; onReveal: () => void }) {
  const [phase, setPhase] = useState<Phase>('idle');
  const startedRef = useRef(false);
  const enteredRef = useRef(false);
  const revealingRef = useRef(false);
  const letterRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const liningRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const completeProgress = useCallback(() => setPhase('charged'), []);

  const enter = useCallback(() => {
    if (enteredRef.current) return;
    enteredRef.current = true;
    onEnter();
  }, [onEnter]);

  const reveal = useCallback(() => {
    if (revealingRef.current) return;
    revealingRef.current = true;
    startedRef.current = true;
    onReveal();
    setPhase('reveal');
  }, [onReveal]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (phase === 'charged') {
      // Keep 100% visible before the seal or flap starts moving.
      timer = setTimeout(() => setPhase('opening'), 700);
    } else if (phase === 'reveal') {
      timer = setTimeout(enter, 1000);
    }
    return () => { if (timer) clearTimeout(timer); };
  }, [phase, enter, reveal]);

  useEffect(() => {
    if (phase !== 'opening') return;
    let cancelled = false;
    let holdTimer: ReturnType<typeof setTimeout> | undefined;
    const animations: Animation[] = [];
    const play = (element: HTMLElement | null, frames: Keyframe[], duration: number) => {
      if (!element) return Promise.resolve();
      const animation = element.animate(frames, { duration, easing: 'cubic-bezier(.77, 0, .175, 1)', fill: 'forwards' });
      animations.push(animation);
      return animation.finished;
    };

    // Essential storytelling motion uses WAAPI: CSS reduced-motion resets must
    // not skip the requested opening. Await actual finishes, not guessed delays.
    async function openEnvelope() {
      await Promise.all([
        play(sealRef.current, [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(16px)' }], 300),
        play(headingRef.current, [{ opacity: 1 }, { opacity: 0 }], 300),
        play(captionRef.current, [{ opacity: 1 }, { opacity: 0 }], 300),
      ]);
      if (cancelled) return;
      const fold: Keyframe[] = [{ transform: 'perspective(1200px) rotateX(0deg)' }, { transform: 'perspective(1200px) rotateX(180deg)' }];
      await Promise.all([play(flapRef.current, fold, 900), play(liningRef.current, fold, 900)]);
      if (cancelled) return;
      await play(letterRef.current, [{ opacity: 0, transform: 'translateY(0)' }, { opacity: 1, transform: 'translateY(-100%)' }], 1000);
      if (cancelled) return;
      // Give the fully extracted, sharp HTML card time to be read.
      await new Promise<void>((resolve) => { holdTimer = setTimeout(resolve, 1200); });
      if (!cancelled) reveal();
    }

    void openEnvelope().catch(() => {
      // Cancellation is expected on skip/unmount; the skip control stays usable.
    });
    return () => {
      cancelled = true;
      if (holdTimer) clearTimeout(holdTimer);
      // Preserve the final card through the crossfade, including when skipped.
      for (const animation of animations) {
        const target = (animation.effect as KeyframeEffect | null)?.target;
        if (animation.playState === 'finished' && target instanceof HTMLElement && target.isConnected) animation.commitStyles();
        animation.cancel();
      }
    };
  }, [phase, reveal]);

  function openLetter() {
    if (startedRef.current || revealingRef.current) return;
    startedRef.current = true;
    setPhase('loading');
  }

  const busy = phase !== 'idle';
  const status = phase === 'charged' ? '100%. Surat cinta siap dibuka.'
    : phase === 'opening' ? 'Untuk setiap senyum yang menjadi kenangan.'
      : phase === 'reveal' ? 'Selamat datang di cerita kami.'
        : phase === 'loading' ? 'Sedikit lagi, cerita kita dimulai.'
          : 'Sebuah album kecil untuk hari yang besar.';

  return (
    <section className={styles.welcome} data-phase={phase} aria-labelledby="welcome-title">
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.ambient} aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
      <span className={styles.cornerTop} aria-hidden="true" />
      <span className={styles.cornerBottom} aria-hidden="true" />
      <div className={styles.topline}><span>A LITTLE LOVE, SEALED FOR YOU</span><Heart size={14} strokeWidth={1} aria-hidden="true" /></div>
      <button type="button" className={styles.skip} onClick={reveal} disabled={phase === 'reveal'}>Langsung ke album <ArrowRight size={14} aria-hidden="true" /></button>

      <div className={styles.composition}>
        <div className={styles.heading} ref={headingRef}>
          <p className={styles.eyebrow}>THE WEDDING OF</p>
          <h1 id="welcome-title">Wahyu <em>&</em> Novita</h1>
          <p className={styles.subtitle}>Sepucuk cinta, sejuta kenangan.</p>
          <p className={styles.eventDetails}><time dateTime={WEDDING_EVENT.date}>{WEDDING_EVENT.dateLabel}</time><span aria-hidden="true">·</span><span>{WEDDING_EVENT.hashtag}</span></p>
        </div>

        <div className={styles.envelopeScene}>
          <div className={styles.envelopeFloat}>
            <div className={styles.envelopeDrift}>
          <div className={styles.envelope}>
            <div className={styles.shell} aria-hidden="true">
              <div className={styles.envelopeBack} />
              <div className={styles.flapInner} ref={liningRef} />
              <div className={styles.envelopeFront} />
              <div className={styles.flap} ref={flapRef} />
            </div>
            <div className={styles.letter} ref={letterRef} aria-hidden={phase !== 'opening' && phase !== 'reveal'}>
              <Heart size={19} strokeWidth={1} aria-hidden="true" />
              <time className={styles.letterEyebrow} dateTime={WEDDING_EVENT.date}>{WEDDING_EVENT.dateLabel}</time>
              <span className={styles.letterNames}>Wahyu <i>&</i> Novita</span>
              <span className={styles.divider} aria-hidden="true" />
              <p>Setiap senyum punya cerita.<br /><strong className={styles.letterHashtag}>{WEDDING_EVENT.hashtag}</strong></p>
            </div>
            <button type="button" ref={sealRef} className={styles.seal} onClick={openLetter} aria-label="Buka amplop album Wahyu dan Novita" aria-disabled={busy} tabIndex={phase === 'opening' || phase === 'reveal' ? -1 : 0}><span aria-hidden="true">W<i>&</i>N</span></button>
            <div ref={captionRef} className={styles.envelopeCaption} aria-hidden="true"><span>{WEDDING_EVENT.dateLabel}</span><span>Wahyu & Novita</span></div>
          </div>
            </div>
          </div>
          <span className={styles.envelopeShadow} aria-hidden="true" />
        </div>

        <div className={styles.invitation}>
          <p>Untuk kamu, bagian dari hari bahagia kami.</p>
          <button type="button" className={styles.openButton} onClick={openLetter} aria-disabled={busy}>
            {phase === 'charged' ? <Check size={16} aria-hidden="true" /> : <Heart size={15} strokeWidth={1.5} aria-hidden="true" />}
            <span>{phase === 'idle' ? 'Buka Album Kami' : phase === 'loading' ? 'Merangkai kenangan…' : phase === 'charged' ? 'Kenangan siap dibuka' : 'Selamat datang'}</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
          <div className={styles.progressSlot} data-visible={busy} aria-hidden={!busy}>
            <OpeningProgress running={phase === 'loading'} onComplete={completeProgress} />
          </div>
          <span className={styles.hint} role="status" aria-live="polite">{status}</span>
        </div>
      </div>
      <div className={styles.bottomline}>
        <span>WAHYU & NOVITA</span>
        <span>THE MEMORY COLLECTION</span>
      </div>
    </section>
  );
}
