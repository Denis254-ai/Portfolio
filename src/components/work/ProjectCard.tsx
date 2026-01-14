"use client";

import { cn } from "@/lib/utils";
import { Project } from "@/lib/data";
import { motion } from "framer-motion";

interface ProjectCardProps {
    project: Project;
    className?: string;
    style?: React.CSSProperties; // For passing physics positioning
}

export const ProjectCard = ({ project, className, style }: ProjectCardProps) => {
    return (
        <motion.div
            className={cn(
                "group relative flex h-64 w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-zinc-900 p-6 text-center shadow-md transition-all",
                className
            )}
            style={style}
            whileHover={{ scale: 1.02 }}
        >
            {/* Background: Image or Gradient */}
            <div
                className={cn(
                    "absolute inset-0 bg-gradient-to-br transition-opacity duration-500",
                    project.gradient
                )}
            />

            {/* If we had real images, we'd render <img /> here with opacity handling */}
            {/* <img src={project.image} className="absolute inset-0 h-full w-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700 mix-blend-overlay" /> */}

            {/* Overlay to darken */}
            <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/20" />

            {/* Content */}
            <div className="z-10 flex flex-col items-center gap-2">
                <span className="text-xs font-medium uppercase tracking-widest text-white/60">
                    {project.category}
                </span>
                <h3 className="font-clash text-2xl font-bold text-white transition-all group-hover:text-3xl group-hover:text-[var(--violet-600)]">
                    {project.title}
                </h3>
            </div>
        </motion.div>
    );
};
