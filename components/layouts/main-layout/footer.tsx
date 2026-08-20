import Link from "next/link";
import ClientTranslate from "@/components/client-translate";
import { EMAIL, navLinks, socials } from "@/constants/contacts";

const Footer = () => {
	return (
		<footer className="border-t border-border bg-surface/40">
			<div className="mx-auto w-full max-w-7xl px-4 py-14 xl:px-0">
				<div className="flex flex-col justify-between gap-10 md:flex-row">
					<div className="max-w-sm space-y-3">
						<p className="text-lg font-semibold tracking-tight">
							Ruzimurod<span className="text-primary">.</span>
						</p>
						<p className="text-sm leading-relaxed text-muted-foreground">
							<ClientTranslate translationKey="profPortfolio" />
						</p>
						<a
							href={`mailto:${EMAIL}`}
							className="inline-block text-sm text-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
						>
							{EMAIL}
						</a>
					</div>

					<div className="flex gap-14">
						<div className="space-y-4">
							<h2 className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
								<ClientTranslate translationKey="navigation" />
							</h2>
							<ul className="space-y-3 text-sm">
								{navLinks.map(({ href, label }) => (
									<li key={href}>
										<Link
											href={href}
											className="text-muted-foreground transition-colors hover:text-foreground"
										>
											<ClientTranslate translationKey={label} />
										</Link>
									</li>
								))}
							</ul>
						</div>

						<div className="space-y-4">
							<h2 className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
								<ClientTranslate translationKey="socialNetworks" />
							</h2>
							<div className="flex gap-3">
								{socials.map(({ key, label, href, icon: Icon }) => (
									<a
										key={key}
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={label}
										className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
									>
										<Icon size={16} />
									</a>
								))}
							</div>
						</div>
					</div>
				</div>

				<div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
					<p>
						© {new Date().getFullYear()} Ruzimurod.{" "}
						<ClientTranslate translationKey="allRights" />
					</p>
					<p className="font-mono">Next.js · TypeScript · Tailwind CSS</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
