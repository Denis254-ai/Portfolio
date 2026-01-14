"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Typewriter } from "./Typewriter";
import { BackgroundGradient } from "./BackgroundGradient";

export const HeroSection = () => {
    return (
        <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-20 text-center">
            <BackgroundGradient />

            <div className="z-10 flex flex-col items-center gap-8">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Badge />
                </motion.div>

                {/* Headline */}
                <div className="max-w-4xl">
                    <Typewriter
                        text="ARCHITECTING DIGITAL REALITY"
                        className="font-clash text-5xl font-bold uppercase leading-tight tracking-tight text-white sm:text-7xl md:text-8xl"
                        delay={0.5}
                    />
                </div>

                {/* Subhead */}
                <motion.p
                    className="max-w-2xl text-lg text-[var(--muted)] sm:text-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 2.5 }} // Delay after typewriter finishes roughly
                >
                    Full Stack Engineering. AI-Augmented Logic. Precision Design.
                </motion.p>
            </div>
        </section>
    );
};
