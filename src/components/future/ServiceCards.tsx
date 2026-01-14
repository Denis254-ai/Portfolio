"use client";

import { motion } from "framer-motion";
import { Server, BrainCircuit, Cylinder } from "lucide-react"; // Icons

const SERVICES = [
    {
        title: "Enterprise-Grade Platforms",
        description: "Scalable SaaS, Multi-tenancy, Secure Auth. Built for valid business logic and high availability.",
        icon: Server,
        color: "text-blue-500",
    },
    {
        title: "AI-Integrated Workflows",
        description: "RAG Systems, Auto-Analysis, Chatbots. Logic that learns and adapts.",
        icon: BrainCircuit,
        color: "text-purple-500",
    },
    {
        title: "Decentralized Architecture",
        description: "Smart Contracts, Web3 Integration. Trustless systems for the future economy.",
        icon: Cylinder, // Best approximation for DB/Block
        color: "text-emerald-500",
    },
];

export const ServiceCards = () => {
    return (
        <section className="relative flex w-full flex-col items-center justify-center bg-black px-4 py-32">
            <div className="mb-16 text-center">
                <h2 className="font-clash text-4xl font-bold uppercase text-white md:text-5xl">
                    Beyond Code: Business Value.
                </h2>
            </div>

            <div className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
                {SERVICES.map((service, index) => (
                    <motion.div
                        key={index}
                        className="group relative flex flex-col items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:bg-white/10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                    >
                        <service.icon className={`h-10 w-10 ${service.color}`} />
                        <h3 className="font-clash text-2xl font-bold text-white">
                            {service.title}
                        </h3>
                        <p className="text-[var(--muted)]">
                            {service.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
