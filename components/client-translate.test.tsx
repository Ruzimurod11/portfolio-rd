import { render, screen } from "@testing-library/react"
import { NextIntlClientProvider } from "next-intl"
import type { ReactNode } from "react"
import { describe, expect, it } from "vitest"
import uz from "@/messages/uz.json"
import ClientTranslate from "./client-translate"

const renderWithIntl = (
    ui: ReactNode,
    messages: Record<string, string> = uz,
) =>
    render(
        <NextIntlClientProvider locale="uz" messages={messages}>
            {ui}
        </NextIntlClientProvider>,
    )

describe("ClientTranslate", () => {
    it("renders the translation for the given key inside a span", () => {
        renderWithIntl(<ClientTranslate translationKey="downloadCV" />)

        const node = screen.getByText(uz.downloadCV)
        expect(node.tagName).toBe("SPAN")
    })

    it("passes className through to the span", () => {
        renderWithIntl(
            <ClientTranslate translationKey="home" className="text-sm" />,
        )

        expect(screen.getByText(uz.home)).toHaveClass("text-sm")
    })

    it("interpolates values", () => {
        renderWithIntl(<ClientTranslate translationKey="greeting" />, {
            greeting: "Hello, world!",
        })

        expect(screen.getByText("Hello, world!")).toBeInTheDocument()
    })

    // next-intl reads a bare "<b>" as rich-text markup and errors out when no
    // handler is passed, so a message meant for isParse has to escape its tags
    // ICU-style ('<b>') to reach html-react-parser as literal HTML.
    it("parses the message into real elements when isParse is set", () => {
        const { container } = renderWithIntl(
            <ClientTranslate translationKey="rich" isParse />,
            { rich: "Frontend '<b>'Developer'</b>'" },
        )

        expect(container.querySelector("b")).toHaveTextContent("Developer")
    })

    it("renders the markup as plain text when isParse is not set", () => {
        const { container } = renderWithIntl(
            <ClientTranslate translationKey="rich" />,
            { rich: "Frontend '<b>'Developer'</b>'" },
        )

        expect(container.querySelector("b")).toBeNull()
        expect(container).toHaveTextContent("Frontend <b>Developer</b>")
    })

    it("renders nothing for an empty translation key", () => {
        const { container } = renderWithIntl(
            <ClientTranslate translationKey="" />,
        )

        expect(container).toBeEmptyDOMElement()
    })
})
