import { Mail, Phone } from "lucide-react"
import type { IconType } from "react-icons"
import { FaGithub, FaLinkedinIn, FaTelegramPlane } from "react-icons/fa"
import type { LucideIcon } from "lucide-react"

export const EMAIL = "ruzimurod_doniev@mail.ru"
export const PHONE = "+998 50 159 96 03"
export const GITHUB_URL = "https://github.com/Ruzimurod11"
export const LINKEDIN_URL =
    "https://www.linkedin.com/in/ruzimurod-doniev-243026266/"
export const TELEGRAM_URL = "https://t.me/ruzimurod_doniev"

export interface IContact {
    key: string
    /** brand names are not translated; `labelKey` is set only when they must be */
    label: string
    labelKey?: string
    value: string
    href: string
    icon: LucideIcon | IconType
    /** mailto:/tel: links must not open in a new tab */
    external: boolean
}

export const contacts: IContact[] = [
    {
        key: "email",
        label: "Email",
        value: EMAIL,
        href: `mailto:${EMAIL}`,
        icon: Mail,
        external: false,
    },
    {
        key: "phone",
        label: "Telefon",
        labelKey: "phone",
        value: PHONE,
        href: `tel:${PHONE.replace(/\s/g, "")}`,
        icon: Phone,
        external: false,
    },
    {
        key: "telegram",
        label: "Telegram",
        value: "@ruzimurod_doniev",
        href: TELEGRAM_URL,
        icon: FaTelegramPlane,
        external: true,
    },
    {
        key: "github",
        label: "GitHub",
        value: "github.com/Ruzimurod11",
        href: GITHUB_URL,
        icon: FaGithub,
        external: true,
    },
    {
        key: "linkedin",
        label: "LinkedIn",
        value: "linkedin.com/in/ruzimurod",
        href: LINKEDIN_URL,
        icon: FaLinkedinIn,
        external: true,
    },
]

export interface ISocial {
    key: string
    label: string
    href: string
    icon: IconType
}

export const socials: ISocial[] = [
    { key: "github", label: "GitHub", href: GITHUB_URL, icon: FaGithub },
    {
        key: "linkedin",
        label: "LinkedIn",
        href: LINKEDIN_URL,
        icon: FaLinkedinIn,
    },
    {
        key: "telegram",
        label: "Telegram",
        href: TELEGRAM_URL,
        icon: FaTelegramPlane,
    },
]

export const navLinks = [
    { href: "/about", label: "aboutMe" },
    { href: "/works", label: "projects" },
    { href: "/contacts", label: "contacts" },
] as const
