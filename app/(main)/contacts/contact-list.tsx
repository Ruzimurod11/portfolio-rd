"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import { EMAIL, contacts } from "@/constants/contacts";

export default function ContactList() {
	const t = useTranslations();
	const [copied, setCopied] = useState(false);

	const copyEmail = async () => {
		await navigator.clipboard.writeText(EMAIL);
		setCopied(true);
		toast.success(t("copied"));
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="pt-12 pb-24">
			<div className="grid gap-4 sm:grid-cols-2">
				{contacts.map(
					({ key, label, labelKey, value, href, icon: Icon, external }, index) => (
						<motion.div
							key={key}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: index * 0.06 }}
							className="group relative flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-card)] transition-colors hover:border-primary/30 hover:bg-surface-hover"
						>
							<div className="grid size-11 shrink-0 place-items-center rounded-xl border border-border text-primary">
								<Icon size={18} />
							</div>

							<div className="min-w-0">
								<p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
									{labelKey ? t(labelKey) : label}
								</p>
								{/* stretched link keeps the whole card clickable with one anchor */}
								<a
									href={href}
									{...(external
										? { target: "_blank", rel: "noopener noreferrer" }
										: {})}
									className="truncate text-sm font-medium after:absolute after:inset-0 after:content-['']"
								>
									{value}
								</a>
							</div>

							{key === "email" ? (
								<button
									type="button"
									onClick={copyEmail}
									aria-label={t("copyEmail")}
									className="relative z-10 ml-auto grid size-9 cursor-pointer place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-primary"
								>
									{copied ? <Check size={15} /> : <Copy size={15} />}
								</button>
							) : (
								<ArrowUpRight
									size={18}
									className="ml-auto shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
								/>
							)}
						</motion.div>
					),
				)}
			</div>

			<p className="mt-10 text-center font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
				{t("replyTime")}
			</p>
		</div>
	);
}
