import { cn } from "@/lib/utils";

type Props = {
	className?: string;
};

export default function FallbackLoader({ className }: Props) {
	return (
		<div
			className={cn(
				"fixed inset-0 z-50 grid place-items-center bg-[#eff3ff]",
				className,
			)}
		>
			<div className="flex flex-col items-center gap-4">
				{/* Ring */}
				<div className="relative w-16 h-16">
					<span className="absolute inset-0 rounded-full border-2 border-[#b44dc9]/30" />
					<span className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#b44dc9] animate-spin" />
				</div>

				{/* Text */}
				<span className="text-sm tracking-widest uppercase text-[#b44dc9] font-medium">
					R
				</span>
			</div>
		</div>
	);
}
