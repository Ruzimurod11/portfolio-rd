import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { projects } from "@/constants/projects"
import { renderWithIntl, uz } from "@/tests/utils"
import WorksPage from "./page"

describe("Works page", () => {
    it("renders the heading", () => {
        renderWithIntl(<WorksPage />)

        expect(
            screen.getByRole("heading", { level: 1, name: uz.projects }),
        ).toBeInTheDocument()
    })

    it("renders a card per project with a demo and a source link", () => {
        renderWithIntl(<WorksPage />)

        for (const project of projects) {
            expect(
                screen.getByRole("heading", { level: 3, name: project.name }),
            ).toBeInTheDocument()
        }

        const demoLinks = screen.getAllByRole("link", { name: uz.demo })
        const codeLinks = screen.getAllByRole("link", { name: uz.sourceCode })

        expect(demoLinks).toHaveLength(projects.length)
        expect(codeLinks).toHaveLength(projects.length)

        for (const link of [...demoLinks, ...codeLinks]) {
            expect(link).toHaveAttribute("target", "_blank")
            expect(link.getAttribute("rel")).toContain("noopener")
        }
    })

    it("shows no invented rating or view count", () => {
        const { container } = renderWithIntl(<WorksPage />)

        expect(container.textContent).not.toMatch(/\b0 \(0\)\b/)
        expect(container.textContent).not.toContain("34")
    })

    it("filters the grid by technology", async () => {
        const user = userEvent.setup()
        renderWithIntl(<WorksPage />)

        await user.click(screen.getByRole("button", { name: "React" }))

        const expected = projects.filter((p) => p.tech.includes("React"))
        expect(expected.length).toBeGreaterThan(0)

        // framer-motion keeps exiting cards mounted until their animation ends
        await waitFor(() =>
            expect(
                screen.getAllByRole("link", { name: uz.demo }),
            ).toHaveLength(expected.length),
        )
    })
})
