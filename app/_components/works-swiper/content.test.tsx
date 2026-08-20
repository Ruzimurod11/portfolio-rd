import { render, screen } from "@testing-library/react"
import { NextIntlClientProvider } from "next-intl"
import { describe, expect, it } from "vitest"
import uz from "@/messages/uz.json"
import Content from "./content"

const renderContent = () =>
    render(
        <NextIntlClientProvider locale="uz" messages={uz}>
            <Content />
        </NextIntlClientProvider>,
    )

describe("WorksSwiper content", () => {
    it("renders a card for every static work", () => {
        renderContent()

        const links = screen.getAllByRole("link")
        expect(links).toHaveLength(9)

        for (const link of links) {
            expect(link.getAttribute("href")).toMatch(
                /^https:\/\/github\.com\/Ruzimurod11\//,
            )
        }
    })

    it("renders one pagination dot per slide", () => {
        const { container } = renderContent()

        // the rating widget inside each card also exposes a button role,
        // so match the dots by their element/type instead
        expect(
            container.querySelectorAll('button[type="button"]'),
        ).toHaveLength(9)
    })

    it("shows the translated section label", () => {
        renderContent()

        expect(screen.getAllByText(uz.works).length).toBeGreaterThan(0)
    })
})
