import { Gauge, GitBranch, Palette, Smartphone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ClientTranslate from "@/components/client-translate"
import Section from "@/components/common/section"
import {
    Stagger,
    StaggerGroup,
    StaggerItem,
} from "@/components/common/stagger"

const skills = [
    { icon: Smartphone, title: "createSite", body: "inAllDevices" },
    { icon: GitBranch, title: "teamWork", body: "codeInTeam" },
    { icon: Palette, title: "knowUI", body: "createUnique" },
    { icon: Gauge, title: "optimizationPer", body: "speedSite" },
]

export default function AboutPage({ index = "02" }: { index?: string }) {
    return (
        <Section index={index} title="aboutMe" description="forEachProject">
            <Stagger className="grid gap-4 lg:grid-cols-12">
                {/* profile card */}
                <StaggerItem className="flex flex-col gap-6 rounded-2xl border border-border bg-surface p-6 shadow-(--shadow-card) sm:p-8 lg:col-span-5">
                    <div className="flex items-center gap-5">
                        <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl ring-1 ring-border">
                            <Image
                                src="https://avatars.githubusercontent.com/u/148287289?v=4"
                                alt="Ruzimurod Doniev"
                                fill
                                sizes="80px"
                                className="object-cover"
                            />
                        </div>
                        <div className="space-y-1">
                            <p className="text-lg font-semibold">
                                Ruzimurod Doniev
                            </p>
                            <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                                Fullstack AI Engineer
                            </p>
                        </div>
                    </div>

                    <p className="leading-relaxed text-muted-foreground">
                        <ClientTranslate translationKey="hello" />{" "}
                        <span className="font-medium text-foreground">
                            <ClientTranslate translationKey="roleTitle" />
                        </span>{" "}
                        — <ClientTranslate translationKey="forUsers" />
                    </p>

                    <div className="rounded-xl border border-border bg-background/60 p-4">
                        <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                            <ClientTranslate translationKey="myTechnologies" />
                        </p>
                        <p className="mt-2 text-sm">
                            React · Next.js · TypeScript · Python · Django ·
                            PostgreSQL · Docker
                        </p>
                    </div>

                    <div className="mt-auto flex flex-wrap gap-3">
                        <a
                            href="/cv/resume.pdf"
                            download="Ruzimurod-Doniev-CV.pdf"
                            className="inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                        >
                            <ClientTranslate translationKey="downloadCV" />
                        </a>
                        <Link
                            href="/contacts"
                            className="inline-flex h-10 items-center rounded-full border border-border px-5 text-sm font-medium transition-colors hover:bg-surface-hover"
                        >
                            <ClientTranslate translationKey="contacts" />
                        </Link>
                    </div>
                </StaggerItem>

                {/* skills — a group, not a plain div, so the cascade reaches them */}
                <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
                    {skills.map(({ icon: Icon, title, body }) => (
                        <StaggerItem
                            key={title}
                            className="group rounded-2xl border border-border bg-surface p-6 shadow-(--shadow-card) transition-colors hover:border-primary/30 hover:bg-surface-hover"
                        >
                            <div className="grid size-10 place-items-center rounded-xl border border-border text-primary transition-colors group-hover:border-primary/40">
                                <Icon size={18} />
                            </div>
                            <h3 className="mt-5 font-semibold">
                                <ClientTranslate translationKey={title} />
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                <ClientTranslate translationKey={body} />
                            </p>
                        </StaggerItem>
                    ))}
                </StaggerGroup>
            </Stagger>
        </Section>
    )
}
