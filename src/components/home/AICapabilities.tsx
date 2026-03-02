"use client";

import { motion } from "framer-motion";
import { Typography } from "@/components/ui/typography";
import { Database, Zap, ShieldCheck, Activity } from "lucide-react";

const capabilities = [
    {
        title: "Custom AI Architecture",
        description: "Designing resilient systems tailored to your proprietary data.",
        icon: Database,
    },
    {
        title: "LLM Integration & RAG",
        description: "Retrieval-Augmented Generation linking enterprise knowledge with intelligence.",
        icon: Zap,
    },
    {
        title: "Agentic Workflow Automation",
        description: "Autonomous agents orchestrating intricate operational sequences end-to-end.",
        icon: Activity,
    },
    {
        title: "AI Governance & Observability",
        description: "Enterprise-grade guardrails ensuring compliant and predictable AI outputs.",
        icon: ShieldCheck,
    },
];

export function AICapabilities() {
    return (
        <section className="py-32 relative text-white border-t border-white/5" id="ai-capabilities">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left: Interactive Diagram / Visual representation */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="relative h-[600px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden flex items-center justify-center"
                >
                    {/* Mocking a diagram using CSS shapes and glowing borders */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-red/10 to-brand-darkred/10" />

                    <div className="relative z-10 flex flex-col items-center gap-8 w-full px-12">
                        {[
                            { text: "Data Pipelines", delay: 0 },
                            { text: "Logic Layers", delay: 0.2 },
                            { text: "Execution Mechanisms", delay: 0.4 },
                            { text: "Governance Controls", delay: 0.6 },
                        ].map((layer, i) => (
                            <motion.div
                                key={layer.text}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: layer.delay }}
                                className="w-full"
                            >
                                <div className="h-16 rounded-xl border border-brand-red/30 bg-brand-red/5 backdrop-blur-sm flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] hover:scale-105 transition-all duration-300">
                                    <span className="font-display tracking-widest uppercase text-sm font-semibold text-brand-red drop-shadow-md">
                                        {layer.text}
                                    </span>
                                </div>
                                {i < 3 && (
                                    <div className="h-8 w-px bg-gradient-to-b from-brand-red/50 to-transparent mx-auto relative">
                                        <motion.div
                                            animate={{ y: [0, 32] }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                            className="absolute top-0 left-1/2 -ml-[2px] w-1 h-3 rounded-full bg-brand-darkred shadow-[0_0_10px_purple]"
                                        />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Right: Content */}
                <div>
                    <Typography variant="h2" className="mb-6">
                        Engineering Superior <br /> Intelligence
                    </Typography>
                    <Typography variant="p" className="text-neutral-400 mb-12">
                        We don't just wrap APIs. We architect custom layers of logic, grounding LLMs in your specific enterprise reality through bespoke workflows and stringent governance.
                    </Typography>

                    <div className="flex flex-col gap-8">
                        {capabilities.map((cap, i) => {
                            const Icon = cap.icon;
                            return (
                                <motion.div
                                    key={cap.title}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="flex gap-4 group cursor-pointer"
                                >
                                    <div className="mt-1 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-red/10 group-hover:border-brand-red/30 transition-colors shrink-0">
                                        <Icon className="w-5 h-5 text-neutral-400 group-hover:text-brand-red transition-colors" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-display font-semibold mb-2 group-hover:text-white transition-colors">
                                            {cap.title}
                                        </h4>
                                        <p className="text-neutral-400 font-sans group-hover:text-neutral-300 transition-colors">
                                            {cap.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
