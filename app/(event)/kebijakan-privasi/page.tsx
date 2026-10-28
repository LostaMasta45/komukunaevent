import PolicyPage from '@/components/komukuna-event/PolicyPage';
import { eventMetadata } from '@/lib/event-site';

export const metadata = eventMetadata('/kebijakan-privasi', 'Kebijakan Privasi | Komukuna Booth', 'Informasi mengenai formulir kontak, pengalihan ke WhatsApp, dan layanan pihak ketiga pada website Komukuna Booth.');

export default function PrivacyPage() {
    return <PolicyPage title="Kebijakan Privasi">
        <p>Halaman ini menjelaskan alur informasi pada website Komukuna Booth untuk layanan photobooth dan videobooth di Jombang dan Mojokerto.</p>
        <h2>Formulir kontak</h2>
        <p>Formulir menanyakan jenis acara, rencana tanggal acara yang boleh dikosongkan, serta nama panggilan. Isian disiapkan di browser untuk menjadi pesan konsultasi. Formulir ini tidak mengirim isian ke database website.</p>
        <h2>Melanjutkan ke WhatsApp</h2>
        <p>Ketika Anda memilih Hubungi WhatsApp, website membuka WhatsApp dengan detail yang diisi sebagai rancangan pesan. Anda dapat meninjau pesan sebelum mengirimkannya. Percakapan selanjutnya berlangsung melalui WhatsApp dan mengikuti kebijakan layanan tersebut.</p>
        <h2>Preferensi dan layanan pihak ketiga</h2>
        <p>Website dapat membaca preferensi tema yang tersimpan di browser. Gambar dan video tertentu disediakan melalui Cloudinary; permintaan media dapat diteruskan ke penyedia tersebut. Infrastruktur hosting juga dapat memproses informasi teknis permintaan, seperti alamat IP dan jenis browser.</p>
        <h2>Foto dan video portofolio</h2>
        <p>Untuk pertanyaan mengenai foto atau video yang ditampilkan, termasuk permintaan peninjauan atau penghapusan, hubungi admin dengan menyertakan halaman serta media yang dimaksud.</p>
        <h2>Hubungi kami</h2>
        <p>Pertanyaan mengenai penggunaan informasi dapat disampaikan melalui email <a className="underline" href="mailto:komukuna@gmail.com">komukuna@gmail.com</a> atau WhatsApp <a className="underline" href="https://wa.me/6283122866975">0831-2286-6975</a>.</p>
    </PolicyPage>;
}
