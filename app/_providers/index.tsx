import { NextIntlClientProvider } from "next-intl";
import type React from "react";
import { ModalProvider } from "./modal-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<NextIntlClientProvider>
			<ModalProvider>{children}</ModalProvider>
		</NextIntlClientProvider>
	);
}
