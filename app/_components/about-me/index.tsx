import MainLayout from "@/components/layouts/main-layout";
import AboutPage from "./about-page";

export default function AboutMe({ index }: { index?: string }) {
	return (
		<MainLayout>
			<AboutPage index={index} />
		</MainLayout>
	);
}
