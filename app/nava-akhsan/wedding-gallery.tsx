'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Bookmark, Camera, Check, Copy, Download, Heart, House, Image as ImageIcon, Maximize2, MessageCircle, Minimize2, Share2, Sparkles, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import NativeAlbum from './native-album';
import WeddingWelcome from './wedding-welcome';
import BrandLogo from '@/components/branding/BrandLogo';
import { WEDDING_EVENT } from './event-config';
import { EMBED_IFRAME } from './album-config';
import styles from './wedding-gallery.module.css';

const STUDIO_PATH = '/komukunaevent';
const BOOKING_URL = `https://wa.me/6283122866975?text=${encodeURIComponent('Halo Komukuna Studio! Saya melihat album Nava & Akhsan dan tertarik booking photobooth atau videobooth untuk acara saya. Boleh minta pilihan paket dan info ketersediaan jadwal?')}`;

export default function WeddingGallery() {
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
  const [viewMode, setViewMode] = useState<'native' | 'embed'>('native');

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
    setCanFullscreen(Boolean(document.fullscreenEnabled));
    const handleFullscreenChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleSync);
    function handleSync() {
      setFullscreen(Boolean(document.fullscreenElement));
    }
  }, []);

  function shareAlbum() {
    dialogTriggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setSavingStudio(false);
    const url = window.location.href;
    setShareUrl(url);
    setCopied(false);
    if (navigator.share) {
      navigator.share({ title: `Nava & Akhsan — ${WEDDING_EVENT.hashtag}`, url }).catch(() => setShareOpen(true));
      return;
    }
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
    <div className={styles.page} data-gallery-theme="nava-akhsan" id="album-top">
      {welcomeOpen && <WeddingWelcome onEnter={enterAlbum} onReveal={revealAlbum} />}
      <div className={styles.albumContent} data-visible={!welcomeOpen || albumRevealing} inert={welcomeOpen} aria-hidden={welcomeOpen || undefined}>
        <a className={styles.skipLink} href="#galeri">Langsung ke galeri foto</a>
        <header className={styles.header}>
          <Link href="/komukunaevent" className={styles.brand} aria-label="Komukuna Event, beranda">
            <BrandLogo surface="dark" priority className={styles.headerLogo} sizes="96px" />
          </Link>
          <span className={styles.headerNote}>{WEDDING_EVENT.hashtag}</span>
          <button type="button" className={styles.shareButton} onClick={shareAlbum}>
            <Share2 size={15} /><span>Bagikan album</span>
          </button>
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
              <div className={styles.heroFootnote}><Heart size={14} aria-hidden="true" />Terima kasih sudah menjadi bagian dari cerita kami.</div>
              <Link href={STUDIO_PATH} className={styles.heroStudioLink}>Di balik senyum ini, ada Komukuna Booth.<span>Kenalan, yuk<ArrowUpRight size={13} aria-hidden="true" /></span></Link>
            </div>
            <span className={styles.heroNumber}>01 / OUR HAPPY MOMENTS</span>
          </section>

          <div className={styles.content}>
            <div className={styles.sectionDivider} aria-hidden="true" />
            <section id="galeri" className={styles.gallerySection} aria-labelledby="gallery-title" ref={galleryRef} tabIndex={-1}>
              <div className={styles.galleryHeading}>
                <div>
                  <span className={styles.sectionEyebrow}>OUR LITTLE GALLERY</span>
                  <h2 id="gallery-title">Kenangan yang <em>tersimpan.</em></h2>
                  <p>Semua momen photobooth dalam satu album.<br />Temukan, lihat, dan simpan fotomu.</p>
                </div>
                <div className={styles.galleryActions}>
                  <div className={styles.viewToggle} role="group" aria-label="Pilihan tampilan galeri">
                    <button type="button" aria-pressed={viewMode === 'native'} onClick={() => setViewMode('native')}>Galeri Komukuna</button>
                    <button type="button" aria-pressed={viewMode === 'embed'} onClick={() => setViewMode('embed')}>Tampilan Embed</button>
                  </div>
                  {canFullscreen && (
                    <button type="button" onClick={toggleFullscreen} className={styles.iconButton} aria-label={fullscreen ? 'Keluar layar penuh' : 'Tampilkan galeri layar penuh'} title={fullscreen ? 'Keluar layar penuh' : 'Layar penuh'}>
                      {fullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                    </button>
                  )}
                </div>
              </div>

              {viewMode === 'native' ? (
                <NativeAlbum />
              ) : (
                <div className={styles.embedFrameWrapper}>
                  <iframe
                    allow="web-share"
                    src="https://fotoshare.co/e/gEp5wvu4yxZnqaxPYpZA-?embed=1"
                    style={{ width: '100%', height: '80vh', minHeight: '650px', border: 0 }}
                    title="Nava & Akhsan Photobooth Embed"
                  />
                </div>
              )}
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
                <span className={styles.sectionEyebrow}>KENANGAN INI, BERSAMA KOMUKUNA BOOTH</span>
                <h2 id="discovery-title">Keseruan hari ini,<br /><em>bisa hadir di acaramu.</em></h2>
                <p>Dari pose spontan sampai foto yang dibawa pulang. Kalau kamu suka momen hari ini, temukan inspirasi untuk perayaanmu berikutnya bersama Komukuna Booth.</p>
                <div className={styles.discoveryLinks}>
                  <Link href="/komukunaevent/portofolio" className={styles.discoveryPortfolio}><Camera size={21} strokeWidth={1.5} aria-hidden="true" /><span><strong>Lihat cerita acara lainnya</strong><small>Jelajahi foto, suasana, dan hasil booth kami.</small></span><ArrowUpRight size={20} aria-hidden="true" /></Link>
                  <Link href={STUDIO_PATH} className={styles.discoveryHome}><Sparkles size={21} strokeWidth={1.5} aria-hidden="true" /><span><strong>Temukan booth yang cocok</strong><small>Kenali layanan dan pilihan Komukuna Booth.</small></span><ArrowUpRight size={20} aria-hidden="true" /></Link>
                </div>
                <span className={styles.discoverySignoff}>Boleh cari inspirasi dulu. Siapa tahu, berikutnya acaramu.</span>
              </div>
            </aside>

            <section className={styles.guide} aria-label="Cara menikmati album">
              <div className={styles.guideIntro}><span className={styles.sectionEyebrow}>MAKE IT YOURS</span><h2>Momennya milik kita.<br /><em>Kenangannya milikmu.</em></h2></div>
              <ol className={styles.steps}>
                <li><span className={styles.stepNumber}>01</span><div><h3>Temukan senyummu</h3><p>Buka sesi fotomu, lalu geser untuk melihat seluruh isinya.</p></div></li>
                <li><span className={styles.stepNumber}>02</span><div><h3>Simpan kenangannya</h3><p>Pilih “Unduh semua sesi ini” untuk mengunduh semua berkas langsung, atau unduh berkas favoritmu saja.</p></div></li>
                <li><span className={styles.stepNumber}>03</span><div><h3>Bagikan bahagianya</h3><p>Kirim tautan album ke teman dan orang tersayang.</p></div></li>
              </ol>
            </section>
            <div className={styles.closing}><Heart size={19} strokeWidth={1.2} /><p>Foto boleh sederhana.<br /><em>Kenangannya luar biasa.</em></p><span>WITH LOVE, NAVA & AKHSAN</span></div>

            <section className={styles.studioCard} aria-labelledby="studio-title">
              <div className={styles.studioStory}>
                <span className={styles.sectionEyebrow}><Sparkles size={13} aria-hidden="true" /> DARI TAMU, JADI TUAN RUMAH</span>
                <h2 id="studio-title">Hari ini ikut merayakan.<br /><em>Besok, kamu yang punya cerita.</em></h2>
                <p>Pernikahan, ulang tahun, atau acara kantor—bawa keseruan photobooth & videobooth ke perayaanmu. Pilih gaya yang kamu suka, lalu ceritakan rencanamu ke Komukuna Booth.</p>
                <Link href={STUDIO_PATH} className={styles.studioHome}>Lihat pilihan untuk acaramu<ArrowUpRight size={15} aria-hidden="true" /></Link>
              </div>
              <div className={styles.studioActions}>
                <span className={styles.studioPrompt}>Punya rencana acara?</span>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={styles.primaryButton}><MessageCircle size={17} aria-hidden="true" />Tanya paket & jadwal<ArrowUpRight size={15} aria-hidden="true" /><span className={styles.srOnly}> via WhatsApp di tab baru</span></a>
                <p className={styles.bookingNote}>Ceritakan idemu lewat WhatsApp.<br />Boleh tanya dulu sebelum memutuskan.</p>
                <button type="button" className={styles.saveStudioButton} onClick={saveStudio} aria-haspopup="dialog"><Bookmark size={15} aria-hidden="true" />Simpan untuk nanti</button>
              </div>
            </section>
          </div>
        </main>

        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerBrand}>
              <Link href="/komukunaevent" aria-label="Komukuna Event, beranda">
                <BrandLogo surface="dark" priority className={styles.footerLogo} sizes="88px" />
              </Link>
              <span>Diabadikan dengan Komukuna Photobooth.</span>
            </div>
            <div className={styles.footerLinks}>
              <Link href={STUDIO_PATH}>Kenali Komukuna Booth</Link>
              <Link href="/komukunaevent/portofolio">Cerita Acara Lainnya</Link>
              <a href="#album-top">Kembali ke atas</a>
            </div>
          </div>
        </footer>

        {shareOpen && (
          <div className={styles.shareOverlay} onClick={(event) => { if (event.target === event.currentTarget) setShareOpen(false); }}>
            <div className={styles.shareDialog} role="dialog" aria-modal="true" aria-labelledby="share-dialog-title">
              <div className={styles.shareHeading}>
                <h3 id="share-dialog-title">{savingStudio ? 'Simpan Kontak Komukuna Studio' : 'Bagikan Album Nava & Akhsan'}</h3>
                <button type="button" onClick={() => setShareOpen(false)} aria-label="Tutup dialog bagikan"><X size={18} /></button>
              </div>
              <p>{savingStudio ? 'Simpan tautan studio atau unduh kartu kontak untuk acaramu berikutnya.' : 'Kirim tautan ini ke keluarga dan teman agar mereka juga bisa menyimpan momennya.'}</p>
              <div className={styles.shareInput}>
                <input ref={shareInputRef} type="text" readOnly value={shareUrl} aria-label="Tautan untuk disalin" />
                <button type="button" onClick={copyLink} className={copied ? styles.copied : undefined}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? 'Tersalin' : 'Salin'}</button>
              </div>
              {notice && <p className={styles.shareNotice} role="status">{notice}</p>}
              {savingStudio && (
                <>
                  <a href="/komukuna-studio.vcf" download="Komukuna-Studio.vcf" className={styles.contactDownload}><Download size={16} aria-hidden="true" />Unduh kontak studio (.vcf)</a>
                  <p className={styles.contactHelp}>Buka file .vcf yang diunduh, lalu pilih simpan atau impor kontak di perangkatmu.</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
