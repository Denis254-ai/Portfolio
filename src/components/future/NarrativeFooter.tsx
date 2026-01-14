"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export const NarrativeFooter = () => {
    return (
        <footer className="relative flex w-full flex-col items-center justify-center overflow-hidden border-t border-white/10 bg-[var(--background)] py-32 text-center">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--violet-600)] opacity-10 blur-[150px]" />

            <div className="z-10 flex max-w-3xl flex-col items-center gap-10 px-4">
                <motion.p
                    className="font-clash text-2xl font-medium leading-relaxed text-white md:text-4xl"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    "I don't just write code; I orchestrate Intelligence using <span className="text-[var(--blue-600)]">Google Antigravity</span> and <span className="text-[var(--violet-600)]">Agentic Workflows</span> to ship faster than humanly possible."
                </motion.p>

                <div className="flex flex-col gap-4 sm:flex-row">
                    <a
                        href="mailto:contact@example.com"
                        className="group flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-black transition-transform hover:scale-105"
                    >
                        Start the Project
                        <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </a>

                    <a
                        href="https://wa.me/254758769865"
                        className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-105"
                    >
                        WhatsApp (+254 758 769 865)
                    </a>
                </div>

                <div className="mt-12 text-sm text-[var(--muted)]">
                    © {new Date().getFullYear()} The Living Ether. All Systems Nominal.
                </div>
            </div>
        </footer>
    );
};
