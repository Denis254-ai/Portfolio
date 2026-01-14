
import { cn } from "@/lib/utils"; // We might need a utility for clsx/tailwind-merge
import { motion } from "framer-motion";

export const Badge = () => {
    return (
        <div className="relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white">
            <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            POWERED BY GOOGLE ANTIGRAVITY
        </div>
    );
};
