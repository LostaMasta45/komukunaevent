import DeferredImage from './DeferredImage';

export default function PartnerLogos({ partners }: { partners: readonly { name: string; logo: string }[] }) {
    return <section className="py-12 bg-komukuna-dark/50 border-b border-white/10">
        <div className="container mx-auto px-4">
            <h2 className="text-white text-center text-xl font-medium mb-8">Dipercaya oleh Berbagai <span className="text-komukuna-pink font-bold">Instansi & Event Terbaik</span></h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {partners.map(partner => <div key={partner.logo} className="bg-white rounded-xl p-4 w-32 h-20 md:w-40 md:h-24 flex items-center justify-center">
                    <DeferredImage src={partner.logo} alt={`Logo partner ${partner.name}`} width={128} height={80} sizes="128px" className="object-contain w-full h-full" />
                </div>)}
            </div>
        </div>
    </section>;
}
