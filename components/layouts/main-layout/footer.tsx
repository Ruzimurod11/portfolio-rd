"use client"

import ClientTranslate from "@/components/client-translate"
import Link from "next/link"
import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa"

const Footer = () => {
    return (
        <footer className="bg-[#2E3440] text-white py-10 border-t border-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Site Name / Logo */}
                    <div>
                        <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            Ruzimurod
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            <ClientTranslate translationKey="profPortfolio" />
                        </p>
                    </div>

                    {/* Useful Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            <ClientTranslate translationKey="navigation" />
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="#home"
                                    className="hover:text-purple-500"
                                >
                                    <ClientTranslate translationKey="home" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#about"
                                    className="hover:text-purple-500"
                                >
                                    <ClientTranslate translationKey="aboutMe" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#projects"
                                    className="hover:text-purple-500"
                                >
                                    <ClientTranslate translationKey="projects" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#contact"
                                    className="hover:text-purple-500"
                                >
                                    <ClientTranslate translationKey="contacts" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            <ClientTranslate translationKey="socialNetworks" />
                        </h3>
                        <div className="flex gap-4 text-xl text-gray-600">
                            <a
                                href="https://github.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-purple-500"
                            >
                                <FaGithub />
                            </a>
                            <a
                                href="https://linkedin.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-purple-500"
                            >
                                <FaLinkedin />
                            </a>
                            <a
                                href="https://t.me/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-purple-500"
                            >
                                <FaTelegram />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-10 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} Ruzimurod.{" "}
                    <ClientTranslate translationKey="allRights" />
                </div>
            </div>
        </footer>
    )
}

export default Footer
