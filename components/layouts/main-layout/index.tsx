import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface Props {
    children: ReactNode
    className?: string
}

/**
 * Width/spacing container. The header is sticky, not fixed, so this no longer
 * needs a top offset — sections own their vertical rhythm.
 */
export default function MainLayout({ children, className }: Props) {
    return (
        <div className={cn("mx-auto w-full max-w-7xl px-4 xl:px-0", className)}>
            {children}
        </div>
    )
}
