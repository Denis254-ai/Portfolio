"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TECH_STACK = [
    "React",
    "Django",
    "Next.js",
    "Python",
    "PostgreSQL",
    "Solana",
    "AI Agents",
    "Framer Motion",
    // Duplicate for seamless loop if needed, 
    // but framer motion 'repeat: Infinity' works better with duplicated children
    "React",
    "Django",
    "Next.js",
    "Python",
    "PostgreSQL",
    "Solana",
    "AI Agents",
    "Framer Motion",
];

export const InfiniteMarquee = () => {
    return (
        <section className="relative flex w-full flex-col justify-center overflow-hidden bg-black py-24">
            <div className="flex w-full">
                <motion.div
                    className="flex whitespace-nowrap"
                    animate={{ x: [0, "-50%"] }}
                    transition={{
                        duration: 20,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {TECH_STACK.map((tech, i) => (
                        <span
                            key={i}
                            className={cn(
                                "mx-8 cursor-pointer font-clash text-6xl font-bold uppercase transition-colors duration-300 sm:text-8xl",
                                // Hollow Text Styles
                                "text-transparent",
                                "[-webkit-text-stroke:1px_rgba(255,255,255,0.2)]",
                                // Hover State
                                "hover:text-[var(--violet-600)] hover:[-webkit-text-stroke:0px]"
                            )}
                        >
                            {tech} •
                        </span>
                    ))}
                </motion.div>
            </div>

            {/* Reverse direction or second row if requested (User didn't explicitly request, keeping simple) */}
        </section>
    );
};
