import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function Tag({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<span
			className={cn(
				"inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-[11px] tracking-wide text-muted-foreground",
				className,
			)}
		>
			{children}
		</span>
	);
}
