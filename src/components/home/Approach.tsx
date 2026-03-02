"use client";

import { motion } from "framer-motion";
import { Typography } from "@/components/ui/typography";

const steps = [
    {
        phase: "01",
        title: "Discover",
        description: "Deep-dive analysis of your proprietary data, existing architecture, and business objectives.",
    },
    {
        phase: "02",
        title: "Design",
        description: "Architecting resilient AI workflows, establishing governance protocols, and UI mocking.",
    },
    {
        phase: "03",
        title: "Build",
        description: "Engineering robust pipelines, integrating LLMs, and developing custom intelligent agents.",
    },
    {
        phase: "04",
        title: "Deliver",
        description: "Seamless deployment, rigorous security testing, and hand-off of production-ready systems.",
    },
];

export function Approach() {
    return (
        <section className="py-32 relative text-white" id="approach">
            <div className="max-w-7xl mx-auto px-6">
                <Typography variant="h2" className="text-center mb-16">
                    Our Approach
                </Typography>

                <div className="relative">
                    {/* Connecting line */}
                    <div className="absolute top-0 bottom-0 left-[27px] md:left-1/2 w-px bg-white/10 md:-translate-x-1/2" />

                    <div className="space-y-12">
                        {steps.map((step, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={step.phase}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6 }}
                                    className={`flex flex-col md:flex-row items-start md:items-center relative ${isEven ? "md:flex-row-reverse" : ""
                                        }`}
                                >
                                    <div className={`md:w-1/2 px-12 pb-8 md:pb-0 ${isEven ? "text-left" : "md:text-right text-left"} ml-12 md:ml-0`}>
                                        <h4 className="text-2xl font-display font-semibold mb-3 text-white">
                                            {step.title}
                                        </h4>
                                        <p className="text-neutral-400 font-sans leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>

                                    {/* Circle Node */}
                                    <div className="absolute left-0 md:left-1/2 w-14 h-14 bg-black border-2 border-brand-red rounded-full flex items-center justify-center font-display font-bold text-brand-red z-10 md:-translate-x-1/2 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                                        {step.phase}
                                    </div>

                                    <div className="hidden md:block md:w-1/2" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
