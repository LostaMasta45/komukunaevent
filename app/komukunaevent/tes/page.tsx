import ExperienceStoryTes from "@/components/komukuna-event/ExperienceStoryTes";

export default function ExperienceStoryTestPage() {
    return (
        <div className="min-h-screen bg-black p-8">
            <h1 className="text-3xl font-bold text-white text-center mb-10">
                5 Ide Tampilan Landscape Image
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                <ExperienceStoryTes variant={1} title="1. Polaroid Style (Fun)" />
                <ExperienceStoryTes variant={2} title="2. Split / Magazine (Clean)" />
                <ExperienceStoryTes variant={3} title="3. Floating Glass (Modern)" />
                <ExperienceStoryTes variant={4} title="4. Arch Window (Unique)" />
                <ExperienceStoryTes variant={5} title="5. Motion Pan (Immersive)" />
            </div>
        </div>
    );
}
