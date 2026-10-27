"use client";

import { useId, useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    { q: 'Apakah butuh space/ruangan yang luas?', a: 'Idealnya kami membutuhkan area kosong ukuran 3x3 meter agar tamu leluasa bergaya dan antrean tetap rapi.' },
    { q: 'Apakah bisa request desain frame/overlay?', a: 'Tentu! Harga paket sudah termasuk jasa desain custom. Anda bisa kirimkan file undangan atau tema acara sebagai referensi.' },
    { q: 'Bagaimana jika durasi acara lebih dari paket?', a: 'Bisa extend (tambah jam) dengan biaya tambahan per jam. Sebaiknya info di awal atau minimal 1 jam sebelum durasi habis.' },
    { q: 'Apakah melayani acara di luar kota?', a: 'Kami melayani Jombang dan Mojokerto. Untuk acara di luar wilayah tersebut, hubungi admin untuk konfirmasi ketersediaan dan biaya transportasi.' },
];

export default function FAQSection() {
    const [open, setOpen] = useState<number | null>(0);
    const id = useId();
    return <section className="py-20 bg-komukuna-dark border-t border-white/10">
        <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12"><h2 className="text-3xl font-bold text-white mb-2">Pertanyaan Umum</h2><p className="text-gray-300 text-sm">Hal-hal teknis yang sering ditanyakan.</p></div>
            <div className="space-y-4">{faqs.map((faq, index) => <div key={faq.q} className="border border-white/10 rounded-xl bg-white/[0.02] overflow-hidden">
                <h3><button type="button" id={`${id}-question-${index}`} aria-expanded={open === index} aria-controls={`${id}-answer-${index}`} onClick={() => setOpen(open === index ? null : index)} className="w-full flex items-center justify-between gap-4 p-5 text-left text-gray-100 font-medium">
                    {faq.q}{open === index ? <Minus size={20} aria-hidden="true" className="shrink-0" /> : <Plus size={20} aria-hidden="true" className="shrink-0" />}
                </button></h3>
                <div id={`${id}-answer-${index}`} role="region" aria-labelledby={`${id}-question-${index}`} hidden={open !== index} className="px-5 pb-5 text-gray-300 text-sm leading-relaxed">{faq.a}</div>
            </div>)}</div>
        </div>
    </section>;
}
