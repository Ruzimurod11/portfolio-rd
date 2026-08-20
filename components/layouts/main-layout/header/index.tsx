"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import ClientTranslate from "@/components/client-translate";
import ThemeToggle from "@/components/common/theme-toggle";
import { navLinks } from "@/constants/contacts";
import { cn } from "@/lib/utils";
import SelectLanguage from "./language-select";

const subscribeToScroll = (onChange: () => void) => {
	window.addEventListener("scroll", onChange, { passive: true });
	return () => window.removeEventListener("scroll", onChange);
};

const Header = () => {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	// closing the menu on navigation is derived state, so it is adjusted during
	// render rather than in an effect (same pattern as the modal provider)
	const [lastPath, setLastPath] = useState(pathname);
	if (lastPath !== pathname) {
		setLastPath(pathname);
		if (isOpen) setIsOpen(false);
	}

	// useSyncExternalStore keeps the SSR value (false) and the first client
	// render in agreement without a mount effect
	const isScrolled = useSyncExternalStore(
		subscribeToScroll,
		() => window.scrollY > 8,
		() => false,
	);

	useEffect(() => {
		if (!isOpen) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setIsOpen(false);
		};

		document.addEventListener("keydown", onKeyDown);
		document.body.style.overflow = "hidden";

		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	return (
		<header
			className={cn(
				"sticky top-0 z-50 w-full transition-colors duration-300",
				isScrolled || isOpen
					? "border-b border-border bg-background/80 backdrop-blur-xl"
					: "border-b border-transparent",
			)}
		>
			<div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 xl:px-0">
				<Link
					href="/"
					className="text-lg font-semibold tracking-tight"
					aria-label="Ruzimurod — home"
				>
					Ruzimurod<span className="text-primary">.</span>
				</Link>

				<nav className="hidden items-center gap-1 md:flex">
					{navLinks.map(({ href, label }) => {
						const isActive = pathname === href;
						return (
							<Link
								key={href}
								href={href}
								className={cn(
									"relative rounded-full px-4 py-2 text-sm transition-colors",
									isActive
										? "text-foreground"
										: "text-muted-foreground hover:text-foreground",
								)}
							>
								{isActive && (
									<motion.span
										layoutId="nav-pill"
										className="absolute inset-0 rounded-full bg-surface-hover ring-1 ring-border"
										transition={{
											type: "spring",
											stiffness: 380,
											damping: 32,
										}}
									/>
								)}
								<span className="relative z-10">
									<ClientTranslate translationKey={label} />
								</span>
							</Link>
						);
					})}
				</nav>

				<div className="flex items-center gap-2">
					<SelectLanguage />
					<ThemeToggle />
					<button
						type="button"
						onClick={() => setIsOpen((open) => !open)}
						aria-label="Toggle menu"
						aria-expanded={isOpen}
						className="grid size-9 cursor-pointer place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground md:hidden"
					>
						{isOpen ? <X size={16} /> : <Menu size={16} />}
					</button>
				</div>
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.nav
						initial={{ opacity: 0, y: -8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
						className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
					>
						<ul className="mx-auto flex max-w-7xl flex-col px-4 py-2">
							{navLinks.map(({ href, label }, index) => (
								<motion.li
									key={href}
									initial={{ opacity: 0, x: -12 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.04 * index, duration: 0.2 }}
								>
									<Link
										href={href}
										onClick={() => setIsOpen(false)}
										className={cn(
											"block border-b border-border py-4 text-base last:border-b-0",
											pathname === href
												? "text-primary"
												: "text-muted-foreground",
										)}
									>
										<ClientTranslate translationKey={label} />
									</Link>
								</motion.li>
							))}
						</ul>
					</motion.nav>
				)}
			</AnimatePresence>
		</header>
	);
};

export default Header;
