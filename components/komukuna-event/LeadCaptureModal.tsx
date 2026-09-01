"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, ChevronRight, Sparkles, Building2, Cake, Image as ImageIcon } from 'lucide-react';

interface LeadCaptureModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const eventTypes = [
    { id: 'wedding', label: 'Wedding', icon: Sparkles },
    { id: 'corporate', label: 'Corporate', icon: Building2 },
    { id: 'birthday', label: 'Birthday/Sweet 17', icon: Cake },
    { id: 'other', label: 'Event Lainnya', icon: ImageIcon },
];

export default function LeadCaptureModal({ isOpen, onClose }: LeadCaptureModalProps) {
    const [step, setStep] = useState(1);
    
    // Form State
    const [eventType, setEventType] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [customerName, setCustomerName] = useState('');

    // Reset when opened
    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setEventType('');
            setEventDate('');
            setCustomerName('');
        }
    }, [isOpen]);

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Format the WhatsApp message
        const text = `Halo Komukuna! Saya ingin tanya pricelist Photobooth.%0A%0A*Detail Event:*%0A- Nama: ${customerName}%0A- Jenis Event: ${eventType}%0A- Rencana Tanggal: ${eventDate || 'Belum pasti'}%0A%0AMohon info ketersediaan jadwal dan harganya ya.`;
        
        // Redirect to WhatsApp
        window.open(`https://wa.me/6283122866975?text=${text}`, '_blank');
        
        // Close modal after a short delay
        setTimeout(() => {
            onClose();
        }, 500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl z-[101] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="relative p-6 border-b border-gray-800 bg-gradient-to-r from-komukuna-pink/10 to-komukuna-yellow/10">
                            <button 
                                onClick={onClose}
                                aria-label="Tutup Modal"
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                            <h3 className="text-xl font-bold text-white mb-1">Cek Ketersediaan Jadwal</h3>
                            <p className="text-sm text-gray-400">Jawab 3 pertanyaan singkat agar kami bisa melayani dengan lebih cepat.</p>
                            
                            {/* Progress Bar */}
                            <div className="flex gap-2 mt-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-1 flex-1 bg-gray-800 rounded-full overflow-hidden">
                                        <motion.div 
                                            className="h-full bg-gradient-to-r from-komukuna-pink to-komukuna-yellow"
                                            initial={{ width: 0 }}
                                            animate={{ width: step >= i ? '100%' : '0%' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <AnimatePresence mode="wait">
                                {step === 1 ? (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h4 className="text-lg font-semibold text-white mb-4">Pilih jenis event kamu:</h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            {eventTypes.map((type) => {
                                                const Icon = type.icon;
                                                const isSelected = eventType === type.label;
                                                return (
                                                    <button
                                                        key={type.id}
                                                        onClick={() => {
                                                            setEventType(type.label);
                                                            setTimeout(handleNext, 300);
                                                        }}
                                                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${
                                                            isSelected 
                                                                ? 'border-komukuna-pink bg-komukuna-pink/10 text-komukuna-pink' 
                                                                : 'border-gray-800 bg-gray-800/50 text-gray-400 hover:border-gray-600 hover:text-white'
                                                        }`}
                                                    >
                                                        <Icon size={24} className="mb-2" />
                                                        <span className="text-sm font-medium">{type.label}</span>
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </motion.div>
                                ) : step === 2 ? (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h4 className="text-lg font-semibold text-white mb-4">Kapan event-nya diadakan?</h4>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                                                <Calendar size={20} />
                                            </div>
                                            <input
                                                type="date"
                                                aria-label="Rencana Tanggal Event"
                                                value={eventDate}
                                                onChange={(e) => setEventDate(e.target.value)}
                                                className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-komukuna-pink focus:ring-1 focus:ring-komukuna-pink transition-colors"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-400 mt-2">*Kosongi jika belum ada tanggal pasti</p>
                                        
                                        <div className="mt-6 flex justify-end">
                                            <button
                                                onClick={handleNext}
                                                className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full font-semibold hover:bg-gray-200 transition-colors"
                                            >
                                                Lanjut <ChevronRight size={18} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        onSubmit={handleSubmit}
                                    >
                                        <h4 className="text-lg font-semibold text-white mb-4">Siapa nama kamu?</h4>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                                                <User size={20} />
                                            </div>
                                            <input
                                                type="text"
                                                required
                                                aria-label="Nama Panggilan"
                                                placeholder="Nama panggilan..."
                                                value={customerName}
                                                onChange={(e) => setCustomerName(e.target.value)}
                                                className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-komukuna-pink focus:ring-1 focus:ring-komukuna-pink transition-colors"
                                            />
                                        </div>
                                        
                                        <div className="mt-6 flex flex-col gap-3">
                                            <button
                                                type="submit"
                                                disabled={!customerName}
                                                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 rounded-xl font-bold hover:bg-[#20b857] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Hubungi WhatsApp
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setStep(2)}
                                                className="text-sm text-gray-400 hover:text-white"
                                            >
                                                Kembali
                                            </button>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
