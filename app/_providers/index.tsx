import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import type React from "react";
import { ModalProvider } from "./modal-provider";
import MotionProvider from "./motion-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<NextIntlClientProvider>
			<ThemeProvider
				attribute="class"
				defaultTheme="dark"
				enableSystem
				disableTransitionOnChange
			>
				<MotionProvider>
					<ModalProvider>{children}</ModalProvider>
				</MotionProvider>
			</ThemeProvider>
		</NextIntlClientProvider>
	);
}
