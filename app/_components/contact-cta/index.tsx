import { ArrowUpRight } from "lucide-react";
import ClientTranslate from "@/components/client-translate";
import MainLayout from "@/components/layouts/main-layout";
import { EMAIL, socials } from "@/constants/contacts";

export default function ContactCta() {
	return (
		<MainLayout className="pb-24">
			<div className="relative isolate overflow-hidden rounded-3xl border border-border bg-surface px-6 py-16 text-center shadow-[var(--shadow-card)] sm:px-12">
				<div className="bg-grid mask-fade-edges pointer-events-none absolute inset-0 -z-10 bg-center" />
				<div className="bg-glow pointer-events-none absolute inset-0 -z-10" />

				<h2 className="text-3xl font-semibold sm:text-5xl">
					<ClientTranslate translationKey="ctaTitle" />
				</h2>
				<p className="mx-auto mt-4 max-w-lg text-muted-foreground">
					<ClientTranslate translationKey="ctaText" />
				</p>

				<a
					href={`mailto:${EMAIL}`}
					className="group mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
				>
					{EMAIL}
					<ArrowUpRight
						size={16}
						className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
					/>
				</a>

				<div className="mt-8 flex justify-center gap-3">
					{socials.map(({ key, label, href, icon: Icon }) => (
						<a
							key={key}
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={label}
							className="grid size-11 place-items-center rounded-full border border-border bg-background/50 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
						>
							<Icon size={16} />
						</a>
					))}
				</div>
			</div>
		</MainLayout>
	);
}
