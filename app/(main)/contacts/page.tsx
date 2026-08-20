import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PageHeader from "@/components/common/page-header";
import MainLayout from "@/components/layouts/main-layout";
import ContactList from "./contact-list";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations();
	return { title: t("contacts") };
}

export default function Page() {
	return (
		<MainLayout>
			<PageHeader
				eyebrow="contacts"
				title="contacts"
				description="contactsDesc"
			/>
			<ContactList />
		</MainLayout>
	);
}
