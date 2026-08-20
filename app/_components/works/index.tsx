import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ClientTranslate from "@/components/client-translate";
import ProjectCard from "@/components/common/project-card";
import Section from "@/components/common/section";
import { Stagger, StaggerItem } from "@/components/common/stagger";
import MainLayout from "@/components/layouts/main-layout";
import { featuredProjects } from "@/constants/projects";

export default function Works() {
	return (
		<MainLayout>
			<Section
				index="03"
				title="works"
				description="worksDesc"
				action={
					<Link
						href="/works"
						className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition-opacity hover:opacity-70"
					>
						<ClientTranslate translationKey="allProjects" />
						<ArrowRight
							size={15}
							className="transition-transform group-hover:translate-x-0.5"
						/>
					</Link>
				}
			>
				<Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{featuredProjects.map((project) => (
						<StaggerItem key={project.slug}>
							<ProjectCard project={project} className="h-full" />
						</StaggerItem>
					))}
				</Stagger>
			</Section>
		</MainLayout>
	);
}
