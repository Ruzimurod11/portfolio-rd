// components/scroll-reveal.tsx
"use client";

import { motion } from "framer-motion";

type Props = {
	children: React.ReactNode;
	direction?: "left" | "right" | "up";
	delay?: number;
	className?: string;
};

// same soft curve as the stagger primitives, so the page feels of a piece
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const variants = {
	left: { hidden: { opacity: 0, x: -80 }, visible: { opacity: 1, x: 0 } },
	right: { hidden: { opacity: 0, x: 80 }, visible: { opacity: 1, x: 0 } },
	up: { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } },
};

const ScrollReveal = ({
	children,
	direction = "up",
	delay = 0,
	className,
}: Props) => {
	return (
		<motion.div
			className={className}
			initial="hidden"
			whileInView="visible"
			// a tall section only ever shows a sliver first, so trigger early
			viewport={{ once: true, amount: 0.05, margin: "0px 0px -10% 0px" }}
			transition={{ duration: 0.7, delay, ease }}
			variants={variants[direction]}
		>
			{children}
		</motion.div>
	);
};

export default ScrollReveal;
