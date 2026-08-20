import type { CSSProperties } from "react";
import Marquee from "@/components/common/marquee";
import Section from "@/components/common/section";
import { Stagger, StaggerItem } from "@/components/common/stagger";
import MainLayout from "@/components/layouts/main-layout";
import { stack } from "@/constants/stack";

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
					<Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
						{stack.map(({ name, icon: Icon, color }) => (
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
				</Section>
			</MainLayout>
		</>
	);
}
