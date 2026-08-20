import ClientTranslate from "@/components/client-translate";
import { cn } from "@/lib/utils";

interface Props {
	/** i18n keys */
	title: string;
	description?: string;
	eyebrow?: string;
	className?: string;
}

/**
 * Deliberately undecorated: a tinted panel behind an inner page header ends up
 * as a hard-edged rectangle the width of the container. Space and type carry it.
 */
export default function PageHeader({
	title,
	description,
	eyebrow,
	className,
}: Props) {
	return (
		<div
			className={cn(
				"border-b border-border pt-20 pb-12 md:pt-28 md:pb-16",
				className,
			)}
		>
			{eyebrow && (
				<p className="mb-5 font-mono text-xs tracking-[0.25em] text-primary uppercase">
					<ClientTranslate translationKey={eyebrow} />
				</p>
			)}
			<h1 className="text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
				<ClientTranslate translationKey={title} />
			</h1>
			{description && (
				<p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
					<ClientTranslate translationKey={description} />
				</p>
			)}
		</div>
	);
}
