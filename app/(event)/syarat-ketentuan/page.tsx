import PolicyPage from '@/components/komukuna-event/PolicyPage';
import { eventMetadata } from '@/lib/event-site';

export const metadata = eventMetadata('/syarat-ketentuan', 'Syarat & Ketentuan | Komukuna Booth', 'Informasi penggunaan website, konsultasi paket, dan konfirmasi pemesanan layanan Komukuna Booth.');

export default function TermsPage() {
    return <PolicyPage title="Syarat & Ketentuan">
        <p>Website Komukuna Booth menyediakan informasi layanan dan portofolio photobooth serta videobooth 360. Gunakan informasi berikut saat berkonsultasi dengan admin.</p>
        <h2>Informasi layanan dan harga</h2>
        <p>Informasi paket pada website menjadi bahan konsultasi. Konfirmasikan paket, harga, lokasi, durasi, kebutuhan teknis, serta ketersediaan tanggal dengan admin sebelum menyepakati pemesanan.</p>
        <h2>Konsultasi dan pemesanan</h2>
        <p>Mengisi formulir atau membuka WhatsApp merupakan permintaan informasi. Pemesanan mengikuti penawaran dan konfirmasi yang disepakati bersama admin. Ketentuan pembayaran, perubahan jadwal, pembatalan, dan kebutuhan tambahan dibahas dalam penawaran tersebut.</p>
        <h2>Wilayah layanan</h2>
        <p>Wilayah layanan utama adalah Jombang dan Mojokerto. Untuk acara di luar wilayah tersebut, konfirmasikan ketersediaan serta biaya transportasi dengan admin.</p>
        <h2>Penggunaan portofolio</h2>
        <p>Portofolio ditampilkan sebagai referensi hasil layanan. Untuk permintaan penggunaan ulang, peninjauan, atau penghapusan media tertentu, hubungi admin dan sertakan media yang dimaksud.</p>
        <h2>Kontak</h2>
        <p>Hubungi <a className="underline" href="https://wa.me/6283122866975">0831-2286-6975</a> atau <a className="underline" href="mailto:komukuna@gmail.com">komukuna@gmail.com</a> untuk penjelasan dan penawaran layanan.</p>
    </PolicyPage>;
}
