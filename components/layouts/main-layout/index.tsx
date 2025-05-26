import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface Props {
    children: ReactNode
    className?: string
}

export default function MainLayout({ children, className }: Props) {
    return (
        <div
            className={cn(
                "mt-16 lg:mt-20 px-4 xl:px-0 py-4 lg:py-6 max-w-7xl w-full mx-auto",
                className,
            )}
        >
            {children}
        </div>
    )
}
