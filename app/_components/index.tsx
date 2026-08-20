import ScrollReveal from "@/components/common/scroll-reveal";
import AboutMe from "./about-me";
import ContactCta from "./contact-cta";
import Hero from "./hero";
import Stack from "./stack";
import Works from "./works";

export default function Index() {
	// clip, not hidden: `overflow-x: hidden` forces overflow-y from visible to
	// auto, which would turn this div into a second vertical scroll container
	return (
		<div className="overflow-x-clip">
			<Hero />
			<ScrollReveal>
				<Stack />
			</ScrollReveal>
			<ScrollReveal>
				<AboutMe />
			</ScrollReveal>
			<ScrollReveal>
				<Works />
			</ScrollReveal>
			<ScrollReveal>
				<ContactCta />
			</ScrollReveal>
		</div>
	);
}
