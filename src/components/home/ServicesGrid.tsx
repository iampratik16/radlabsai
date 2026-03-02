"use client";

import { motion } from "framer-motion";
import { Typography } from "@/components/ui/typography";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BrainCircuit, Code2, Globe2, Sparkles, Network, ArrowRight } from "lucide-react";

const services = [
    {
        title: "Artificial Intelligence",
        description: "Custom ML models, predictive analytics, and enterprise data solutions.",
        icon: BrainCircuit,
    },
    {
        title: "Software Development",
        description: "Scalable, high-performance backends and complex web applications.",
        icon: Code2,
    },
    {
        title: "Website Development",
        description: "24-hour AI-powered delivery of stunning, modern corporate platforms.",
        icon: Globe2,
    },
    {
        title: "Branding",
        description: "Premium digital identities that position you as an industry leader.",
        icon: Sparkles,
    },
    {
        title: "AI Consulting",
        description: "Strategic guidance on integrating AI securely within enterprise constraints.",
        icon: Network,
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ServicesGrid() {
    return (
        <section className="py-32 relative group/section" id="services">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col items-center mb-16 text-center">
                    <Typography variant="h2" className="text-white">
                        What We Build
                    </Typography>
                    <Typography variant="p" className="max-w-2xl mt-4">
                        We deliver production-ready systems combining beautiful interfaces with heavy computational power.
                    </Typography>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        // Make the first card span 2 cols on lg screens to create dynamic grid
                        const isFirst = index === 0;
                        return (
                            <motion.div key={service.title} variants={itemVariants} className={isFirst ? "lg:col-span-2" : ""}>
                                <Card className="h-full group hover:border-brand-red/50 hover:bg-white/10 transition-all duration-500 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-red/5 to-brand-darkred/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <CardHeader>
                                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-brand-red/50 transition-all duration-300">
                                            <Icon className="w-6 h-6 text-brand-red group-hover:text-brand-darkred transition-colors duration-300" />
                                        </div>
                                        <CardTitle className="text-white group-hover:text-brand-red transition-colors duration-300">
                                            {service.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-neutral-400 leading-relaxed font-sans group-hover:text-neutral-300 transition-colors duration-300">
                                            {service.description}
                                        </p>

                                        <div className="mt-8 flex items-center text-sm font-medium text-brand-red opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                            Learn more <ArrowRight className="ml-1 w-4 h-4" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
