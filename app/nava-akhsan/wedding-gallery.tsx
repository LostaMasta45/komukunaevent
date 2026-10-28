'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Bookmark, Camera, Check, Copy, Download, Heart, House, Image as ImageIcon, Maximize2, MessageCircle, Minimize2, Moon, Share2, Sparkles, Sun, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import NativeAlbum, { type AlbumActivity } from './native-album';
import KenangDulu from './kenang-dulu';
import WeddingWelcome from './wedding-welcome';
import BrandLogo from '@/components/branding/BrandLogo';
import BrandFavicon from '@/components/branding/BrandFavicon';
import { WEDDING_EVENT } from './event-config';
import styles from './wedding-gallery.module.css';

const STUDIO_PATH = '/';
const THEME_STORAGE_KEY = 'nava-akhsan-color-mode';

function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  const label = dark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap';
  return <button type="button" className={styles.themeToggle} onClick={onToggle} aria-label={label} title={label}>
    {dark ? <Sun size={18} strokeWidth={1.5} aria-hidden="true" /> : <Moon size={18} strokeWidth={1.5} aria-hidden="true" />}
  </button>;
}
const BOOKING_URL = `https://wa.me/6283122866975?text=${encodeURIComponent('Halo Komukuna Studio! Saya melihat album Nava & Akhsan dan tertarik booking photobooth atau videobooth untuk acara saya. Boleh minta pilihan paket dan info ketersediaan jadwal?')}`;

export default function WeddingGallery() {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');
  const darkMode = colorMode === 'dark';
  const [welcomeOpen, setWelcomeOpen] = useState(true);
  const [albumRevealing, setAlbumRevealing] = useState(false);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const shareInputRef = useRef<HTMLInputElement>(null);
  const dialogTriggerRef = useRef<HTMLElement | null>(null);
  const [canFullscreen, setCanFullscreen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [savingStudio, setSavingStudio] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [notice, setNotice] = useState('');
  const [activeSection, setActiveSection] = useState<'album' | 'galeri' | null>('album');
  const [albumActivity, setAlbumActivity] = useState<AlbumActivity>({ previewOpen: false, downloading: false });
  const [kenangReady, setKenangReady] = useState(false);
  const handleDownloadReady = useCallback(() => setKenangReady(true), []);
  const handleAlbumActivity = useCallback((activity: AlbumActivity) => {
    setAlbumActivity(activity);
    if (activity.downloading) setKenangReady(false);
  }, []);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(THEME_STORAGE_KEY) === 'dark') setColorMode('dark');
    } catch { /* Keep the default light theme when storage is unavailable. */ }
  }, []);

  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const previous = meta?.content;
    if (meta) meta.content = darkMode ? '#150F03' : '#FAF4E8';
    return () => { if (meta && previous !== undefined) meta.content = previous; };
  }, [darkMode]);

  function toggleColorMode() {
    const nextMode = darkMode ? 'light' : 'dark';
    setColorMode(nextMode);
    try { window.localStorage.setItem(THEME_STORAGE_KEY, nextMode); } catch { /* The toggle also works without storage. */ }
  }

  useEffect(() => {
    if (!welcomeOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
    };
  }, [welcomeOpen]);

  const revealAlbum = useCallback(() => setAlbumRevealing(true), []);

  const enterAlbum = useCallback(() => {
    setWelcomeOpen(false);
    window.requestAnimationFrame(() => {
      heroTitleRef.current?.focus({ preventScroll: true });
    });
  }, []);

  useEffect(() => {
    const gallery = galleryRef.current;
    const hero = heroTitleRef.current?.closest('section');
    if (!gallery || !hero) return;
    let heroVisible = true;
    let galleryVisible = false;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === gallery) galleryVisible = entry.isIntersecting;
        if (entry.target === hero) heroVisible = entry.isIntersecting;
      }
      setActiveSection(galleryVisible ? 'galeri' : heroVisible ? 'album' : null);
    }, { rootMargin: '-15% 0px -35% 0px' });
    observer.observe(gallery);
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setCanFullscreen(Boolean(document.fullscreenEnabled));
    const update = () => setFullscreen(document.fullscreenElement === galleryRef.current);
    document.addEventListener('fullscreenchange', update);
    return () => document.removeEventListener('fullscreenchange', update);
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(''), 5000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  useEffect(() => {
    if (!shareOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    shareInputRef.current?.focus();
    shareInputRef.current?.select();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShareOpen(false);
      if (event.key === 'Tab') {
        const elements = document.querySelectorAll<HTMLElement>('[data-share-dialog] button, [data-share-dialog] input, [data-share-dialog] a[href]');
        const first = elements[0];
        const last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      dialogTriggerRef.current?.focus();
    };
  }, [shareOpen]);

  async function shareAlbum() {
    dialogTriggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setSavingStudio(false);
    const url = window.location.href.split('#')[0];
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Nava & Akhsan — Our Happy Moments', text: `Kenangan pernikahan Nava & Akhsan, ${WEDDING_EVENT.dateLabel}. Temukan dan simpan fotomu. ${WEDDING_EVENT.hashtag}`, url });
        return;
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return;
      }
    }
    setShareUrl(url);
    setCopied(false);
    setShareOpen(true);
  }

  function saveStudio() {
    dialogTriggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setSavingStudio(true);
    setShareUrl(new URL(STUDIO_PATH, window.location.origin).href);
    setCopied(false);
    setShareOpen(true);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch {
      shareInputRef.current?.focus();
      shareInputRef.current?.select();
      setNotice('Pilih dan salin tautan di kolom bagikan.');
    }
  }

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await galleryRef.current?.requestFullscreen();
    } catch {
      setNotice('Layar penuh tidak tersedia. Kamu tetap bisa melihat dan mengunduh foto di galeri ini.');
    }
  }

  return (
    <div className={styles.page} data-gallery-theme="nava-akhsan" data-color-mode={colorMode} id="album-top">
      <BrandFavicon mode={colorMode} />
      {welcomeOpen && <WeddingWelcome onEnter={enterAlbum} onReveal={revealAlbum} colorMode={colorMode} themeControl={<ThemeToggle dark={darkMode} onToggle={toggleColorMode} />} />}
      <div className={styles.albumContent} data-visible={!welcomeOpen || albumRevealing} inert={welcomeOpen} aria-hidden={welcomeOpen || undefined}>
      <a className={styles.skipLink} href="#galeri">Langsung ke galeri foto</a>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Komukuna Event, beranda">
          <BrandLogo surface={darkMode ? 'dark' : 'light'} priority className={styles.headerLogo} sizes="96px" />
        </Link>
        <span className={styles.headerNote}>{WEDDING_EVENT.hashtag}</span>
        <div className={styles.headerActions}>
        <ThemeToggle dark={darkMode} onToggle={toggleColorMode} />
        <button type="button" className={styles.shareButton} onClick={shareAlbum}>
          <Share2 size={15} /><span>Bagikan album</span>
        </button>
        </div>
      </header>

      <main>
        <section id="cerita" className={styles.hero} aria-labelledby="couple-title">
          <span className={styles.cornerTop} aria-hidden="true" />
          <span className={styles.cornerBottom} aria-hidden="true" />
          <span className={styles.railLeft} aria-hidden="true" />
          <span className={styles.railRight} aria-hidden="true" />
          <div className={styles.heroContent}>
            <div className={styles.eyebrow}><span />THE WEDDING OF<span /></div>
            <h1 id="couple-title" className={styles.names} ref={heroTitleRef} tabIndex={-1}>Nava <i>&</i> Akhsan</h1>
            <span className={styles.heroDivider} aria-hidden="true" />
            <div className={styles.eventDetails}><time dateTime={WEDDING_EVENT.date}>{WEDDING_EVENT.dateLabel}</time><span aria-hidden="true">·</span><span>{WEDDING_EVENT.hashtag}</span></div>
            <p className={styles.heroCaption}>Satu hari istimewa,<br />seribu kenangan yang tersimpan.</p>
            <a href="#galeri" className={styles.primaryButton} onClick={() => galleryRef.current?.focus({ preventScroll: true })}>Temukan Fotomu<ArrowDown size={16} aria-hidden="true" /></a>
            <div className={styles.heroFootnote}><Heart size={14} aria-hidden="true" />Terima kasih telah berbagi bahagia.</div>
            <Link href={STUDIO_PATH} className={styles.heroStudioLink}>Diabadikan oleh Komukuna Booth.<span>Kenalan, yuk<ArrowUpRight size={13} aria-hidden="true" /></span></Link>
          </div>
          <span className={styles.heroNumber}>01 / OUR HAPPY MOMENTS</span>
        </section>

        <div className={styles.content}>
          <div className={styles.sectionDivider} aria-hidden="true" />
          <section id="galeri" className={styles.gallerySection} aria-labelledby="gallery-title" ref={galleryRef} tabIndex={-1}>
            <div className={styles.galleryHeading}>
              <div><span className={styles.sectionEyebrow}>OUR LITTLE GALLERY</span><h2 id="gallery-title">Temukan <em>senyummu.</em></h2><p>Pilih sesi, lihat fotomu, lalu unduh.</p></div>
              <div className={styles.galleryActions}>
                {canFullscreen && <button type="button" onClick={toggleFullscreen} className={styles.iconButton} aria-label={fullscreen ? 'Keluar layar penuh' : 'Tampilkan galeri layar penuh'} title={fullscreen ? 'Keluar layar penuh' : 'Layar penuh'}>{fullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}</button>}
              </div>
            </div>
            <NativeAlbum onDownloadReady={handleDownloadReady} onInteractionChange={handleAlbumActivity} />
            <KenangDulu ready={kenangReady} blocked={welcomeOpen || shareOpen || albumActivity.previewOpen || albumActivity.downloading} />
          </section>

          <aside className={styles.discoveryCard} aria-labelledby="discovery-title">
            <div className={styles.discoveryVisual} aria-hidden="true">
              <span className={styles.discoveryVisualLabel}>GOOD PEOPLE. GREAT MEMORIES.</span>
              <div className={styles.discoveryCrowd}><Image src="/komukuna-event/process/exp-crowd.JPG" alt="" fill sizes="(max-width: 767px) 280px, 360px" /></div>
              <div className={styles.discoveryPrint}><div><Image src="/komukuna-event/process/exp-print.jpg" alt="" fill sizes="(max-width: 767px) 140px, 180px" /></div><span>A LITTLE JOY TO KEEP.</span></div>
              <span className={styles.discoveryVisualNote}><Camera size={14} />Cuplikan portofolio Komukuna</span>
              <Sparkles className={styles.discoverySparkle} size={28} strokeWidth={1} />
            </div>
            <div className={styles.discoveryStory}>
              <span className={styles.sectionEyebrow}>BERSAMA KOMUKUNA BOOTH</span>
              <h2 id="discovery-title">Bawa keseruannya<br /><em>ke acaramu.</em></h2>
              <p>Photobooth untuk momen seru dan kenangan yang bisa dibawa pulang.</p>
              <div className={styles.discoveryLinks}>
                <Link href="/portofolio" className={styles.discoveryPortfolio}><Camera size={21} strokeWidth={1.5} aria-hidden="true" /><span><strong>Lihat portofolio</strong><small>Inspirasi dari acara sebelumnya.</small></span><ArrowUpRight size={20} aria-hidden="true" /></Link>
                <Link href={STUDIO_PATH} className={styles.discoveryHome}><Sparkles size={21} strokeWidth={1.5} aria-hidden="true" /><span><strong>Pilihan layanan</strong><small>Temukan booth untuk acaramu.</small></span><ArrowUpRight size={20} aria-hidden="true" /></Link>
              </div>
              <span className={styles.discoverySignoff}>Acara berikutnya, ceritamu.</span>
            </div>
          </aside>

          <section className={styles.guide} aria-label="Cara menikmati album">
            <div className={styles.guideIntro}><span className={styles.sectionEyebrow}>MAKE IT YOURS</span><h2>Momennya milik kita.<br /><em>Kenangannya milikmu.</em></h2></div>
            <ol className={styles.steps}>
              <li><span className={styles.stepNumber}>01</span><div><h3>Temukan senyummu</h3><p>Pilih sesi dan geser untuk melihat foto.</p></div></li>
              <li><span className={styles.stepNumber}>02</span><div><h3>Simpan kenangannya</h3><p>Unduh satu foto atau semua berkas dalam sesimu.</p></div></li>
              <li><span className={styles.stepNumber}>03</span><div><h3>Bagikan bahagianya</h3><p>Kirim tautan album ke temanmu.</p></div></li>
            </ol>
          </section>
          <div className={styles.closing}><Heart size={19} strokeWidth={1.2} /><p>Foto boleh sederhana.<br /><em>Kenangannya luar biasa.</em></p><span>WITH LOVE, NAVA & AKHSAN</span></div>

          <section className={styles.studioCard} aria-labelledby="studio-title">
            <div className={styles.studioStory}>
              <span className={styles.sectionEyebrow}><Sparkles size={13} aria-hidden="true" /> DARI TAMU, JADI TUAN RUMAH</span>
              <h2 id="studio-title">Acara spesialmu,<br /><em>kami abadikan.</em></h2>
              <p>Photobooth dan videobooth untuk pernikahan, ulang tahun, dan acara kantor. Pilih paket sesuai rencanamu.</p>
              <Link href={STUDIO_PATH} className={styles.studioHome}>Lihat pilihan untuk acaramu<ArrowUpRight size={15} aria-hidden="true" /></Link>
            </div>
            <div className={styles.studioActions}>
              <span className={styles.studioPrompt}>Punya rencana acara?</span>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={styles.primaryButton}><MessageCircle size={17} aria-hidden="true" />Tanya paket & jadwal<ArrowUpRight size={15} aria-hidden="true" /><span className={styles.srOnly}> via WhatsApp di tab baru</span></a>
              <p className={styles.bookingNote}>Konsultasikan acaramu lewat WhatsApp.</p>
              <button type="button" className={styles.saveStudioButton} onClick={saveStudio} aria-haspopup="dialog"><Bookmark size={15} aria-hidden="true" />Simpan untuk nanti</button>
              <span className={styles.saveHint}>Simpan kontak untuk rencana berikutnya.</span>
            </div>
          </section>
        </div>
      </main>

      <footer className={styles.footer}><span>{WEDDING_EVENT.hashtag}<span aria-hidden="true">♡</span><time dateTime={WEDDING_EVENT.date}>{WEDDING_EVENT.dateLabel}</time></span><Link href="/" className={styles.footerBrand} aria-label="Captured with love by Komukuna Studio, kunjungi beranda"><span>Captured with love by</span><BrandLogo surface={darkMode ? 'dark' : 'light'} className={styles.footerLogo} sizes="88px" /><ArrowUpRight size={15} aria-hidden="true" /></Link></footer>

      <nav className={styles.mobileNav} aria-label="Navigasi cepat album">
        <a href="#cerita" className={styles.dockItem} data-active={activeSection === 'album' || undefined} aria-current={activeSection === 'album' ? 'location' : undefined} aria-label="Album, kembali ke cerita Nava dan Akhsan" onClick={() => heroTitleRef.current?.focus({ preventScroll: true })}><span className={styles.dockIcon}><Heart size={21} strokeWidth={1.7} aria-hidden="true" /></span><span>Album</span></a>
        <a href="#galeri" className={styles.dockItem} data-active={activeSection === 'galeri' || undefined} aria-current={activeSection === 'galeri' ? 'location' : undefined} onClick={() => galleryRef.current?.focus({ preventScroll: true })}><span className={styles.dockIcon}><ImageIcon size={21} strokeWidth={1.7} aria-hidden="true" /></span><span>Galeri</span></a>
        <Link href={STUDIO_PATH} prefetch={false} className={`${styles.dockItem} ${styles.dockStudio}`} aria-label="Komukuna, buka beranda Komukuna Booth"><span className={styles.dockIcon}><House size={21} strokeWidth={1.7} aria-hidden="true" /></span><span>Komukuna</span></Link>
        <Link href="/portofolio" prefetch={false} className={styles.dockItem} aria-label="Portofolio, lihat karya Komukuna Booth"><span className={styles.dockIcon}><Sparkles size={21} strokeWidth={1.7} aria-hidden="true" /></span><span>Portofolio</span></Link>
        <button type="button" className={styles.dockItem} onClick={shareAlbum} aria-label="Bagikan album Nava dan Akhsan" aria-expanded={shareOpen && !savingStudio}><span className={styles.dockIcon}><Share2 size={21} strokeWidth={1.7} aria-hidden="true" /></span><span>Bagikan</span></button>
      </nav>

      {shareOpen && <div className={styles.modalBackdrop} onClick={(event) => { if (event.target === event.currentTarget) setShareOpen(false); }}>
        <div className={styles.shareDialog} role="dialog" aria-modal="true" aria-labelledby="share-title" aria-describedby="share-description" data-share-dialog>
          <button className={styles.closeButton} type="button" onClick={() => setShareOpen(false)} aria-label={savingStudio ? 'Tutup simpan studio' : 'Tutup bagikan album'}><X size={20} /></button>
          {savingStudio ? <Bookmark size={24} /> : <Share2 size={24} />}
          <h2 id="share-title">{savingStudio ? 'Simpan dulu. Rencanakan nanti.' : 'Bahagia lebih indah dibagi.'}</h2>
          <p id="share-description">{savingStudio ? 'Salin tautan atau simpan kontak Komukuna.' : 'Kirim tautan ini agar semua bisa menemukan fotonya.'}</p>
          <label htmlFor="share-link">{savingStudio ? 'Tautan Komukuna Studio' : 'Tautan album'}</label>
          <input id="share-link" ref={shareInputRef} value={shareUrl} readOnly onFocus={(event) => event.currentTarget.select()} />
          <button type="button" className={styles.primaryButton} onClick={copyLink}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? 'Tautan tersalin' : 'Salin tautan'}</button>
          {savingStudio && <><a href="/komukuna-studio.vcf" download="Komukuna-Studio.vcf" className={styles.contactDownload}><Download size={16} aria-hidden="true" />Unduh kontak studio (.vcf)</a><p className={styles.contactHelp}>Buka file .vcf yang diunduh, lalu pilih simpan atau impor kontak di perangkatmu.</p></>}
          <span className={styles.srOnly} role="status">{copied ? 'Tautan berhasil disalin.' : ''}</span>
        </div>
      </div>}
      <div className={notice ? styles.toast : styles.srOnly} role="status">{notice}</div>
      </div>
    </div>
  );
}
