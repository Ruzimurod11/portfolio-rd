import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import ContactsPage from "./page"

describe("Contacts page", () => {
    it("renders the heading", () => {
        render(<ContactsPage />)

        expect(
            screen.getByRole("heading", { name: "Bog'lanish" }),
        ).toBeInTheDocument()
    })

    it("links every contact to a working target", () => {
        render(<ContactsPage />)

        const links = screen.getAllByRole("link")
        const hrefs = links.map((link) => link.getAttribute("href"))

        expect(hrefs).toEqual([
            "mailto:ruzimurod_doniev@mail.ru",
            "tel:+998501599603",
            "https://t.me/ruzimurod_doniev",
            "https://github.com/Ruzimurod11",
            "https://www.linkedin.com/in/ruzimurod-doniev-243026266/",
        ])
    })

    it("opens external contacts in a new tab safely", () => {
        render(<ContactsPage />)

        for (const link of screen.getAllByRole("link")) {
            expect(link).toHaveAttribute("target", "_blank")
            expect(link).toHaveAttribute(
                "rel",
                expect.stringContaining("noreferrer"),
            )
        }
    })

    it("shows the visible contact details", () => {
        render(<ContactsPage />)

        expect(screen.getByText("ruzimurod_doniev@mail.ru")).toBeInTheDocument()
        expect(screen.getByText("+998 50 159 96 03")).toBeInTheDocument()
        expect(screen.getByText("@ruzimurod_doniev")).toBeInTheDocument()
    })
})
