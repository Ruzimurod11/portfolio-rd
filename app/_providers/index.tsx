import { NextIntlClientProvider } from "next-intl"
import { ModalProvider } from "./modal-provider"
import React from "react"

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextIntlClientProvider>
            <ModalProvider>{children}</ModalProvider>
        </NextIntlClientProvider>
    )
}
