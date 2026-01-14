"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/lib/data";
import { ProjectCard } from "./ProjectCard";
import { GravityGrid } from "./GravityGrid";
import { cn } from "@/lib/utils";

export const WorkSection = () => {
    const [gravityOn, setGravityOn] = useState(false);

    return (
        <section className="relative min-h-screen w-full px-4 py-24">
            {/* Header & Toggle */}
            <div className="mb-16 flex flex-col items-center justify-between gap-8 md:flex-row md:px-12">
                <h2 className="font-clash text-4xl font-bold uppercase text-white md:text-6xl">
                    Selected Works
                </h2>

                <button
                    onClick={() => setGravityOn(!gravityOn)}
                    className={cn(
                        "group relative flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 transition-all hover:bg-white/10",
                        gravityOn ? "border-[var(--violet-600)]" : ""
                    )}
                >
                    <span className="text-sm font-medium uppercase tracking-wider">
                        GRAVITY: <span className={gravityOn ? "text-[var(--violet-600)]" : "text-white/50"}>
                            {gravityOn ? "ON" : "OFF"}
                        </span>
                    </span>
                    <div className={cn(
                        "h-2 w-2 rounded-full transition-colors",
                        gravityOn ? "bg-[var(--violet-600)] animate-pulse" : "bg-white/20"
                    )} />
                </button>
            </div>

            {/* Content Area */}
            <div className="relative min-h-[800px] w-full">
                <AnimatePresence mode="wait">
                    {!gravityOn ? (
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto"
                        >
                            {PROJECTS.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="gravity"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="h-full w-full"
                        >
                            <GravityGrid />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};
