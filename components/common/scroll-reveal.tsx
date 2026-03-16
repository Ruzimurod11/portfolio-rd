// components/scroll-reveal.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
	children: React.ReactNode;
	direction?: "left" | "right" | "up";
	delay?: number;
	className?: string;
};

const variants = {
	left: { hidden: { opacity: 0, x: -80 }, visible: { opacity: 1, x: 0 } },
	right: { hidden: { opacity: 0, x: 80 }, visible: { opacity: 1, x: 0 } },
	up: { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } },
};

const ScrollReveal = ({
	children,
	direction = "up",
	delay = 0,
	className,
}: Props) => {
	return (
		<div className={cn("overflow-hidden", className)}>
			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.2 }}
				transition={{ duration: 0.6, delay, ease: "easeOut" }}
				variants={variants[direction]}
			>
				{children}
			</motion.div>
		</div>
	);
};

export default ScrollReveal;
