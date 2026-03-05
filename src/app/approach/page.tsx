"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { PageHeader } from "@/components/ui/PageHeader";
import { Typography } from "@/components/ui/typography";
import { CTASection } from "@/components/home/CTASection";
import { Search, PenTool, Code2, Rocket, ArrowRight } from "lucide-react";
import { useRef } from "react";

const methodologyOffensive = [
    {
        phase: "01",
        title: "Discover",
        tagline: "Understand business context and goals.",
        icon: Search,
        details: [
            "Deep-dive analysis of your proprietary data architecture.",
            "Stakeholder interviews to align technical goals with business outcomes.",
            "Identifying high-impact vectors for intelligent automation."
        ],
        alignment: "left",
        gradient: "from-neutral-500/20 to-neutral-900/20",
        accent: "text-neutral-300"
    },
    {
        phase: "02",
        title: "Design",
        tagline: "Architect the right, scalable solution.",
        icon: PenTool,
        details: [
            "Prototyping intuitive User Interfaces and User Experiences.",
            "Architecting resilient multi-agent orchestration frameworks.",
            "Establishing rigorous AI governance and data compliance protocols."
        ],
        alignment: "right",
        gradient: "from-brand-red/10 to-brand-darkred/20",
        accent: "text-brand-red"
    },
    {
        phase: "03",
        title: "Build",
        tagline: "Engineer to production standards and scale.",
        icon: Code2,
        details: [
            "Engineering robust data pipelines for real-time inference.",
            "Integrating custom LLMs and Retrieval-Augmented Generation (RAG).",
            "Developing custom modular frontends using modern web standards."
        ],
        alignment: "left",
        gradient: "from-brand-red/20 to-red-950/40",
        accent: "text-brand-red"
    },
    {
        phase: "04",
        title: "Deliver",
        tagline: "Deploy, measure outcomes, and iterate.",
        icon: Rocket,
        details: [
            "Seamless CI/CD deployment into enterprise environments.",
            "Rigorous security testing and observability implementation.",
            "Post-launch telemetry monitoring for continuous model improvement."
        ],
        alignment: "right",
        gradient: "from-red-600/20 to-black/40",
        accent: "text-red-500"
    },
];

export default function ApproachPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end end"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <div className="bg-black">
            <PageHeader
                title="Our Methodology"
                subtitle="Every engagement follows a disciplined, outcome-oriented process — from discovery to delivery. We measure success in engineering excellence and tangible business outcomes."
            />

            <section ref={containerRef} className="py-24 relative overflow-hidden">
                {/* Background Tech Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative">

                    {/* Central Scroll Line */}
                    <div className="absolute top-0 bottom-0 left-[28px] md:left-1/2 w-0.5 bg-white/5 md:-translate-x-1/2 z-0 hidden sm:block">
                        <motion.div
                            className="w-full bg-gradient-to-b from-brand-red via-brand-red to-transparent origin-top shadow-[0_0_15px_red]"
                            style={{ height: lineHeight }}
                        />
                    </div>

                    <div className="space-y-32">
                        {methodologyOffensive.map((step, index) => {
                            const isLeft = step.alignment === "left";
                            const Icon = step.icon;

                            return (
                                <div key={step.phase} className="relative z-10">
                                    <div className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${isLeft ? '' : 'md:flex-row-reverse'}`}>

                                        {/* Content Side */}
                                        <motion.div
                                            className={`flex-1 w-full ${isLeft ? 'md:text-right' : 'md:text-left'} ml-16 md:ml-0`}
                                            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.8, type: "spring" }}
                                        >
                                            <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm`}>
                                                <span className={`font-mono text-sm font-bold ${step.accent}`}>Phase {step.phase}</span>
                                            </div>

                                            <Typography variant="h3" className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                                                {step.title}
                                            </Typography>

                                            <p className="text-xl text-neutral-400 font-sans mb-8">
                                                {step.tagline}
                                            </p>

                                            <ul className={`space-y-4 inline-flex flex-col ${isLeft ? 'md:items-end text-left md:text-right' : 'md:items-start text-left'}`}>
                                                {step.details.map((detail, i) => (
                                                    <li key={i} className={`flex items-start gap-4 max-w-lg ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                                                        <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                                            <ArrowRight className={`w-3 h-3 ${step.accent} ${isLeft ? 'rotate-180 md:rotate-0' : ''}`} />
                                                        </div>
                                                        <span className="text-neutral-400 leading-relaxed font-sans">{detail}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>

                                        {/* Central Node */}
                                        <motion.div
                                            className="absolute left-[8px] md:relative md:left-auto md:w-32 md:h-32 flex-shrink-0 flex items-center justify-center"
                                            initial={{ scale: 0, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.5, delay: 0.3 }}
                                        >
                                            {/* Glowing Background Orb */}
                                            <div className={`absolute inset-[-50%] rounded-full bg-gradient-to-br ${step.gradient} blur-[40px] opacity-50 pointer-events-none`} />

                                            {/* Icon Container */}
                                            <div className={`card-lift relative w-12 h-12 md:w-20 md:h-20 rounded-2xl bg-black border border-white/20 flex items-center justify-center shadow-[0_0_30px_rgba(255,0,0,0.15)] z-10 overflow-hidden group`}>
                                                <div className="absolute inset-0 bg-white/5 group-hover:bg-brand-red/10 transition-colors duration-500" />
                                                <Icon className={`icon-hover w-6 h-6 md:w-8 md:h-8 ${step.accent} relative z-10 transition-transform duration-500`} />

                                                {/* Corner Accents */}
                                                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/50" />
                                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/50" />
                                            </div>
                                        </motion.div>

                                        {/* Spacer to keep flex balanced on desktop */}
                                        <div className="hidden md:block flex-1" />

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <CTASection />
        </div>
    );
}
