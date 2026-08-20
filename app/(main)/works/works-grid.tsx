"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ClientTranslate from "@/components/client-translate";
import ProjectCard from "@/components/common/project-card";
import { projects } from "@/constants/projects";
import { cn } from "@/lib/utils";

const ALL = "all";

// A chip that matches a single project is not a filter, it is a label — and
// eleven of them wrap into four cramped rows on a phone. Only technologies
// shared by at least two projects earn a filter.
const techCounts = projects
	.flatMap((project) => project.tech)
	.reduce<Record<string, number>>((counts, tech) => {
		counts[tech] = (counts[tech] ?? 0) + 1;
		return counts;
	}, {});

const filters = [
	ALL,
	...Object.keys(techCounts).filter((tech) => techCounts[tech] > 1),
];

export default function WorksGrid() {
	const [active, setActive] = useState<string>(ALL);

	const visible =
		active === ALL
			? projects
			: projects.filter((project) => project.tech.includes(active));

	return (
		<div className="pt-12 pb-24">
			{/* one scrolling row on a phone, a wrapping row with real gutters above it */}
			<div className="no-scrollbar max-sm:mask-fade-r -mx-4 mb-10 flex gap-2.5 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:gap-x-3 sm:gap-y-3 sm:overflow-visible sm:px-0">
				{filters.map((filter) => (
					<button
						key={filter}
						type="button"
						onClick={() => setActive(filter)}
						className={cn(
							"shrink-0 cursor-pointer rounded-full border px-4 py-2 font-mono text-xs transition-colors",
							active === filter
								? "border-primary/40 bg-primary/10 text-primary"
								: "border-border bg-surface text-muted-foreground hover:text-foreground",
						)}
					>
						{filter === ALL ? (
							<ClientTranslate translationKey="allFilter" />
						) : (
							filter
						)}
					</button>
				))}
			</div>

			<motion.div
				layout
				className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
			>
				<AnimatePresence mode="popLayout">
					{visible.map((project, index) => (
						<motion.div
							key={project.slug}
							layout
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.96 }}
							transition={{ duration: 0.35, delay: index * 0.05 }}
						>
							<ProjectCard
								project={project}
								className="h-full"
								priority={index < 3}
							/>
						</motion.div>
					))}
				</AnimatePresence>
			</motion.div>
		</div>
	);
}
