import type { ReactNode } from "react";
import ClientTranslate from "@/components/client-translate";
import { cn } from "@/lib/utils";

interface Props {
	/** two-digit marker shown in mono above the heading, e.g. "01" */
	index?: string;
	/** i18n key */
	title: string;
	/** i18n key */
	description?: string;
	id?: string;
	className?: string;
	headerClassName?: string;
	action?: ReactNode;
	children: ReactNode;
}

export default function Section({
	index,
	title,
	description,
	id,
	className,
	headerClassName,
	action,
	children,
}: Props) {
	return (
		<section id={id} className={cn("py-20 md:py-28", className)}>
			<div
				className={cn(
					"mb-10 flex flex-col gap-4 md:mb-14",
					headerClassName,
				)}
			>
				<div className="flex items-center gap-4">
					{index && (
						<span className="font-mono text-xs tracking-[0.25em] text-primary">
							{index}
						</span>
					)}
					<span className="h-px flex-1 bg-border" />
				</div>

				<div className="flex flex-wrap items-end justify-between gap-4">
					<div className="space-y-3">
						<h2 className="text-3xl font-semibold md:text-4xl">
							<ClientTranslate translationKey={title} />
						</h2>
						{description && (
							<p className="max-w-xl text-muted-foreground">
								<ClientTranslate translationKey={description} />
							</p>
						)}
					</div>
					{action}
				</div>
			</div>

			{children}
		</section>
	);
}
