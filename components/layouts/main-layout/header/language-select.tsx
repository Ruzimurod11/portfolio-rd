"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LANGUAGE_KEY } from "@/constants"
import Cookies from "js-cookie"
import { languages } from "@/constants/options"
import { CheckIcon, ChevronDown } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const SelectLanguage = () => {
    const router = useRouter()

    const [currentLang, setCurrentLang] = useState<(typeof languages)[number]>(
        languages[0],
    )

    useEffect(() => {
        const savedLang = Cookies.get(LANGUAGE_KEY)
        const foundLang = languages.find((l) => l.value === savedLang)
        if (foundLang) {
            setCurrentLang(foundLang)
        }
    }, [])

    const handleLanguageChange = (val: string) => {
        if (val !== currentLang.value) {
            const newLang =
                languages.find((l) => l.value === val) || languages[0]
            Cookies.set(LANGUAGE_KEY, val)
            setCurrentLang(newLang)
            router.refresh() // Sahifani yangilaydi
        }
    }

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="flex items-center gap-1 w-14 shadow-none border-none px-2 focus:ring-0 focus:outline-none focus-visible:ring-0 data-[state=open]:ring-0 data-[state=open]:outline-none">
                {currentLang.label}
                <ChevronDown size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {languages.map((item) => {
                    const isActive = item.value === currentLang.value
                    return (
                        <DropdownMenuItem
                            key={item.value}
                            onClick={() => handleLanguageChange(item.value)}
                            className={cn(
                                isActive && "bg-accent",
                                "cursor-pointer",
                            )}
                        >
                            <div className="flex items-center gap-2 w-full">
                                <Image
                                    width={16}
                                    height={16}
                                    src={item.scr}
                                    alt={item.label}
                                    className="w-4 h-4"
                                />
                                {item.label}
                                {isActive && (
                                    <span className="flex-1 flex justify-end">
                                        <CheckIcon size={16} />
                                    </span>
                                )}
                            </div>
                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default SelectLanguage
