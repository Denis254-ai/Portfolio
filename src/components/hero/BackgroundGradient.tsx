"use client";

import { motion } from "framer-motion";

export const BackgroundGradient = () => {
    return (
        <div className="absolute inset-0 z-[-1] overflow-hidden bg-[var(--background)] pointer-events-none">
            {/* Orb 1: Violet */}
            <motion.div
                className="absolute top-[-10%] left-[-10%] h-[50vw] w-[50vw] rounded-full bg-[var(--violet-600)] opacity-20 blur-[120px]"
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{ willChange: "transform" }}
            />

            {/* Orb 2: Blue */}
            <motion.div
                className="absolute bottom-[-10%] right-[-10%] h-[60vw] w-[60vw] rounded-full bg-[var(--blue-600)] opacity-15 blur-[120px]"
                animate={{
                    x: [0, -100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{ willChange: "transform" }}
            />

            {/* Orb 3: Accent pulse */}
            <motion.div
                className="absolute top-[40%] left-[40%] h-[30vw] w-[30vw] rounded-full bg-purple-900/30 opacity-20 blur-[100px]"
                animate={{
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.5, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Texture overlay (optional scanning lines or noise) */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>
    );
};
