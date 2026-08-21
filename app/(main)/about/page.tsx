import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AboutPage from "@/app/_components/about-me/about-page";
import PageHeader from "@/components/common/page-header";
import ScrollReveal from "@/components/common/scroll-reveal";
import Section from "@/components/common/section";
import MainLayout from "@/components/layouts/main-layout";
import ClientTranslate from "@/components/client-translate";
import { experience } from "@/constants/experience";
import { stackGroups } from "@/constants/stack";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations();
	return { title: t("aboutMe") };
}

export default function Page() {
	return (
		<MainLayout className="pb-24">
			<PageHeader
				eyebrow="aboutMe"
				title="roleTitle"
				description="heroPitch"
			/>

			<AboutPage index="01" />

			<ScrollReveal>
				<Section index="02" title="stackTitle" description="stackDesc">
					<div className="space-y-10">
						{stackGroups.map(({ titleKey, items }) => (
							<div key={titleKey}>
								<div className="mb-4 flex items-center gap-4">
									<span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
										<ClientTranslate translationKey={titleKey} />
									</span>
									<span className="h-px flex-1 bg-border" />
								</div>

								<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
									{items.map(({ name, icon: Icon }) => (
										<div
											key={name}
											className="flex flex-col items-center gap-3 rounded-xl border border-border bg-surface p-5 text-center shadow-[var(--shadow-card)] transition-colors hover:border-primary/30 hover:bg-surface-hover"
										>
											<Icon size={26} className="text-muted-foreground" />
											<span className="text-xs font-medium">{name}</span>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</Section>
			</ScrollReveal>

			{/* rendered only once constants/experience.ts is filled in */}
			{experience.length > 0 && (
				<ScrollReveal>
					<Section index="03" title="experience">
						<ol className="relative border-l border-border pl-6">
							{experience.map((item) => (
								<li key={`${item.company}-${item.period}`} className="pb-10 last:pb-0">
									<span className="absolute -left-1.5 size-3 rounded-full border-2 border-background bg-primary" />
									<p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
										{item.period}
									</p>
									<h3 className="mt-2 text-lg font-semibold">{item.role}</h3>
									<p className="text-sm text-primary">{item.company}</p>
									<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
										<ClientTranslate translationKey={item.descriptionKey} />
									</p>
								</li>
							))}
						</ol>
					</Section>
				</ScrollReveal>
			)}
		</MainLayout>
	);
}
