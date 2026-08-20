import { screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { contacts } from "@/constants/contacts"
import { renderWithIntl, uz } from "@/tests/utils"
import ContactsPage from "./page"

describe("Contacts page", () => {
    it("renders the heading", () => {
        renderWithIntl(<ContactsPage />)

        expect(
            screen.getByRole("heading", { level: 1, name: uz.contacts }),
        ).toBeInTheDocument()
    })

    it("links every contact to its target", () => {
        renderWithIntl(<ContactsPage />)

        for (const contact of contacts) {
            expect(
                screen.getByRole("link", { name: contact.value }),
            ).toHaveAttribute("href", contact.href)
        }
    })

    it("opens only external contacts in a new tab", () => {
        renderWithIntl(<ContactsPage />)

        for (const contact of contacts) {
            const link = screen.getByRole("link", { name: contact.value })

            if (contact.external) {
                expect(link).toHaveAttribute("target", "_blank")
                expect(link.getAttribute("rel")).toContain("noopener")
            } else {
                // mailto: / tel: must stay in the same tab
                expect(link).not.toHaveAttribute("target")
            }
        }
    })

    it("offers a copy button for the email", () => {
        renderWithIntl(<ContactsPage />)

        expect(
            screen.getByRole("button", { name: uz.copyEmail }),
        ).toBeInTheDocument()
    })
})
