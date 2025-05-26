"use client"

import Link from "next/link"
import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa"

const Footer = () => {
    return (
        <footer className="bg-[#EDEEFE] text-gray-700 py-10 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Site Name / Logo */}
                    <div>
                        <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            Frontend Dasturchi
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Professional portfolio vebsayti — ishonchli frontend
                            xizmatlari uchun.
                        </p>
                    </div>

                    {/* Useful Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Navigatsiya
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="#home"
                                    className="hover:text-purple-500"
                                >
                                    Bosh sahifa
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#about"
                                    className="hover:text-purple-500"
                                >
                                    Men haqimda
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#projects"
                                    className="hover:text-purple-500"
                                >
                                    Loyihalar
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#contact"
                                    className="hover:text-purple-500"
                                >
                                    Bog‘lanish
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Ijtimoiy tarmoqlar
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
                    © {new Date().getFullYear()} Frontend Dasturchi. Barcha
                    huquqlar himoyalangan.
                </div>
            </div>
        </footer>
    )
}

export default Footer
