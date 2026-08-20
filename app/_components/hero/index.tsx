import MainLayout from "@/components/layouts/main-layout";
import HeroContent from "./content";
import HeroCodeCard from "./code-card";

export default function Hero() {
	return (
		<section className="relative isolate overflow-hidden">
			{/* decorative layers — grid texture under a soft accent light */}
			<div className="bg-grid mask-fade-b pointer-events-none absolute inset-0 -z-10" />
			<div className="bg-glow mask-fade-b pointer-events-none absolute inset-0 -z-10" />

			<MainLayout className="flex min-h-[calc(100svh-4rem)] flex-col justify-center py-20">
				<div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
					<HeroContent />
					<HeroCodeCard />
				</div>
			</MainLayout>
		</section>
	);
}
