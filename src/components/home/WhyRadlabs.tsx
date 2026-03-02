"use client";

import { motion } from "framer-motion";
import { Typography } from "@/components/ui/typography";

const differentiators = [
    {
        title: "Creativity Meets Engineering",
        description: "We don't just build systems that work; we architect intuitive, breathtaking experiences powered by deep logic.",
    },
    {
        title: "Business-First Mindset",
        description: "Every line of code and every AI agent is strictly aligned to drive revenue, slash costs, and accelerate your growth.",
    },
    {
        title: "End-to-End Ownership",
        description: "From napkin sketch to global deployment, we take absolute accountability. No hand-offs, no excuses.",
    },
];

export function WhyRadlabs() {
    return (
        <section className="py-32 relative text-white" id="why-radlabs">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div>
                    <Typography variant="h2" className="mb-6 lg:max-w-md">
                        Why Radlabs ?
                    </Typography>
                </div>

                <div className="flex flex-col gap-12">
                    {differentiators.map((diff, i) => (
                        <motion.div
                            key={diff.title}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="border-l border-brand-red pl-6"
                        >
                            <h3 className="text-2xl font-display font-bold mb-4">{diff.title}</h3>
                            <p className="text-neutral-400 font-sans leading-relaxed text-lg">{diff.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
