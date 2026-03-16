"use client";

import { AnimatePresence, motion } from "framer-motion";
import Cookies from "js-cookie";
import { CheckIcon, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGUAGE_KEY } from "@/constants";
import { languages } from "@/constants/options";
import { cn } from "@/lib/utils";

const SelectLanguage = () => {
	const router = useRouter();
	const [currentLang, setCurrentLang] = useState<(typeof languages)[number]>(
		languages[0],
	);
	const [, setPrevLang] = useState<(typeof languages)[number]>(languages[0]);
	const [direction, setDirection] = useState(1);

	useEffect(() => {
		const savedLang = Cookies.get(LANGUAGE_KEY);
		const foundLang = languages.find((l) => l.value === savedLang);
		if (foundLang) setCurrentLang(foundLang);
	}, []);

	const handleLanguageChange = (val: string) => {
		if (val !== currentLang.value) {
			const newLang = languages.find((l) => l.value === val) || languages[0];
			const oldIndex = languages.findIndex(
				(l) => l.value === currentLang.value,
			);
			const newIndex = languages.findIndex((l) => l.value === val);
			setDirection(newIndex > oldIndex ? 1 : -1);
			setPrevLang(currentLang);
			Cookies.set(LANGUAGE_KEY, val);
			setCurrentLang(newLang);
			router.refresh();
		}
	};

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger className="flex items-center gap-2 w-24 shadow-none border-none px-2 focus:ring-0 focus:outline-none focus-visible:ring-0 data-[state=open]:ring-0 data-[state=open]:outline-none group overflow-hidden">
				{/* Animatsiyali til ko'rsatgich */}
				<AnimatePresence mode="wait" initial={false}>
					<motion.div
						key={currentLang.value}
						initial={{ opacity: 0, y: direction * 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: direction * -10 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
						className="flex items-center gap-2"
					>
						<Image
							src={currentLang.scr}
							alt={currentLang.label}
							width={24}
							height={24}
							className="rounded-sm shrink-0"
						/>
						<span className="text-sm">{currentLang.label}</span>
					</motion.div>
				</AnimatePresence>

				<ChevronDown
					size={16}
					className="transition-transform duration-300 group-data-[state=open]:rotate-180 shrink-0"
				/>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="border-background p-1" asChild>
				<motion.div
					initial={{ opacity: 0, scale: 0.95, y: -6 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.95, y: -6 }}
					transition={{ duration: 0.18, ease: "easeOut" }}
				>
					{languages.map((item, index) => {
						const isActive = item.value === currentLang.value;
						return (
							<motion.div
								key={item.value}
								initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: index * 0.05, duration: 0.2 }}
							>
								<DropdownMenuItem
									onClick={() => handleLanguageChange(item.value)}
									className={cn(isActive && "bg-accent", "cursor-pointer")}
								>
									<div className="flex items-center gap-2 w-full">
										<Image
											width={16}
											height={16}
											src={item.scr}
											alt={item.label}
											className="w-4 h-4 rounded-sm"
										/>
										<span className="text-sm">{item.label}</span>
										{isActive && (
											<span className="flex-1 flex justify-end">
												<CheckIcon size={14} className="text-purple-600" />
											</span>
										)}
									</div>
								</DropdownMenuItem>
							</motion.div>
						);
					})}
				</motion.div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default SelectLanguage;
