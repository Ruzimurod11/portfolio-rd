import type { CSSProperties } from "react";
import ClientTranslate from "@/components/client-translate";
import Marquee from "@/components/common/marquee";
import Section from "@/components/common/section";
import { Stagger, StaggerItem } from "@/components/common/stagger";
import MainLayout from "@/components/layouts/main-layout";
import { stack, stackGroups } from "@/constants/stack";

export default function Stack() {
	return (
		<>
			{/* full-bleed, so the strip runs edge to edge under the hero */}
			<div className="border-y border-border bg-surface/40 py-5">
				<Marquee>
					{stack.map(({ name, icon: Icon }) => (
						<span
							key={name}
							className="flex items-center gap-2 px-4 font-mono text-sm text-muted-foreground"
						>
							<Icon size={16} />
							{name}
						</span>
					))}
				</Marquee>
			</div>

			<MainLayout>
				<Section index="01" title="stackTitle" description="stackDesc">
					{/* one Stagger per group: a single cascade over the whole
						list would never reach the groups below the fold */}
					<div className="space-y-10">
						{stackGroups.map(({ titleKey, items }) => (
							<div key={titleKey}>
								<div className="mb-4 flex items-center gap-4">
									<span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
										<ClientTranslate translationKey={titleKey} />
									</span>
									<span className="h-px flex-1 bg-border" />
								</div>

								<Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
									{items.map(({ name, icon: Icon, color }) => (
										<StaggerItem
											key={name}
											style={{ "--tech": color } as CSSProperties}
											className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-surface p-5 text-center shadow-[var(--shadow-card)] transition-colors hover:border-primary/30 hover:bg-surface-hover"
										>
											<Icon
												size={26}
												className="text-muted-foreground transition-colors group-hover:text-[var(--tech,var(--foreground))]"
											/>
											<span className="text-xs font-medium">{name}</span>
										</StaggerItem>
									))}
								</Stagger>
							</div>
						))}
					</div>
				</Section>
			</MainLayout>
		</>
	);
}
