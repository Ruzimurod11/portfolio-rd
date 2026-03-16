"use client";

import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import MainLayout from "@/components/layouts/main-layout";

const staticWorks = [
	{
		id: "1",
		name: "Posts",
		image: "/portfolio2.png",
		href: "https://github.com/Ruzimurod11/react-posts",
	},
	{
		id: "2",
		name: "Pokemon",
		image: "/portfolio3.png",
		href: "https://github.com/Ruzimurod11/GamePokemon",
	},
	{
		id: "3",
		name: "Users",
		image: "/portfolio4.png",
		href: "https://github.com/Ruzimurod11/random-user",
	},
	{
		id: "4",
		name: "Weather",
		image: "/portfolio5.png",
		href: "https://github.com/Ruzimurod11/weather",
	},
	{
		id: "5",
		name: "Create users",
		image: "/portfolio6.png",
		href: "https://github.com/Ruzimurod11/create-users",
	},
	{
		id: "6",
		name: "Learn english",
		image: "/portfolio7.png",
		href: "https://github.com/Ruzimurod11/my-little-website",
	},
	{
		id: "7",
		name: "CRUD api",
		image: "/portfolio8.png",
		href: "https://github.com/Ruzimurod11/dummyjson",
	},
	{
		id: "8",
		name: "Flowers",
		image: "/portfolio9.png",
		href: "https://github.com/Ruzimurod11/Flowers",
	},
	{
		id: "9",
		name: "Cakes",
		image: "/portfolio1.png",
		href: "https://github.com/Ruzimurod11/tortlar",
	},
];

const container: Variants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.08 },
	},
};

const cardVariant: Variants = {
	hidden: { opacity: 0, y: 40 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: "easeOut" as const },
	},
};

export default function Page() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-[#eff3ff] to-[#e0f0ff]">
			<MainLayout>
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
					className="text-center mb-14"
				>
					<h1 className="text-4xl font-bold text-purple-700 mb-3">My Works</h1>
					<p className="text-gray-500 text-base">
						Mening loyihalarim — har biri alohida tajriba
					</p>
					<div className="w-16 h-1 bg-purple-400 rounded-full mx-auto mt-4" />
				</motion.div>

				{/* Grid */}
				<motion.div
					variants={container}
					initial="hidden"
					animate="show"
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					{staticWorks.map((work) => (
						<motion.div
							key={work.id}
							variants={cardVariant}
							whileHover={{ y: -6, transition: { duration: 0.2 } }}
							className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
						>
							<Link href={work.href} target="_blank" rel="noreferrer">
								{/* Image */}
								<div className="relative w-full h-48 overflow-hidden">
									<Image
										src={work.image}
										alt={work.name}
										fill
										sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
										className="object-cover group-hover:scale-105 transition-transform duration-500"
									/>
									{/* Overlay */}
									<div className="absolute inset-0 bg-purple-900/0 group-hover:bg-purple-900/30 transition-all duration-300 flex items-center justify-center">
										<span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-purple-600 px-4 py-1.5 rounded-full">
											GitHub →
										</span>
									</div>
								</div>

								{/* Info */}
								<div className="px-5 py-4">
									<h3 className="text-base font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
										{work.name}
									</h3>
									<p className="text-xs text-gray-400 mt-1">
										github.com/Ruzimurod11
									</p>
								</div>
							</Link>
						</motion.div>
					))}
				</motion.div>
			</MainLayout>
		</div>
	);
}
