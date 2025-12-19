"use client";
// Force Rebuild


import { motion } from 'framer-motion';
import { Calendar, Star, Users } from 'lucide-react';

const stats = [
    {
        id: 1,
        label: "Event Sukses",
        value: "50+",
        icon: Calendar,
        color: "text-blue-400"
    },
    {
        id: 2,
        label: "Klien Puas",
        value: "98%",
        icon: Star,
        color: "text-yellow-400"
    },
    {
        id: 3,
        label: "Tamu Happy",
        value: "1.000+",
        icon: Users,
        color: "text-pink-400" // Komukuna Pink-ish
    }
];

export default function TrustBar() {
    return (
        <section className="relative z-20 -mt-20 pb-20 pointer-events-none px-4">
            <div className="container mx-auto pointer-events-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="max-w-5xl mx-auto bg-[#0F0F0F]/90 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden p-8 md:p-12"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
                        {stats.map((stat, index) => (
                            <div
                                key={stat.id}
                                className="flex flex-col items-center justify-center text-center p-4 relative group"
                            >
                                <div className="mb-4 p-4 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                                    <stat.icon className={`w-8 h-8 ${stat.color} group-hover:scale-110 transition-transform`} />
                                </div>
                                <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                                    {stat.value}
                                </h3>
                                <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
