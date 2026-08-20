"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/**
 * Both icons are always in the DOM and swapped with the `dark:` variant, so the
 * server HTML and the first client render agree — no mounted flag, no flash.
 */
export default function ThemeToggle({ className }: { className?: string }) {
	const { resolvedTheme, setTheme } = useTheme();

	return (
		<button
			type="button"
			aria-label="Toggle theme"
			onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
			className={cn(
				"relative grid size-9 cursor-pointer place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground",
				className,
			)}
		>
			<Sun
				size={16}
				className="rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0"
			/>
			<Moon
				size={16}
				className="absolute rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100"
			/>
		</button>
	);
}
