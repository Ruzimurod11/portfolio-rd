"use client";

import { motion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

/**
 * Cascade primitives. `Stagger` reveals its children one after another once it
 * scrolls into view, `StaggerItem` is one child of that cascade, and
 * `StaggerGroup` carries the cascade through an intermediate wrapper — variants
 * stop propagating at a plain <div>, so a nested grid needs one of these.
 */

// decelerates late; reads smoother than easeOut on longer distances
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item: Variants = {
	hidden: { opacity: 0, y: 24 },
	show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

type Props = {
	children: ReactNode;
	className?: string;
	style?: CSSProperties;
};

export const Stagger = ({ children, className, style }: Props) => (
	<motion.div
		className={className}
		style={style}
		variants={container}
		initial="hidden"
		whileInView="show"
		viewport={{ once: true, amount: 0.15 }}
	>
		{children}
	</motion.div>
);

// no `initial` on purpose — that is what lets the parent's variant reach it
export const StaggerGroup = ({ children, className, style }: Props) => (
	<motion.div className={className} style={style} variants={container}>
		{children}
	</motion.div>
);

export const StaggerItem = ({ children, className, style }: Props) => (
	<motion.div className={className} style={style} variants={item}>
		{children}
	</motion.div>
);
