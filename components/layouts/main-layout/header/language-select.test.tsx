import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Cookies from "js-cookie"
import { NextIntlClientProvider } from "next-intl"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { LANGUAGE_KEY } from "@/constants"
import { languages } from "@/constants/options"
import SelectLanguage from "./language-select"

const refresh = vi.fn()

vi.mock("next/navigation", () => ({
    useRouter: () => ({ refresh }),
}))

// the locale comes from next-intl, which resolves the cookie server-side
// (see i18n/request.ts) — the component itself never reads the cookie
const renderWithLocale = (locale: string) =>
    render(
        <NextIntlClientProvider locale={locale} messages={{}}>
            <SelectLanguage />
        </NextIntlClientProvider>,
    )

const openDropdown = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.click(screen.getByRole("button"))
    return screen.findByRole("menu")
}

beforeEach(() => {
    refresh.mockClear()
    Cookies.remove(LANGUAGE_KEY)
})

afterEach(() => {
    Cookies.remove(LANGUAGE_KEY)
})

describe("SelectLanguage", () => {
    it("shows the active locale straight away, without a mount effect", () => {
        renderWithLocale("en")

        expect(screen.getByRole("button")).toHaveTextContent("En")
    })

    it("shows the default language for the default locale", () => {
        renderWithLocale(languages[0].value)

        expect(screen.getByRole("button")).toHaveTextContent(languages[0].label)
    })

    it("falls back to the default language for an unknown locale", () => {
        renderWithLocale("de")

        expect(screen.getByRole("button")).toHaveTextContent(languages[0].label)
    })

    it("writes the cookie and refreshes the route on change", async () => {
        const user = userEvent.setup()
        renderWithLocale("uz")

        await openDropdown(user)
        await user.click(await screen.findByRole("menuitem", { name: /Ru/ }))

        expect(Cookies.get(LANGUAGE_KEY)).toBe("ru")
        expect(refresh).toHaveBeenCalledTimes(1)

        // AnimatePresence mode="wait" swaps the label after the exit animation
        await waitFor(() =>
            expect(screen.getByRole("button")).toHaveTextContent("Ru"),
        )
    })

    it("does nothing when the already active language is picked", async () => {
        const user = userEvent.setup()
        renderWithLocale("uz")

        await openDropdown(user)
        await user.click(await screen.findByRole("menuitem", { name: /O'z/ }))

        expect(Cookies.get(LANGUAGE_KEY)).toBeUndefined()
        expect(refresh).not.toHaveBeenCalled()
    })

    it("offers every configured language", async () => {
        const user = userEvent.setup()
        renderWithLocale("uz")

        await openDropdown(user)

        expect(await screen.findAllByRole("menuitem")).toHaveLength(
            languages.length,
        )
    })
})
