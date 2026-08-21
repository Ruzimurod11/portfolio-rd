import { screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { renderWithIntl, uz } from "@/tests/utils"
import AboutPage from "./page"

describe("About page", () => {
    it("renders the role as the page heading", () => {
        renderWithIntl(<AboutPage />)

        expect(
            screen.getByRole("heading", { level: 1, name: uz.roleTitle }),
        ).toBeInTheDocument()
    })

    it("renders the avatar and the name", () => {
        renderWithIntl(<AboutPage />)

        expect(screen.getByAltText("Ruzimurod Doniev")).toBeInTheDocument()
        expect(screen.getByText("Ruzimurod Doniev")).toBeInTheDocument()
    })

    it("points the CV button at the pdf and the contact button at /contacts", () => {
        renderWithIntl(<AboutPage />)

        expect(
            screen.getByRole("link", { name: uz.downloadCV }),
        ).toHaveAttribute("href", "/cv/resume.pdf")
        expect(screen.getByRole("link", { name: uz.contacts })).toHaveAttribute(
            "href",
            "/contacts",
        )
    })

    it("lists every skill", () => {
        renderWithIntl(<AboutPage />)

        for (const key of [
            uz.createSite,
            uz.teamWork,
            uz.knowUI,
            uz.optimizationPer,
        ]) {
            expect(
                screen.getByRole("heading", { level: 3, name: key }),
            ).toBeInTheDocument()
        }
    })

    it("hides the experience section while constants/experience.ts is empty", () => {
        renderWithIntl(<AboutPage />)

        expect(screen.queryByText(uz.experience)).not.toBeInTheDocument()
    })
})
