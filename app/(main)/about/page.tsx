"use client";

import { motion } from "framer-motion";

const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.15 },
	},
};

const item = {
	hidden: { opacity: 0, y: 30 },
	show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Page() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-[#eff3ff] to-[#e0f0ff] flex items-center justify-center px-6">
			<motion.div
				variants={container}
				initial="hidden"
				animate="show"
				className="max-w-2xl w-full text-center space-y-6"
			>
				{/* Avatar */}
				<motion.div variants={item} className="flex justify-center">
					<div className="w-24 h-24 rounded-full bg-purple-200 border-4 border-purple-500 overflow-hidden">
						<img
							src="https://avatars.githubusercontent.com/u/148287289?v=4"
							alt="avatar"
							className="w-full h-full object-cover"
						/>
					</div>
				</motion.div>

				{/* Ism */}
				<motion.h1
					variants={item}
					className="text-4xl font-bold text-purple-700"
				>
					Ruzimurod
				</motion.h1>

				{/* Lavozim */}
				<motion.p variants={item} className="text-lg text-gray-500 font-medium">
					Frontend Developer
				</motion.p>

				{/* Divider */}
				<motion.div
					variants={item}
					className="w-16 h-1 bg-purple-400 rounded-full mx-auto"
				/>

				{/* Bio */}
				<motion.p
					variants={item}
					className="text-gray-600 text-base leading-relaxed"
				>
					React, Next.js, TypeScript, Tailwind CSS va Framer Motion bilan
					foydalanuvchi uchun qulay va chiroyli interfeylar yarataman.
				</motion.p>

				{/* Tugmalar */}
				<motion.div
					variants={item}
					className="flex justify-center gap-4 flex-wrap"
				>
					<a
						href="./cv/cv.pdf"
						className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium"
					>
						CV yuklab olish
					</a>
					<a
						href="#contact"
						className="px-6 py-2.5 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition text-sm font-medium"
					>
						Bog'lanish
					</a>
				</motion.div>
			</motion.div>
		</div>
	);
}
