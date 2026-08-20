import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Renders its children twice and slides the track by -50%, so the seam lands
 * exactly where the first copy ends. CSS only — no measuring, no JS loop.
 */
export default function Marquee({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div className={cn("mask-fade-x overflow-hidden", className)}>
			<div className="animate-marquee flex w-max gap-4 hover:[animation-play-state:paused]">
				<div className="flex shrink-0 gap-4">{children}</div>
				<div className="flex shrink-0 gap-4" aria-hidden="true">
					{children}
				</div>
			</div>
		</div>
	);
}
