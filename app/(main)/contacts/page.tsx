"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, Send } from "lucide-react";
import Link from "next/link";

const contacts = [
	{
		icon: Mail,
		label: "Email",
		value: "ruzimurod_doniev@mail.ru",
		href: "mailto:ruzimurod@example.com",
	},
	{
		icon: Phone,
		label: "Telefon",
		value: "+998 99 021 86 67",
		href: "tel:+998990218667",
	},
	{
		icon: Send,
		label: "Telegram",
		value: "@ruzimurod_doniev",
		href: "https://t.me/ruzimurod",
	},
	{
		icon: Github,
		label: "GitHub",
		value: "github.com/Ruzimurod11",
		href: "https://github.com/Ruzimurod11",
	},
	{
		icon: Linkedin,
		label: "LinkedIn",
		value: "linkedin.com/in/ruzimurod",
		href: "https://www.linkedin.com/in/ruzimurod-doniev-243026266/",
	},
];

const container = {
	hidden: { opacity: 0 },
	show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
	hidden: { opacity: 0, x: -30 },
	show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Page() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-[#eff3ff] to-[#e0f0ff] flex items-center justify-center px-6 py-16">
			<div className="max-w-xl w-full">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className="text-center mb-12"
				>
					<h1 className="text-4xl font-bold text-purple-700 mb-3">
						Bog'lanish
					</h1>
					<p className="text-gray-500 text-base">
						Istalgan qulay usulda muloqotga chiqishingiz mumkin
					</p>
					<div className="w-16 h-1 bg-purple-400 rounded-full mx-auto mt-4" />
				</motion.div>

				{/* Contact cards */}
				<motion.div
					variants={container}
					initial="hidden"
					animate="show"
					className="flex flex-col gap-4"
				>
					{contacts.map((contact) => (
						<motion.div
							key={contact.label}
							variants={item}
							whileHover={{ x: 6, transition: { duration: 0.2 } }}
						>
							<Link
								href={contact.href}
								target="_blank"
								rel="noreferrer"
								className="flex items-center gap-4 bg-white rounded-2xl px-6 py-4 shadow-sm hover:shadow-md transition-shadow group"
							>
								<div className="w-11 h-11 rounded-full bg-purple-100 flex items-center justify-center shrink-0 group-hover:bg-purple-600 transition-colors">
									<contact.icon
										size={20}
										className="text-purple-600 group-hover:text-white transition-colors"
									/>
								</div>
								<div className="min-w-0">
									<p className="text-xs text-gray-400 mb-0.5">
										{contact.label}
									</p>
									<p className="text-sm font-medium text-gray-800 truncate group-hover:text-purple-600 transition-colors">
										{contact.value}
									</p>
								</div>
								<span className="ml-auto text-gray-300 group-hover:text-purple-400 transition-colors text-lg">
									→
								</span>
							</Link>
						</motion.div>
					))}
				</motion.div>

				{/* Bottom note */}
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.8, duration: 0.5 }}
					className="text-center text-gray-400 text-sm mt-10"
				>
					Odatda 24 soat ichida javob beraman
				</motion.p>
			</div>
		</div>
	);
}
