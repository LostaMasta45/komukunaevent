'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Heart } from 'lucide-react';
import { WEDDING_EVENT } from './event-config';
import styles from './wedding-welcome.module.css';

type Phase = 'idle' | 'loading' | 'charged' | 'opening' | 'reveal';

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

  const openLetter = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    setPhase('opening');

    if (headingRef.current) headingRef.current.style.opacity = '0';
    if (captionRef.current) captionRef.current.style.opacity = '0';
    if (sealRef.current) {
      sealRef.current.style.transform = 'scale(0.85)';
      sealRef.current.style.opacity = '0';
    }

    window.setTimeout(() => {
      if (flapRef.current) flapRef.current.style.transform = 'perspective(1200px) rotateX(180deg)';
      if (liningRef.current) liningRef.current.style.transform = 'perspective(1200px) rotateX(180deg)';
    }, 180);

    window.setTimeout(() => {
      if (letterRef.current) {
        letterRef.current.style.transform = 'translateY(-55%)';
        letterRef.current.style.opacity = '1';
      }
    }, 650);

    window.setTimeout(() => {
      if (!revealingRef.current) {
        revealingRef.current = true;
        onReveal();
      }
      setPhase('reveal');
    }, 1500);
  }, [onReveal]);

  return (
    <aside className={styles.welcome} aria-label="Sambutan pernikahan Nava & Akhsan">
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.ambient} aria-hidden="true">
        <span /><span /><span /><span /><span /><span />
      </div>
      <span className={styles.cornerTop} aria-hidden="true" />
      <span className={styles.cornerBottom} aria-hidden="true" />
      <div className={styles.topline}><span>OUR HAPPY MOMENTS</span><span>·</span><span>{WEDDING_EVENT.hashtag}</span></div>
      <div className={styles.bottomline}><span>KOMUKUNA BOOTH</span><span>KENANGAN HARI BAHAGIA</span></div>
      <button type="button" className={styles.skip} onClick={enter}>Lewati sambutan<ArrowRight size={14} aria-hidden="true" /></button>

      <div className={styles.composition}>
        <div ref={headingRef} className={styles.heading}>
          <p className={styles.eyebrow}>UNDANGAN MEMBUKA KENANGAN</p>
          <h1>Nava <i>&</i> Akhsan</h1>
          <p className={styles.subtitle}>Our Happy Moments</p>
          <div className={styles.eventDetails}>
            <time dateTime={WEDDING_EVENT.date}>{WEDDING_EVENT.dateLabel}</time>
            <span aria-hidden="true">·</span>
            <span className={styles.letterHashtag}>{WEDDING_EVENT.hashtag}</span>
          </div>
        </div>

        <div className={styles.envelopeScene}>
          <div className={styles.envelopeFloat}>
            <div className={styles.envelopeDrift}>
              <div className={styles.envelope}>
                <div className={styles.shell}>
                  <div className={styles.envelopeBack} />
                  <div ref={liningRef} className={styles.flapInner} />
                  <div ref={letterRef} className={styles.letter}>
                    <Heart size={16} fill="currentColor" aria-hidden="true" />
                    <span className={styles.letterEyebrow}>THE WEDDING OF</span>
                    <strong className={styles.letterNames}>Nava <i>&</i> Akhsan</strong>
                    <span className={styles.divider} aria-hidden="true" />
                    <p>Terima kasih sudah hadir,<br />tertawa, dan berfoto bersama kami.</p>
                  </div>
                  <div className={styles.envelopeFront} />
                  <div ref={flapRef} className={styles.flap} />
                  <button ref={sealRef} type="button" className={styles.seal} onClick={openLetter} aria-label="Buka surat kenangan Nava & Akhsan">
                    <span>N<i>&</i>A</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.action}>
          {phase === 'idle' && (
            <button type="button" className={styles.buttonPrompt} onClick={() => setPhase('loading')}>
              <span>Buka surat kenangan kita</span><ArrowRight size={14} aria-hidden="true" />
            </button>
          )}

          {phase === 'loading' && <OpeningProgress running={true} onComplete={completeProgress} />}

          {phase === 'charged' && (
            <button type="button" className={styles.enter} onClick={openLetter}>
              Ketuk segel untuk membuka<Check size={16} aria-hidden="true" />
            </button>
          )}

          {phase === 'reveal' && (
            <button type="button" className={styles.enter} onClick={enter}>
              Masuk ke galeri foto<ArrowRight size={16} aria-hidden="true" />
            </button>
          )}
        </div>
        <p ref={captionRef} className={styles.footnote}>Ketuk surat untuk membuka seluruh momen photobooth.</p>
      </div>
    </aside>
  );
}
