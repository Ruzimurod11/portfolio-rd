"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import ClientTranslate from "@/components/client-translate";
import { socials } from "@/constants/contacts";

const rise = {
	hidden: { opacity: 0, y: 24 },
	show: { opacity: 1, y: 0 },
};

export default function HeroContent() {
	return (
		<motion.div
			initial="hidden"
			animate="show"
			transition={{ staggerChildren: 0.08 }}
			className="flex flex-col items-start gap-8"
		>
			<motion.span
				variants={rise}
				transition={{ duration: 0.5, ease: "easeOut" }}
				className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-xs text-muted-foreground"
			>
				<span className="animate-pulse-dot size-1.5 rounded-full bg-success" />
				<ClientTranslate translationKey="heroAvailable" />
			</motion.span>

			<div className="space-y-4">
				<motion.p
					variants={rise}
					transition={{ duration: 0.5, ease: "easeOut" }}
					className="font-mono text-sm tracking-[0.25em] text-muted-foreground uppercase"
				>
					Ruzimurod Doniev
				</motion.p>

				<motion.h1
					variants={rise}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className="text-5xl leading-[0.95] font-semibold tracking-[-0.04em] sm:text-7xl lg:text-8xl"
				>
					Fullstack
					<br />
					AI Engineer<span className="text-primary">.</span>
				</motion.h1>
			</div>

			<motion.p
				variants={rise}
				transition={{ duration: 0.5, ease: "easeOut" }}
				className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
			>
				<ClientTranslate translationKey="heroPitch" />
			</motion.p>

			<motion.div
				variants={rise}
				transition={{ duration: 0.5, ease: "easeOut" }}
				className="flex flex-wrap items-center gap-3"
			>
				<Link
					href="/works"
					className="group inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
				>
					<ClientTranslate translationKey="viewProjects" />
					<ArrowRight
						size={16}
						className="transition-transform group-hover:translate-x-0.5"
					/>
				</Link>

				<a
					href="/cv/resume.pdf"
					download="Ruzimurod-Doniev-CV.pdf"
					className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-6 text-sm font-medium transition-colors hover:bg-surface-hover"
				>
					<Download size={16} />
					<ClientTranslate translationKey="downloadCV" />
				</a>

				<div className="ml-1 flex items-center gap-2">
					{socials.map(({ key, label, href, icon: Icon }) => (
						<a
							key={key}
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={label}
							className="grid size-11 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
						>
							<Icon size={16} />
						</a>
					))}
				</div>
			</motion.div>
		</motion.div>
	);
}
