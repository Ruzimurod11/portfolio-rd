import { screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { projects } from "@/constants/projects"
import { renderWithIntl, uz } from "@/tests/utils"
import ProjectCard from "./project-card"

const project = projects[0]

describe("ProjectCard", () => {
    it("renders the name, image and translated description", () => {
        renderWithIntl(<ProjectCard project={project} />)

        expect(
            screen.getByRole("heading", { level: 3, name: project.name }),
        ).toBeInTheDocument()
        expect(screen.getByAltText(project.name)).toBeInTheDocument()
        expect(
            screen.getByText(
                uz[project.descriptionKey as keyof typeof uz] as string,
            ),
        ).toBeInTheDocument()
    })

    it("links to the demo and the repository", () => {
        renderWithIntl(<ProjectCard project={project} />)

        expect(screen.getByRole("link", { name: uz.demo })).toHaveAttribute(
            "href",
            project.demo,
        )
        expect(
            screen.getByRole("link", { name: uz.sourceCode }),
        ).toHaveAttribute("href", project.repo)
    })

    it("lists every technology", () => {
        renderWithIntl(<ProjectCard project={project} />)

        for (const tech of project.tech) {
            expect(screen.getByText(tech)).toBeInTheDocument()
        }
    })
})
