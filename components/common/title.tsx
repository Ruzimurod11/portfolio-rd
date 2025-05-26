import { cn } from "@/lib/utils"
import Image from "next/image"

interface Props {
    title: string
    className?: string
    isTranslate?: boolean
}

export default function Title({ title, className, isTranslate = true }: Props) {
    return (
        <div
            className={cn(
                "flex-col items-center gap-3 hidden lg:flex",
                className,
            )}
        >
            <h1 className="text-center text-[#212121] text-[2rem] font-bold">
                {isTranslate ? title : title}
            </h1>
            <Image
                src="/icons/line.svg"
                width={128}
                height={19}
                alt="title underline decoration"
            />
        </div>
    )
}
