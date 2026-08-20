"use client"

import { motion, type Variants } from "framer-motion"

interface Token {
    text: string
    className?: string
}

const kw = "text-primary"
const key = "text-info"
const str = "text-success"
const bool = "text-warning"
const dim = "text-muted-foreground"

/** A tiny hand-tokenised snippet — no highlighter dependency for nine lines. */
const lines: Token[][] = [
    [
        { text: "const ", className: kw },
        { text: "developer" },
        { text: " = {", className: dim },
    ],
    [
        { text: "  name", className: key },
        { text: ": ", className: dim },
        { text: '"Ruzimurod Doniev"', className: str },
        { text: ",", className: dim },
    ],
    [
        { text: "  role", className: key },
        { text: ": ", className: dim },
        { text: '"Frontend Developer"', className: str },
        { text: ",", className: dim },
    ],
    [
        { text: "  stack", className: key },
        { text: ": [", className: dim },
        { text: '"React"', className: str },
        { text: ", ", className: dim },
        { text: '"Next.js"', className: str },
        { text: ", ", className: dim },
        { text: '"TypeScript"', className: str },
        { text: "],", className: dim },
    ],
    [
        { text: "  available", className: key },
        { text: ": ", className: dim },
        { text: "true", className: bool },
        { text: ",", className: dim },
    ],
    [{ text: "};", className: dim }],
    [],
    [
        { text: "export default ", className: kw },
        { text: "developer" },
        { text: ";", className: dim },
    ],
]

/** the card lands first, then the snippet types itself out line by line */
const code: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.5 } },
}

const line: Variants = {
    hidden: { opacity: 0, x: -8 },
    show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
}

export default function HeroCodeCard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="relative mx-auto w-full max-w-md min-w-0"
        >
            {/* soft accent light behind the card */}
            <div
                aria-hidden
                className="absolute -inset-8 -z-10 rounded-full bg-primary/15 blur-3xl"
            />

            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow-card)">
                {/* window chrome */}
                <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                    <span className="size-2.5 rounded-full bg-destructive/60" />
                    <span className="size-2.5 rounded-full bg-warning/60" />
                    <span className="size-2.5 rounded-full bg-success/60" />
                    <span className="ml-2 font-mono text-xs text-muted-foreground">
                        developer.ts
                    </span>
                </div>

                <pre className="overflow-x-auto px-4 py-5 font-mono text-[13px] leading-7 sm:text-sm">
                    <motion.code
                        variants={code}
                        initial="hidden"
                        animate="show"
                        className="block"
                    >
                        {lines.map((tokens, i) => (
                            <motion.div
                                key={i}
                                variants={line}
                                className="flex gap-4"
                            >
                                <span className="w-3 shrink-0 text-right text-muted-foreground/50 select-none">
                                    {i + 1}
                                </span>
                                <span>
                                    {tokens.map((token, j) => (
                                        <span
                                            key={j}
                                            className={token.className}
                                        >
                                            {token.text}
                                        </span>
                                    ))}
                                    {tokens.length === 0 && " "}
                                </span>
                            </motion.div>
                        ))}
                    </motion.code>
                </pre>
            </div>
        </motion.div>
    )
}
