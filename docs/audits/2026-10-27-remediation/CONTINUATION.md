# Kelanjutan optimasi 27 Oktober 2026

Target 100 seluruh kategori pada mobile **belum tercapai**. Hasil akhir memakai tiga pengukuran untuk setiap profil, tanpa memilih run terbaik. Desktop konsisten 100 di seluruh kategori.

| Profil | Performance min / median / max | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| Homepage mobile | 97 / 98 / 98 | 100 | 100 | 100 |
| Homepage desktop | 100 / 100 / 100 | 100 | 100 | 100 |
| Portfolio mobile | 98 / 98 / 99 | 100 | 100 | 100 |
| Portfolio desktop | 100 / 100 / 100 | 100 | 100 | 100 |

Seluruh run tanpa runtime error atau peringatan Lighthouse. Runner keluar dengan status 1 karena target median 100 belum terpenuhi, bukan karena proses pengukuran gagal.

## Perubahan pada kelanjutan ini

- Memperbaiki variabel `module` dalam `DeferredFeature` yang menyebabkan build gagal pada aturan lint Next.js.
- Memprioritaskan gambar hero dan logo navbar yang terlihat sejak awal.
- Menyaring kandidat `srcset` berdasarkan ukuran viewport, mengikuti pendekatan pemilihan lebar Next.js. Optimizer Next.js tetap dipakai.
- Menghapus pemrosesan konflik kelas pada tombol marketing. Ukuran dan ketebalan teks tetap ditentukan tanpa kelas default yang saling menimpa.
- Menggunakan `React.lazy` untuk modal formulir dan video yang baru dipasang setelah interaksi. Ada pesan status saat modul dimuat.
- Menyimpan keluaran endpoint favicon yang sama sebagai PNG statis dan menghapus pemasangan ulang favicon melalui efek client pada layout marketing.
- Menghilangkan tombol tidak aktif dari preview harga dan menyediakan paket videobooth beserta tautan booking ketika JavaScript dimatikan.

Build melaporkan First Load JS sekitar 112 kB untuk kedua halaman, dibanding sekitar 120 kB pada awal kelanjutan ini. Percobaan `Suspense` untuk konten bawah halaman serta penggantian emoji hero tidak memperbaiki hasil dan sudah dibatalkan. Hasil diagnosis tetap tersimpan dalam folder `diagnostics-*`.

## Hambatan yang tersisa

| Median mobile | Homepage | Portfolio |
|---|---:|---:|
| LCP | 2.394 ms | 2.224 ms |
| TBT | 71 ms | 66 ms |
| Transfer | 213.109 byte | 192.937 byte |
| CLS | 0 | 0 |

Elemen LCP homepage adalah paragraf hero, sedangkan portfolio adalah poster album pertama. Prioritas gambar saja tidak menyelesaikan waktu render. Audit masih menandai JavaScript tidak terpakai dan kode legacy, termasuk runtime framework. Pekerjaan berikutnya perlu menargetkan jalur render awal/hydration; belum ada bukti bahwa pengurangan beberapa kilobyte tambahan akan menghasilkan 100.

## Pemeriksaan dan kondisi pengukuran

- Build production berhasil; pemeriksaan lint dan TypeScript bawaan build selesai.
- Lighthouse 12.8.2, Chrome 155, production server `http://127.0.0.1:4318`, build ID `KCw_UmEb38CZv86i3L5yh`.
- Dua halaman × dua perangkat × tiga run, empat kategori. Throttling dan viewport tetap disalin dari baseline; tidak dilonggarkan untuk menaikkan skor.
- Profil Chrome baru setiap run; cache optimizer server dipertahankan tanpa prewarming oleh runner. Git HEAD pada metadata tidak mencakup perubahan workspace yang belum di-commit.
- Pemeriksaan HTTP terarah memastikan preview harga masih SSR, tidak memiliki tombol mati, fallback videobooth/booking tersedia, favicon statis merespons PNG 200 dengan dimensi 64×64 dan 180×180 yang benar.
- Tidak menjalankan full suite, E2E, atau mengulang audit interaksi browser/modal pada kelanjutan ini. Pemeriksaan HTTP bukan bukti pengujian interaksi modal.
- Belum deploy atau mengukur PageSpeed Insights pada hosting publik. Skor lokal tidak menjamin skor publik maupun data pengguna nyata.

Hasil lengkap: [ringkasan](final-continued/lighthouse-summary.json), [statistik](final-continued/lighthouse-statistics.json), serta HTML/JSON seluruh run dalam folder `final-continued`.
