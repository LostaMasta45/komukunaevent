"use client";

import { useEffect, useRef, useState } from 'react';
import AccessibleModal from './AccessibleModal';

const eventTypes = ['Wedding', 'Corporate', 'Birthday/Sweet 17', 'Event Lainnya'];

export default function LeadCaptureModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [step, setStep] = useState(1);
    const [eventType, setEventType] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [customerName, setCustomerName] = useState('');
    const stepRef = useRef<HTMLHeadingElement>(null);
    useEffect(() => {
        if (isOpen) { setStep(1); setEventType(''); setEventDate(''); setCustomerName(''); }
    }, [isOpen]);
    useEffect(() => { if (isOpen && step > 1) stepRef.current?.focus(); }, [step, isOpen]);

    return <AccessibleModal isOpen={isOpen} onClose={onClose} title="Cek Ketersediaan Jadwal" description="Jawab 3 pertanyaan singkat agar kami bisa melayani dengan lebih cepat.">
        <p className="text-sm text-gray-300 mb-4" role="status">Langkah {step} dari 3</p>
        {step === 1 ? <>
            <h3 className="text-lg font-semibold text-white mb-4">Pilih jenis event kamu:</h3>
            <div className="grid grid-cols-2 gap-3">
                {eventTypes.map(type => <button key={type} type="button" onClick={() => { setEventType(type); setStep(2); }} className="min-h-20 rounded-2xl border border-gray-600 bg-gray-800 p-3 text-white font-medium">{type}</button>)}
            </div>
        </> : step === 2 ? <>
            <h3 ref={stepRef} tabIndex={-1} className="text-lg font-semibold text-white mb-4">Kapan event-nya diadakan?</h3>
            <label htmlFor="lead-event-date" className="block text-sm text-gray-200 mb-2">Rencana tanggal event</label>
            <input id="lead-event-date" type="date" value={eventDate} onChange={event => setEventDate(event.target.value)} className="w-full min-w-0 bg-gray-800 border border-gray-600 text-white rounded-xl p-3" />
            <p className="text-sm text-gray-300 mt-2">Kosongi jika belum ada tanggal pasti.</p>
            <div className="flex justify-between gap-3 mt-6">
                <button type="button" onClick={() => setStep(1)} className="min-h-11 px-4 text-white">Kembali</button>
                <button type="button" onClick={() => setStep(3)} className="min-h-11 rounded-full bg-white text-black px-6 font-semibold">Lanjut</button>
            </div>
        </> : <form onSubmit={event => {
            event.preventDefault();
            if (!customerName.trim()) return;
            const text = `Halo Komukuna! Saya ingin tanya pricelist Photobooth.\n\n*Detail Event:*\n- Nama: ${customerName.trim()}\n- Jenis Event: ${eventType}\n- Rencana Tanggal: ${eventDate || 'Belum pasti'}\n\nMohon info ketersediaan jadwal dan harganya ya.`;
            window.open(`https://wa.me/6283122866975?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
            onClose();
        }}>
            <h3 ref={stepRef} tabIndex={-1} className="text-lg font-semibold text-white mb-4">Siapa nama kamu?</h3>
            <label htmlFor="lead-customer-name" className="block text-sm text-gray-200 mb-2">Nama panggilan</label>
            <input id="lead-customer-name" type="text" required autoComplete="given-name" value={customerName} onChange={event => setCustomerName(event.target.value)} className="w-full bg-gray-800 border border-gray-600 text-white rounded-xl p-3" />
            <button type="submit" disabled={!customerName.trim()} className="mt-6 min-h-11 w-full rounded-xl bg-[#25D366] text-gray-950 py-3 font-bold disabled:opacity-50">Hubungi WhatsApp</button>
            <button type="button" onClick={() => setStep(2)} className="mt-2 min-h-11 w-full text-gray-200">Kembali</button>
            <p className="text-xs text-gray-300 mt-3">Detail event akan diteruskan ke WhatsApp. <a href="/kebijakan-privasi" className="underline">Kebijakan privasi</a></p>
        </form>}
    </AccessibleModal>;
}
