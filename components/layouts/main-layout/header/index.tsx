"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react" // hamburger & close icons
import Link from "next/link"
import { cn } from "@/lib/utils"
import SelectLanguage from "./language-select"
import { Button } from "@/components/ui/button"
import ClientTranslate from "@/components/client-translate"
import { useLoginModal } from "@/hooks/use-login-modal"

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    const { openLoginModal } = useLoginModal()

    const toggleMenu = () => setIsOpen(!isOpen)
    const closeMenu = () => setIsOpen(false)
    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#EDEEFE] basic-shadow px-5 max-lg:hidden">
                <div className="absolute top-0 -right-[46.813rem] w-[92.52rem] h-[5.438rem] origin-top-left rotate-[0.80deg] opacity-10 bg-gradient-to-r from-[#0019ff] to-[#6ee5c2] blur-[49.50px] pointer-events-none" />
                <div className="absolute top-[1.688rem] -left-[6.75rem] w-[60.25rem] h-[3.375rem] opacity-10 bg-gradient-to-r from-[#ffc73a] via-[#ff008a] to-[#6100ff] blur-[62px] pointer-events-none" />
                <main className="py-5 shadow-[0px_3px_12px_0px_rgba(175,173,173,0.14)]">
                    {/* Logo */}
                    <div className="max-w-7xl w-full h-10 flex justify-between gap-5 items-center mx-auto">
                        <Link
                            href="/"
                            className="text-2xl font-bold text-purple-600 dark:text-purple-400"
                        >
                            Ruzimurod
                        </Link>

                        {/* Desktop Links */}
                        <nav className="hidden md:flex gap-6 text-gray-700">
                            <Link
                                href="#home"
                                className="hover:text-purple-500"
                            >
                                <ClientTranslate translationKey="home" />
                            </Link>
                            <Link
                                href="#about"
                                className="hover:text-purple-500"
                            >
                                <ClientTranslate translationKey="aboutMe" />
                            </Link>
                            <Link
                                href="#projects"
                                className="hover:text-purple-500"
                            >
                                <ClientTranslate translationKey="projects" />
                            </Link>
                            <Link
                                href="#contact"
                                className="hover:text-purple-500"
                            >
                                <ClientTranslate translationKey="contacts" />
                            </Link>
                        </nav>

                        <ul className="flex items-center gap-6 text-[#212121] text-lg font-medium">
                            <li className="cursor-pointer">
                                <SelectLanguage />
                            </li>
                            {/* <Button onClick={openLoginModal}></Button> */}
                        </ul>

                        {/* Hamburger Button */}
                        <button
                            className="md:hidden text-gray-700"
                            onClick={toggleMenu}
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </main>
            </header>
            {/* Mobile Menu */}
            <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#EDEEFE] basic-shadow lg:hidden">
                <div className="w-full flex items-center justify-between px-4 py-4">
                    <Link
                        href="/"
                        className="text-2xl font-bold text-purple-600 dark:text-purple-400"
                    >
                        Ruzimurod
                    </Link>
                    <button
                        onClick={toggleMenu}
                        className="text-gray-700"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Nav */}
                <nav
                    className={cn(
                        "flex px-4 flex-col gap-4 text-gray-800 text-base font-medium transition-all duration-500",
                        isOpen
                            ? "max-h-[300px] opacity-100"
                            : "max-h-0 overflow-hidden opacity-0",
                    )}
                >
                    <div className="flex flex-col px-4 py-6 gap-4">
                        <Link
                            href="#home"
                            onClick={closeMenu}
                            className="hover:text-purple-500"
                        >
                            <ClientTranslate translationKey="home" />
                        </Link>
                        <Link
                            href="#about"
                            onClick={closeMenu}
                            className="hover:text-purple-500"
                        >
                            <ClientTranslate translationKey="aboutMe" />
                        </Link>
                        <Link
                            href="#projects"
                            onClick={closeMenu}
                            className="hover:text-purple-500"
                        >
                            <ClientTranslate translationKey="projects" />
                        </Link>
                        <Link
                            href="#contact"
                            onClick={closeMenu}
                            className="hover:text-purple-500"
                        >
                            <ClientTranslate translationKey="contacts" />
                        </Link>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header
