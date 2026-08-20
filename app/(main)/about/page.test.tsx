import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import AboutPage from "./page"

describe("About page", () => {
    it("renders name and role", () => {
        render(<AboutPage />)

        expect(
            screen.getByRole("heading", { name: "Ruzimurod" }),
        ).toBeInTheDocument()
        expect(screen.getByText("Frontend Developer")).toBeInTheDocument()
    })

    it("renders the avatar with an alt text", () => {
        render(<AboutPage />)

        expect(screen.getByAltText("avatar")).toBeInTheDocument()
    })

    it("points the CV button at the pdf and the contact button at the anchor", () => {
        render(<AboutPage />)

        expect(
            screen.getByRole("link", { name: "CV yuklab olish" }),
        ).toHaveAttribute("href", "./cv/cv.pdf")
        expect(screen.getByRole("link", { name: "Bog'lanish" })).toHaveAttribute(
            "href",
            "#contact",
        )
    })
})
