"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

interface PartnerLogosProps {
    logos: string[];
}

export default function PartnerLogos({ logos }: PartnerLogosProps) {
    // Create partner objects from filenames for compatibility with existing structure
    // If we only have URLs, we can use them directly or map them
    const partners = logos.map(url => ({
        name: "Partner", // Generic name, or could extract from filename
        logo: url
    }));

    // Duplicate partners for infinite loop
    const doubledPartners = [...partners, ...partners];

    return (
        <section className="py-12 bg-komukuna-dark/50 overflow-hidden border-b border-white/5">
            <div className="container mx-auto px-4 mb-8">
                <div className="text-center">
                    <h3 className="text-white/80 text-lg md:text-xl font-medium tracking-wide">
                        Dipercaya oleh Berbagai <span className="text-komukuna-pink font-bold">Instansi & Event Terbaik</span>
                    </h3>
                </div>
            </div>

            <div className="relative w-full overflow-hidden">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-komukuna-dark to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-komukuna-dark to-transparent pointer-events-none" />

                <motion.div
                    className="flex gap-8 md:gap-12 w-max"
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30, // Adjust speed here
                    }}
                >
                    {doubledPartners.map((partner, index) => (
                        <div
                            key={index} // Index is safe here as it's a display-only list
                            className="bg-white rounded-xl p-4 md:p-5 w-32 h-20 md:w-40 md:h-24 flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300 shrink-0"
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    fill
                                    className="object-contain p-1"
                                />
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
