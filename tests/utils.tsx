import { render } from "@testing-library/react"
import { NextIntlClientProvider } from "next-intl"
import type { ReactElement } from "react"
import uz from "@/messages/uz.json"

/**
 * Almost every component reaches for a translation through <ClientTranslate />,
 * so tests need the provider around them. uz is the default locale.
 */
export const renderWithIntl = (ui: ReactElement) =>
    render(
        <NextIntlClientProvider locale="uz" messages={uz}>
            {ui}
        </NextIntlClientProvider>,
    )

export { uz }
