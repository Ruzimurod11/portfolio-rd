import type { IconType } from "react-icons"
import {
    SiFramer,
    SiGit,
    SiJavascript,
    SiNextdotjs,
    SiReact,
    SiReactquery,
    SiReactrouter,
    SiRedux,
    SiSass,
    SiTailwindcss,
    SiTypescript,
    SiVitest,
} from "react-icons/si"

export interface ITech {
    name: string
    icon: IconType
    /**
     * Brand colour, applied only on hover so the grid stays monochrome at rest.
     * Omitted where the brand mark is black/white and would vanish in one theme.
     */
    color?: string
}

export const stack: ITech[] = [
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
    { name: "Sass", icon: SiSass, color: "#CC6699" },
    { name: "Redux Toolkit", icon: SiRedux, color: "#764ABC" },
    { name: "TanStack Query", icon: SiReactquery, color: "#FF4154" },
    { name: "React Router", icon: SiReactrouter, color: "#CA4245" },
    { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
    { name: "Vitest", icon: SiVitest, color: "#6DA544" },
    { name: "Git", icon: SiGit, color: "#F05032" },
]
