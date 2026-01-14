"use client";

import { motion } from "framer-motion";

interface TypewriterProps {
    text: string;
    className?: string;
    delay?: number;
}

export const Typewriter = ({ text, className, delay = 0 }: TypewriterProps) => {
    // Split text into array of characters
    const characters = Array.from(text);

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: delay,
            },
        },
    };

    const child = {
        hidden: { opacity: 0, y: 5 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.2 },
        },
    };

    return (
        <motion.h1
            className={className}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {characters.map((char, index) => (
                <motion.span key={index} variants={child}>
                    {char}
                </motion.span>
            ))}
        </motion.h1>
    );
};
