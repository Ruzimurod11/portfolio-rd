import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getLocale } from "next-intl/server";
import type React from "react";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./_providers";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import FallbackLoader from "@/components/fallback-loader";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["cyrillic", "latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["cyrillic", "latin"],
});

export const metadata: Metadata = {
	title: {
		default: "Ruzimurod — Fullstack AI Engineer",
		template: "%s · Ruzimurod",
	},
	description:
		"Fullstack AI engineer. React, Next.js va TypeScript bilan interfeys, Python, Django va PostgreSQL bilan API quraman — Claude Code bilan agent-first.",
	openGraph: {
		title: "Ruzimurod — Fullstack AI Engineer",
		description:
			"React, Next.js, TypeScript, Python, Django, PostgreSQL va Docker — interfeysdan API'gacha.",
		type: "website",
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#fcfcfd" },
		{ media: "(prefers-color-scheme: dark)", color: "#0d0d10" },
	],
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
			>
				<Suspense fallback={<FallbackLoader />}>
					<Providers>
						<NextTopLoader
							color="#7c5cff"
							initialPosition={0.08}
							crawlSpeed={200}
							height={2}
							showSpinner={false}
						/>
						{children}
						<Toaster />
					</Providers>
				</Suspense>
			</body>
		</html>
	);
}
