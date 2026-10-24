# KOMUKUNA — PHOTOBOOTH GALLERY DESIGN SYSTEM

**File:** `design.md`  
**Tema:** Maroon Romance · Timeless Wedding Gallery  
**Versi:** 1.0 · 23 Oktober 2026  
**Target:** Website album, pencarian foto, preview, dan unduh hasil photobooth Komukuna.

> **Design intent:** membawa suasana frame wedding maroon Wahyu & Novita ke website album Komukuna, tanpa mengorbankan kenyamanan melihat foto dan proses download. Ini adalah *tema wedding* yang dapat dipilih per album, **bukan** perubahan permanen identitas warna seluruh Komukuna.

## 1. Acuan dan arah visual

### Referensi yang diberikan

- **Referensi 1 — frame photobooth:** latar burgundy/maroon tua bertekstur lembut; garis melengkung berwarna champagne-gold pada sudut; aksen bintang empat titik di sisi; bingkai foto putih tebal; teks *THE WEDDING OF* berjarak renggang; nama mempelai dalam lettering skrip putih.
- **Referensi 2 — website saat ini:** header brand Komukuna; hero terpusat dengan nama pasangan, tulisan pengantar dan CTA `Temukan fotomu`; section galeri/albums berlatar terang; area daftar foto atau album. Susunan konten dan alur kerja ini dipertahankan, lalu diberi gaya visual baru.
- Foto pada referensi pertama **bukan** untuk dijadikan wallpaper keseluruhan halaman. Gunakan warna dan pattern-nya; foto aktual tetap dimuat dari masing-masing album.
- Screenshot referensi kedua menampilkan contoh album **CIMORY 22-10-2026**, sementara hero menampilkan **Wahyu & Novita**. Jangan hard-code konten contoh berbeda ke album yang sebenarnya: identitas event, judul dan foto harus berasal dari data album aktif.

### Keputusan visual

**Gaya utama:** *Elegant Editorial Wedding*, klasik namun tetap terasa modern.  
**Perbandingan warna halaman:** ±65% ivory/cream, ±25% maroon, ±10% gold/accent. Ini panduan visual, bukan aturan piksel.  
**Distribusi:** header ivory → hero maroon dengan ornamen → transisi ornamental halus → section gallery ivory → footer maroon.  
**Karakter:** tipografi besar dan bernafas, ornament tipis, layout rapi, dan fotografi sebagai elemen utama.

**Hindari:** gold metalik mengkilap/gradient berlebihan, animasi kelap-kelip, ornamen di atas wajah/foto, tekstur berat, card dengan shadow tebal, background serba merah untuk setiap section, atau terlalu banyak font dekoratif.

## 2. Color palette

Nilai di bawah adalah **palet turunan/desain**, bukan klaim sampling warna cetak yang 100% identik. Warna maroon diambil dekat dengan rona background referensi pertama; turunan yang sedikit lebih terang dipakai untuk UI dan state interaktif.

| Nama token | HEX | Peruntukan |
|---|---|---|
| **Wedding Wine / reference** | `#520305` | Arah warna maroon gelap dari referensi |
| **Wine 950** | `#3F0206` | Footer gelap, vignette, lapisan paling pekat |
| **Wine 900** | `#520305` | Dasar hero wedding |
| **Wine 800** | `#5C0A10` | Aksen bayangan hero, header gelap |
| **Wine 700** | `#6A0C12` | **Primary button** di atas ivory |
| **Wine 600** | `#711820` | Primary hover, selected-state alternatif |
| **Champagne** | `#D9BC8E` | Garis hias pada maroon, ornamen dekoratif |
| **Gold muted** | `#CBA679` | Filigree, titik/garis pendukung |
| **Ivory** | `#F9F6F0` | **Background utama** halaman |
| **Porcelain** | `#FFFDFC` | Permukaan card, modal, panel foto |
| **Blush Sand** | `#F5E8DD` | Section alternatif, chip/tabs lembut |
| **Border Sand** | `#E3D6C8` | Garis section, border card/form |
| **Ink** | `#391716` | Heading dan teks utama pada ivory |
| **Body muted** | `#75645F` | Label dan teks sekunder pada ivory |
| **White warm** | `#FFFCF8` | Teks utama/CTA pada maroon |
| **Success** | `#2F684A` | Keberhasilan unduhan (makna status saja) |
| **Danger** | `#A32735` | Pesan kesalahan (makna status saja) |

### Aturan pemakaian

- Hero maroon: heading dan teks utama `#FFFCF8`; hiasan gold `#D9BC8E`.
- Galeri ivory: judul `#391716`, body `#75645F`, tombol primary `#6A0C12` dengan teks `#FFFCF8`.
- Teks kecil di atas gold **dilarang** apabila kontrasnya tidak memadai. Gold hanya untuk garis/pola atau teks aksen berukuran cukup besar pada maroon.
- **Jangan** memakai gold sebagai teks paragraf di atas background ivory karena kontrasnya lemah.
- Primary CTA tampil solid; tombol outline menggunakan border Wine 700, teks Wine 700 dan latar transparan/ivory.
- Semua foto tetap tampil dengan warna aslinya: **tidak** diberi overlay maroon, filter sepia, watermark tambahan, atau color grading oleh tema.

### Semantic tokens dan file pendamping

Token implementasi lengkap ada dalam [`design-tokens.css`](./design-tokens.css). Gunakan semantic variables (`--color-bg`, `--color-primary`, `--color-text`, `--color-hero-bg`, dst.), bukan sebar warna hex sembarangan di setiap komponen.

```css
:root {
  --color-bg: #F9F6F0;
  --color-surface: #FFFDFC;
  --color-text: #391716;
  --color-text-muted: #75645F;
  --color-primary: #6A0C12;
  --color-primary-hover: #711820;
  --color-border: #E3D6C8;
  --color-hero-bg: #520305;
  --color-hero-text: #FFFCF8;
  --color-decoration: #D9BC8E;
}
```

## 3. Tipografi

| Peran | Font rekomendasi | Penggunaan |
|---|---|---|
| Display editorial | **Cormorant Garamond** | Nama pasangan, heading section, kutipan romantis |
| Interface | **DM Sans** | Navigasi, tombol, body, input, label, download states |
| Script opsional | **Great Vibes** | Hanya penanda nama/event khusus, tidak dipakai untuk tombol/body |

**Default lebih aman:** tampilkan `Wahyu & Novita` menggunakan **Cormorant Garamond** berukuran besar untuk keterbacaan tinggi. Skrip seperti pada frame cetak hanya sebagai alternatif aksen nama, maksimal satu elemen per halaman.

| Elemen | Desktop | Mobile | Catatan |
|---|---|---|---|
| Wedding eyebrow | 11–12 px | 10–11 px | Uppercase, tracking `0.28em` |
| Nama pasangan hero | `clamp(56px, 7.2vw, 110px)` | `clamp(45px, 11vw, 68px)` | Line-height 0.95–1.02 |
| Judul section | `clamp(36px, 4vw, 58px)` | `clamp(32px, 8vw, 44px)` | Serif 500 |
| Body | 15–16 px | 14–16 px | Line-height 1.65–1.75 |
| Button | 14–15 px | 14–15 px | Weight 600; tap target min 44 px |
| Metadata/tanggal | 12–13 px | 12 px | Tracking `0.08em` |

- Serif bersifat dekoratif tetapi teks UI tetap menggunakan sans agar jelas di layar kecil.
- Huruf nama pasangan tidak terpotong dan mampu memuat nama panjang; gunakan `overflow-wrap: anywhere` hanya sebagai fallback pada nama ekstrem, bukan pemutus normal.
- Gunakan font-load `font-display: swap`; sertakan fallback (`Georgia`, `system-ui`). Hindari memuat terlalu banyak weight atau font yang tidak dipakai.

## 4. Pattern dan ornament — siap pakai

Pattern disediakan sebagai SVG terpisah di folder [`patterns/`](./patterns/). Semuanya vector, background transparan, tanpa aset raster berukuran besar.

| Aset | Inspirasi | Area penggunaan | Tingkat kehadiran |
|---|---|---|---|
| [`filigree-corner.svg`](./patterns/filigree-corner.svg) | Garis melengkung champagne pada tepi frame | Dua sudut hero, footer opsional | Rendah |
| [`sparkle-rail.svg`](./patterns/sparkle-rail.svg) | Bintang empat titik dan garis vertikal frame | Sisi kiri/kanan hero desktop | Rendah |
| [`botanical-outline.svg`](./patterns/botanical-outline.svg) | Botanical outline dari hero website, diselaraskan ke tema maroon | Bagian luar hero atau transisi galeri | Sangat rendah |
| [`ornamental-divider.svg`](./patterns/ornamental-divider.svg) | Garis emas halus + titik + starburst | Pemisah heading/section | Rendah |
| [`maroon-grain.svg`](./patterns/maroon-grain.svg) | Tekstur kain/kertas maroon dari frame | Overlay background hero/footer | Sangat rendah |

### Penerapan pattern

```css
.wedding-hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: radial-gradient(ellipse at 50% 15%, #69121A 0%, #520305 60%, #3F0206 100%);
  color: #FFFCF8;
}
.wedding-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url('/patterns/maroon-grain.svg') repeat;
  opacity: .30;
  pointer-events: none;
  z-index: -1;
}
.wedding-hero__corner {
  position: absolute;
  width: min(28vw, 350px);
  aspect-ratio: 350 / 220;
  background: url('/patterns/filigree-corner.svg') no-repeat center / contain;
  opacity: .68;
  pointer-events: none;
}
.wedding-hero__corner--tl { top: 0; left: 0; }
.wedding-hero__corner--br { bottom: 0; right: 0; transform: rotate(180deg); }
.wedding-hero__rail {
  position: absolute;
  top: 50%;
  width: 38px;
  height: 238px;
  transform: translateY(-50%);
  background: url('/patterns/sparkle-rail.svg') no-repeat center / contain;
  opacity: .82;
  pointer-events: none;
}
.wedding-hero__rail--left { left: 14px; }
.wedding-hero__rail--right { right: 14px; }
@media (max-width: 767px) {
  .wedding-hero__rail { display: none; }
  .wedding-hero__corner { width: 160px; opacity: .40; }
}
```

**Batas ornament:** dalam satu viewport, gunakan maksimal 2 corner ornaments + 2 side sparkles; botanical outline boleh menggantikan, **bukan menumpuk semua**. Pattern harus diberi `aria-hidden="true"`, tanpa pointer event. Jangan letakkan botanical berdekatan dengan tombol CTA atau text yang membutuhkan kontras bersih.

## 5. Layout halaman: dari screenshot sekarang ke versi baru

### A. Header / brand navigation

**Pertahankan:** logo/wordmark Komukuna di kiri, fungsi `Bagikan album` di kanan.  
**Ubah:** latar `Ivory`, garis bawah `Border Sand`, logo/text `Ink` (gunakan logo asli tanpa recolor yang menurunkan keterbacaan), tombol share sebagai outline maroon atau icon button minimal.

- Tinggi desktop 72–80 px; mobile 64–68 px.
- Header tidak perlu dipenuhi ornament. Saat sticky, gunakan background ivory opak/nyaris opak dan border bawah tipis.
- Tombol share wajib memiliki accessible label dan fungsi tautan native Web Share API **bila tersedia**, dengan fallback salin URL.

### B. Hero wedding / halaman utama album

Susunan berurutan:

1. Eyebrow `THE WEDDING OF` dengan tracking lebar.
2. Nama pasangan besar, contoh `Wahyu & Novita`.
3. Tanggal resmi album, contoh `24 OCTOBER 2026`, plus ornamental divider.
4. Copy singkat: `Satu hari istimewa, seribu kenangan yang tersimpan.`
5. CTA utama **`Temukan Fotomu`** dengan ikon panah bawah; CTA sekunder opsional `Lihat Semua Foto` hanya bila fungsi berbeda secara nyata.
6. Microcopy lembut: `Terima kasih sudah menjadi bagian dari cerita kami.`

**Background hero:** radial-gradient maroon, grain tipis, corner filigree, side sparkle.  
**Judul:** ivory, `&` boleh berwarna champagne.  
**CTA:** ivory solid di hero (`#FFFCF8` + teks `#520305`) agar terlihat tegas; hover cream sedikit lebih gelap.  
**Container:** max-width 1200 px; padding desktop 72–100 px, mobile 44–64 px.  
**Tinggi:** gunakan content-based min-height `clamp(470px, 65vh, 690px)`, bukan fullscreen mutlak.

**Responsive:** pada lebar di bawah 768 px, nama pasangan dibatasi 2 baris sesuai kebutuhan; ornament sisi disembunyikan; CTA full-width hanya jika efektif (maks 320 px); posisi teks tetap terpusat.

### C. Transisi hero ke section galeri

Jangan langsung memotong keras maroon ke gallery: sisipkan ivory dengan jarak lega dan ornamental divider tipis, bukan bentuk gelombang besar. Jika hero dibuat card seperti screenshot sekarang, gunakan radius 20–24 px desktop / 16 px mobile dan beri margin luar di area ivory; pola di dalam card. Jika hero dibuat full-bleed, pakai radius 0 dan pertahankan footer/footer rhythm konsisten. **Pilih satu varian, jangan campur.**

**Rekomendasi:** tetap hero `card-in-container` seperti struktur screenshot, tetapi background card diganti maroon. Ini meminimalkan perubahan layout website.

### D. Intro galeri

Contoh:

- Eyebrow: `OUR LITTLE GALLERY`
- Title: **`Kenangan yang tersimpan.`** (satu kata boleh italic, tanpa mengorbankan kontras)
- Subtitle: `Semua momen photobooth dalam satu album. Temukan, lihat, dan simpan fotomu.`
- Actions: `Buka Album` / `Bagikan` hanya jika diperlukan oleh alur aplikasi.

Pakai ivory sebagai background dan ornament divider setipis mungkin. Heading di kiri pada desktop; pada mobile seluruh content menjadi 1 kolom dengan spacing baik.

### E. Album list dan photo grid

- **Album card:** porcelain surface, border sand 1px, radius 16 px, shadow sangat tipis atau tanpa shadow; thumbnail rasio tetap; title & tanggal jelas; icon arrow minimal.
- **Grid:** desktop 3–4 kolom (tergantung width); tablet 2; mobile 2 untuk thumbnail ringkas atau 1 jika card kaya metadata. Kontainer max-width `1200px`, grid gap 16–24px.
- **Foto photobooth cetak:** **jangan crop file aslinya**. Preview lengkap untuk rasio portrait 4×6, landscape 6×4, ataupun strip: `object-fit: contain;` dengan latar sand netral. Cropping `cover` hanya boleh untuk decorative cover yang jelas bukan preview unduhan.
- Foto harus bisa dipilih dan dibuka dalam lightbox/preview. Unduhan menyimpan berkas original atau versi download yang disiapkan backend, **bukan** tangkapan layar dari DOM.
- Hindari bingkai putih super-tebal pada setiap thumbnail; referensi border putih boleh diterapkan halus: padding 5–8 px pada card terpilih/featured, tidak wajib pada seluruh grid.
- Album metadata (jumlah foto, tanggal, status) diambil dari sistem; jangan menampilkan angka statis atau dummy.

### F. Pencarian, tombol unduh, dan lightbox

- Area filter/search: input porcelain dengan ikon search, border Sand; focus ring maroon **dengan kontras memadai**; placeholder eksplisit, mis. `Cari berdasarkan kode atau nama foto` hanya bila pencarian metadata itu memang tersedia.
- Primary action: `Unduh Foto`; secondary: `Bagikan Foto` (hanya jika endpoint mendukung share); loading: `Menyiapkan unduhan…`.
- Preview/lightbox: backdrop wine gelap `rgba(35, 5, 7, .92)`, photo `object-fit: contain`, toolbar ivory, tombol close besar, navigasi keyboard.
- Foto rasio 4×6 ditampilkan utuh; pan/zoom opsional jika telah ada kemampuan tersebut.
- Jika download gagal, tampilkan notifikasi tindakan yang bisa diulang; jangan menjanjikan download berhasil sebelum proses benar-benar sukses.

### G. Footer

Background Wine 950 atau Wine 900, logo Komukuna kontras, garis tipis champagne, copyright, dan tautan relevan. Opsional satu filigree kecil di sudut. Jangan mengulang 4 ornament besar dari hero.

## 6. Komponen, state, dan interaksi

| Komponen | Default | Hover / focus | Disabled / state |
|---|---|---|---|
| Primary button pada ivory | Wine 700 + warm white | Wine 600 + focus ring | Opacity lebih rendah, cursor disabled |
| Primary button pada maroon | Ivory + wine text | Blush Sand + wine text | Tetap jelas, jangan samakan dengan backdrop |
| Outline button | Wine border/text | Blush Sand fill | Disabled semantic |
| Gallery card | White surface + soft border | Border wine tipis, translateY(-2px) opsional | Skeleton saat loading |
| Input/select | Porcelain + Sand border | Focus ring wine / 2–3px | Error text merah jelas, bukan warna saja |
| Modal/lightbox | Panel porcelain/overlay wine | Focus trap + ESC closes | Restore focus saat tutup |
| Toast sukses | Neutral panel + ikon check/success | — | Tampilkan hanya setelah sukses aktual |

**Motion:** hover 150–220ms ease-out; opening lightbox 180–240ms; tanpa parallax/particle. `prefers-reduced-motion: reduce` harus menonaktifkan transition dan animation tidak esensial.

## 7. Grid, spacing, border, shadows

```text
Container max       1200px
Page padding        64px desktop / 32px tablet / 16–20px mobile
Spacing scale       4, 8, 12, 16, 24, 32, 48, 64, 96
Hero radius         24px desktop / 16px mobile (jika card-in-container)
Album card radius   16px
Input radius        10–12px
Button radius       10–12px (bukan pill berlebihan)
Border              1px solid #E3D6C8
Shadow card         0 6px 24px rgba(57, 23, 22, 0.05)
Button min-height   44px (disarankan 48px untuk CTA utama)
```

### Breakpoints

- **≥1280 px:** hero lebar ±1200, grid maksimal 4 kolom jika foto nyaman terlihat.
- **768–1279 px:** hero container fleksibel; galeri 2–3 kolom.
- **≤767 px:** hero 1 kolom; ornamen diminimalkan; gallery 2 kolom untuk thumbnail sederhana.
- **≤390 px:** kontrol filter stack vertikal; hindari tab yang meluber; nama mempelai bebas wrap, tanpa horizontal overflow.

## 8. Struktur komponen yang direkomendasikan

```text
GalleryPage
├─ SiteHeader
│  ├─ KomukunaBrand
│  └─ ShareAlbumButton
├─ WeddingHero (theme=maroon-romance)
│  ├─ DecorativeCorner ×2 (aria-hidden)
│  ├─ DecorativeSideSparkle ×2 (desktop only, aria-hidden)
│  ├─ EventEyebrow
│  ├─ CoupleNames
│  ├─ EventDate + OrnamentDivider
│  ├─ HeroCopy
│  └─ ScrollToGalleryButton
├─ GallerySection (id=gallery)
│  ├─ SectionHeading
│  ├─ GalleryControls (existing behavior)
│  ├─ AlbumsList | PhotoGrid (existing behavior)
│  ├─ Loading/Empty/Error states
│  └─ Pagination | LoadMore (existing behavior)
├─ PhotoPreviewLightbox
│  └─ Download/Share/Close controls
└─ SiteFooter
```

**Data album:** `coupleNames`, `eventLabel`, `eventDate`, `heroCopy`, `albumTitle`, `photos`, `themeKey` harus berasal dari sumber data yang benar bila sudah didukung aplikasi. Bila struktur backend berbeda, adaptasikan mapping pada UI **tanpa melakukan migrasi backend yang tidak diperlukan**.

### Contoh konfigurasi opsional per event

```ts
const galleryTheme = {
  key: 'maroon-romance',
  accent: 'wine',
  ornaments: ['filigree-corner', 'sparkle-rail', 'ornamental-divider'],
  heroVariant: 'card',
};

// Contoh data event; jangan disimpan sebagai nilai global semua album.
const exampleEvent = {
  coupleNames: 'Wahyu & Novita',
  eventDate: '2026-10-24',
  eventLabel: 'The Wedding Of',
};
```

## 9. Aksesibilitas, responsivitas, dan performa

1. Semua UI teks utama memenuhi WCAG AA (minimal 4.5:1 untuk teks normal; minimal 3:1 untuk teks besar/kontrol relevan). Kombinasi Wine 900 + warm white, dan ivory + ink memiliki kontras sangat tinggi. Champagne pada ivory hanya hiasan.
2. Heading semantik (`h1` = nama event/couple pada halaman album), tombol asli HTML, focus visible, keyboard navigation dan screen reader labels.
3. Icon ornament diberi `aria-hidden="true"`, `pointer-events:none`, tanpa informasi penting hanya melalui ornament/warna.
4. Responsive minimal diuji pada 360, 390, 768, 1024, dan 1440 px. **No horizontal scroll**.
5. SVG ornament dianjurkan dipanggil sebagai file background/cached, tidak sebagai banyak inline SVG besar.
6. `loading="lazy"` dan `decoding="async"` untuk thumbnail di bawah fold; gambar hero/thumbnail pertama dioptimasi sesuai prioritas tampilan. Gunakan thumbnail terpisah dari berkas foto original; jangan mengunduh full-res untuk menampilkan grid.
7. Pertahankan rasio asli foto. Sebelum data image siap, gunakan aspect-ratio/container placeholder untuk meminimalkan CLS.
8. Tes kondisi loading, tidak ada foto, URL album invalid/expired, izin ditolak, error server, dan download gagal. Jangan mengubah kebijakan autentikasi/privasi hanya demi tampilan.
9. Jangan menambahkan external font/logo berbasis URL tanpa memperhatikan lisensi, CSP, dan strategi deploy aplikasi.

## 10. Acceptance checklist untuk implementasi

- [ ] Frame reference diterjemahkan menjadi **maroon + ivory + champagne** tanpa memberi filter pada foto.
- [ ] Header logo Komukuna dan fungsi `Bagikan album` tetap berjalan.
- [ ] Hero memuat nama/tanggal event dari data yang benar, bukan placeholder.
- [ ] CTA `Temukan Fotomu` scroll/focus ke section galeri yang ada.
- [ ] Foto 4×6 / 6×4 / strip terlihat **utuh**, tidak terpotong.
- [ ] Album listing, pencarian, filter, preview, share, dan download yang sudah ada **tetap berfungsi**.
- [ ] 5 SVG pattern tersedia tetapi digunakan hemat, proporsional, dan non-interaktif.
- [ ] Input, link, tombol, modal dan state error memiliki fokus dan kontras jelas.
- [ ] Tampilan diuji pada desktop/tablet/mobile dan long names; tidak ada overflow horizontal.
- [ ] Tidak ada hard-code konten CIMORY/Wahyu di album selain data event yang benar.
- [ ] Tidak ada perubahan API/data/schema tanpa kebutuhan fitur yang sudah disetujui.

## 11. Instruksi implementasi untuk Codex / developer

> Baca dan terapkan `design.md`, `design-tokens.css`, dan semua SVG di folder `patterns/` sebagai acuan visual **Maroon Romance** untuk website link download photobooth Komukuna. Pertahankan struktur, integrasi API, album yang sudah ada, pencarian, preview, share, dan download. Fokus pada frontend UI/UX yang faithful pada referensi: header ivory, hero maroon bercorak filigree tipis, typography editorial, gallery ivory yang bersih, thumbnail tidak crop. Hindari menulis ulang backend. Gunakan komponen reusable, konfigurasi theme yang bisa dipilih per event (jika memang sudah mendukung variasi tema), design tokens, dan responsive styling. Implementasikan terlebih dahulu dan tunjukkan hasil preview; lakukan pemeriksaan build/lint yang relevan tanpa menjalankan seluruh tes besar berulang-ulang. Verifikasi alur share dan download tidak rusak. Jangan hard-code data album demo ke event lainnya.

---

**Prioritas implementasi:** P0 warna/token + hero + photo visibility + CTA; P1 gallery cards + buttons + modal; P2 ornament polish + motion subtle.  
**Kunci kualitas:** foto pengunjung adalah konten utama; maroon menguatkan identitas acara, **bukan** bersaing dengan hasil foto.
