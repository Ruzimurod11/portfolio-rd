import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import WorksPage from "./page"

describe("Works page", () => {
    it("renders the heading", () => {
        render(<WorksPage />)

        expect(
            screen.getByRole("heading", { name: "My Works" }),
        ).toBeInTheDocument()
    })

    it("renders a card per project with a github link and an image", () => {
        render(<WorksPage />)

        const links = screen.getAllByRole("link")
        expect(links).toHaveLength(5)

        for (const link of links) {
            expect(link.getAttribute("href")).toMatch(
                /^https:\/\/github\.com\/Ruzimurod11\//,
            )
            expect(link).toHaveAttribute("target", "_blank")
        }

        expect(screen.getAllByRole("img")).toHaveLength(links.length)
    })

    it("labels each project", () => {
        render(<WorksPage />)

        for (const name of [
            "Pokemon",
            "Weather",
            "Learn english",
            "CRUD api",
            "Cakes",
        ]) {
            expect(
                screen.getByRole("heading", { name, level: 3 }),
            ).toBeInTheDocument()
        }
    })
})
