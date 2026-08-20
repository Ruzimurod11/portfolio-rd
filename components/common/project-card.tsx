import Image from "next/image"
import { ArrowUpRight, Code2 } from "lucide-react"
import ClientTranslate from "@/components/client-translate"
import Tag from "@/components/common/tag"
import type { IProject } from "@/constants/projects"
import { cn } from "@/lib/utils"

interface Props {
    project: IProject
    className?: string
    priority?: boolean
}

export default function ProjectCard({ project, className, priority }: Props) {
    return (
        <article
            className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-(--shadow-card) transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-(--shadow-card-hover)",
                className,
            )}
        >
            <div className="relative aspect-16/10 overflow-hidden border-b border-border bg-muted">
                <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={priority}
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            <div className="flex flex-1 flex-col gap-4 p-5">
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        <ClientTranslate
                            translationKey={project.descriptionKey}
                        />
                    </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                        <Tag key={tech}>{tech}</Tag>
                    ))}
                </div>

                <div className="mt-auto flex items-center gap-5 border-t border-border pt-4 text-sm">
                    <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-medium text-primary transition-opacity hover:opacity-70"
                    >
                        <ClientTranslate translationKey="demo" />
                        <ArrowUpRight size={15} />
                    </a>
                    <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <Code2 size={15} />
                        <ClientTranslate translationKey="sourceCode" />
                    </a>
                </div>
            </div>
        </article>
    )
}
