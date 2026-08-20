import type { ReactNode } from "react";
import Footer from "@/components/layouts/main-layout/footer";
import Header from "@/components/layouts/main-layout/header";

interface Props {
	children: ReactNode;
}

export default function Layout({ children }: Props) {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1">{children}</main>
			<Footer />
		</div>
	);
}
