"use client";

import { motion } from "framer-motion";
import { Typography } from "@/components/ui/typography";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    BrainCircuit, Code2, Globe2, Sparkles, Network,
    Megaphone, SearchCheck, Star
} from "lucide-react";

// ── Hero / flagship services (AI-first) ─────────────────────────────────────
const heroServices = [
    {
        title: "Artificial Intelligence",
        badge: "Core Offering",
        description:
            "End-to-end AI architecture: custom ML models, LLM integration, RAG pipelines, agentic workflow automation, and enterprise data solutions. We don't bolt AI on — we engineer it from the ground up.",
        bullets: ["Custom LLM & RAG Systems", "Agentic Workflow Automation", "Predictive Analytics", "AI Governance & Observability"],
        icon: BrainCircuit,
        span: "lg:col-span-2",
        accent: true,
    },
    {
        title: "AI Consulting",
        badge: "Core Offering",
        description:
            "Strategic advisory for enterprises ready to operationalise AI. From ROI-driven roadmaps to responsible AI governance frameworks — we translate technical possibility into business reality.",
        bullets: ["AI Readiness Audits", "Implementation Roadmaps", "Vendor & Stack Selection", "Risk & Compliance Advisory"],
        icon: Network,
        span: "lg:col-span-1",
        accent: true,
    },
];

// ── Supporting services ──────────────────────────────────────────────────────
const supportingServices = [
    {
        title: "Software Development",
        description: "Scalable, high-performance backends, APIs, and complex full-stack web applications built for production from day one.",
        icon: Code2,
    },
    {
        title: "Website Development",
        description: "24-hour AI-powered delivery of stunning, conversion-optimised corporate platforms — designed and shipped at machine speed.",
        icon: Globe2,
    },
    {
        title: "AI-Powered Digital Marketing",
        description: "Intelligent campaigns that learn, adapt and optimise in real time — AI content generation, audience targeting, and performance analytics fused into one growth engine.",
        icon: Megaphone,
    },
    {
        title: "SEO & Search Intelligence",
        description: "AI-driven keyword strategy, semantic content optimisation, and technical SEO — engineered to dominate search rankings and build lasting organic authority.",
        icon: SearchCheck,
    },
    {
        title: "Branding",
        description: "Premium digital identities — visual systems, messaging frameworks, and brand strategy — that position you as an undeniable industry leader.",
        icon: Sparkles,
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ServicesGrid() {
    return (
        <section className="pb-32 relative" id="services">
            <div className="max-w-7xl mx-auto px-6">



                {/* ── Hero row: AI + AI Consulting ─────────────────────────── */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6"
                >
                    {heroServices.map((svc) => {
                        const Icon = svc.icon;
                        return (
                            <motion.div key={svc.title} variants={itemVariants} className={svc.span}>
                                <Card className="card-lift h-full group relative overflow-hidden border-brand-red/30 bg-white/[0.04] hover:bg-white/[0.08] hover:border-brand-red/60 transition-all duration-500">
                                    {/* Ambient glow */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-red/10 via-transparent to-transparent pointer-events-none" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-red/5 to-brand-darkred/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    <CardHeader>
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="w-14 h-14 rounded-2xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-red/20 transition-all duration-300">
                                                <Icon className="icon-hover w-7 h-7 text-brand-red" />
                                            </div>
                                            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-red bg-brand-red/10 border border-brand-red/20 px-3 py-1 rounded-full">
                                                <Star className="w-2.5 h-2.5" />
                                                {svc.badge}
                                            </span>
                                        </div>
                                        <CardTitle className="text-white text-xl group-hover:text-brand-red transition-colors duration-300">
                                            {svc.title}
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent>
                                        <p className="text-neutral-400 leading-relaxed font-sans group-hover:text-neutral-300 transition-colors duration-300 mb-6">
                                            {svc.description}
                                        </p>
                                        <ul className="space-y-2">
                                            {svc.bullets.map((b) => (
                                                <li key={b} className="flex items-center gap-2 text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors">
                                                    <span className="w-1 h-1 rounded-full bg-brand-red shrink-0" />
                                                    {b}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Divider label */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-px flex-1 bg-white/8" />
                    <span className="text-xs font-semibold tracking-widest uppercase text-neutral-500">Supporting Services</span>
                    <div className="h-px flex-1 bg-white/8" />
                </div>

                {/* ── Supporting services grid ──────────────────────────────── */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {supportingServices.map((svc, index) => {
                        const Icon = svc.icon;
                        // Give first supporting card a wider span so 5 items fill the grid cleanly (2+1+1+1 = nope, just do 2+3)
                        const isWide = index === 0;
                        return (
                            <motion.div key={svc.title} variants={itemVariants} className={isWide ? "md:col-span-2 lg:col-span-1" : ""}>
                                <Card className="card-lift h-full group hover:border-brand-red/40 hover:bg-white/10 transition-all duration-500 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-red/5 to-brand-darkred/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    <CardHeader>
                                        <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-brand-red/40 transition-all duration-300">
                                            <Icon className="icon-hover w-5 h-5 text-brand-red" />
                                        </div>
                                        <CardTitle className="text-white group-hover:text-brand-red transition-colors duration-300 text-base">
                                            {svc.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-neutral-400 leading-relaxed font-sans text-sm group-hover:text-neutral-300 transition-colors duration-300">
                                            {svc.description}
                                        </p>
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
