import BrandLogo from '@/components/branding/BrandLogo';
import { Camera, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black pt-12 pb-32 md:pt-16 md:pb-32 border-t border-white/10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-4 gap-12 md:gap-8 mb-12">

                    <div className="md:col-span-1">
                        <a href="/komukunaevent" aria-label="Komukuna Studio, beranda" className="inline-block mb-4 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-komukuna-pink"><BrandLogo surface="dark" className="!h-28 !w-36" sizes="144px" /></a>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            #MomenSempurna BersamaKomukuna. <br />
                            Kami membantu mengabadikan momen terindah Anda menjadi kenangan fisik dan digital yang abadi.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-white font-bold mb-4">Layanan</h2>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="/komukunaevent#services" className="hover:text-komukuna-pink">Photobooth Unlimited</a></li>
                            <li><a href="/komukunaevent#services" className="hover:text-komukuna-pink">Video Booth 360</a></li>
                            <li><a href="/komukunaevent#usp" className="hover:text-komukuna-pink">Custom Template</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-white font-bold mb-4">Kontak</h2>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex items-center gap-2">
                                <Phone size={16} className="text-komukuna-pink" />
                                <a href="https://wa.me/6283122866975" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">0831-2286-6975</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail size={16} />
                                <a href="mailto:komukuna@gmail.com" className="hover:text-white transition-colors">komukuna@gmail.com</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin size={16} />
                                <a href="https://maps.google.com/?q=Jombang,Indonesia" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Jombang, Indonesia</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-white font-bold mb-4">Ikuti Kami</h2>
                        <div className="flex gap-4">
                            <a href="https://instagram.com/komukunastudio" target="_blank" rel="noopener noreferrer" aria-label="Instagram Komukuna Studio" className="p-3 rounded-full bg-white/5 hover:bg-gradient-to-br hover:from-komukuna-pink hover:to-orange-500 hover:text-white transition-all group">
                                <Instagram size={20} className="text-gray-400 group-hover:text-white" />
                            </a>
                            <a href="https://www.tiktok.com/@komukunastudio" target="_blank" rel="noopener noreferrer" aria-label="TikTok Komukuna Studio" className="p-3 rounded-full bg-white/5 hover:bg-komukuna-purple hover:text-white transition-all group">
                                <Camera size={20} className="text-gray-400 group-hover:text-white" />
                            </a>
                        </div>
                        <p className="text-xs text-gray-400 mt-4">@komukunastudio</p>
                    </div>

                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Komukuna Studio. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="/komukunaevent/kebijakan-privasi" className="hover:text-gray-200">Kebijakan Privasi</a>
                        <a href="/komukunaevent/syarat-ketentuan" className="hover:text-gray-200">Syarat & Ketentuan</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
