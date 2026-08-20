"use client";

import { MotionConfig } from "framer-motion";
import type React from "react";

// honour prefers-reduced-motion: framer-motion drives transforms in JS, which
// the reduced-motion block in globals.css cannot reach.
export default function MotionProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
