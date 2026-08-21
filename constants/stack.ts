import type { IconType } from "react-icons"
import {
    SiAnthropic,
    SiClaude,
    SiCss,
    SiDjango,
    SiDocker,
    SiFramer,
    SiGit,
    SiGithub,
    SiGithubactions,
    SiGitlab,
    SiHtml5,
    SiJavascript,
    SiJira,
    SiModelcontextprotocol,
    SiMui,
    SiNextdotjs,
    SiPostgresql,
    SiPython,
    SiReact,
    SiReacthookform,
    SiReactquery,
    SiReactrouter,
    SiRedux,
    SiSass,
    SiStyledcomponents,
    SiTailwindcss,
    SiTrello,
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

export interface IStackGroup {
    /** i18n key for the group label */
    titleKey: string
    items: ITech[]
}

/** Shared by more than one group — declared once so the tiles cannot drift apart. */
const python: ITech = { name: "Python", icon: SiPython, color: "#3776AB" }
const django: ITech = { name: "Django", icon: SiDjango, color: "#44B78B" }
const docker: ITech = { name: "Docker", icon: SiDocker, color: "#2496ED" }

/**
 * Grouped roughly the way the CV sidebar is (public/cv/resume.pdf), so the site
 * and the PDF an HR reader downloads tell the same story. A tech may appear in
 * two groups — "daily" is about how often, the rest are about which layer.
 */
export const stackGroups: IStackGroup[] = [
    {
        titleKey: "stackDaily",
        items: [
            { name: "Claude Code", icon: SiClaude, color: "#D97757" },
            { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
            { name: "React", icon: SiReact, color: "#61DAFB" },
            { name: "Next.js", icon: SiNextdotjs },
            python,
            django,
            docker,
        ],
    },
    {
        titleKey: "stackAi",
        items: [
            { name: "Claude API", icon: SiAnthropic },
            { name: "MCP", icon: SiModelcontextprotocol },
        ],
    },
    {
        titleKey: "stackFrontend",
        items: [
            { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
            { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
            { name: "Sass", icon: SiSass, color: "#CC6699" },
            { name: "MUI", icon: SiMui, color: "#007FFF" },
            {
                name: "styled-components",
                icon: SiStyledcomponents,
                color: "#DB7093",
            },
            { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
            { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
            { name: "CSS", icon: SiCss, color: "#663399" },
        ],
    },
    {
        titleKey: "stackState",
        items: [
            { name: "TanStack Query", icon: SiReactquery, color: "#FF4154" },
            { name: "Redux Toolkit", icon: SiRedux, color: "#764ABC" },
            { name: "React Router", icon: SiReactrouter, color: "#CA4245" },
            {
                name: "react-hook-form",
                icon: SiReacthookform,
                color: "#EC5990",
            },
        ],
    },
    {
        titleKey: "stackBackend",
        items: [
            python,
            django,
            { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
        ],
    },
    {
        titleKey: "stackDevops",
        items: [
            docker,
            { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
            { name: "Git", icon: SiGit, color: "#F05032" },
            { name: "Vitest", icon: SiVitest, color: "#6DA544" },
        ],
    },
    {
        titleKey: "stackTeam",
        items: [
            { name: "GitHub", icon: SiGithub },
            { name: "GitLab", icon: SiGitlab, color: "#FC6D26" },
            { name: "Jira", icon: SiJira, color: "#0052CC" },
            { name: "Trello", icon: SiTrello, color: "#0079BF" },
        ],
    },
]

/**
 * Flat list — the marquee strip and anything that just needs every tech. Deduped
 * by name: a tech listed in two groups would otherwise render twice and collide
 * on its React key.
 */
export const stack: ITech[] = [
    ...new Map(
        stackGroups.flatMap((group) => group.items).map((tech) => [tech.name, tech]),
    ).values(),
]
