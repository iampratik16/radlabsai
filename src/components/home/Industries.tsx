"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Typography } from "@/components/ui/typography";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const industries = [
    {
        name: "Finance",
        useCases: ["Fraud Detection", "Algorithmic Risk Assessment", "Automated Compliance"],
        metric: "45% reduction in manual review",
    },
    {
        name: "Healthcare & Life Sciences",
        useCases: ["Medical Imaging AI", "Patient Triaging", "Genomic Data Pipelines"],
        metric: "3x faster diagnostics parsing",
    },
    {
        name: "Retail & E-Commerce",
        useCases: ["Hyper-personalization", "Demand Forecasting", "Dynamic Pricing Models"],
        metric: "22% lift in conversion rates",
    },
    {
        name: "Startups & Scale-ups",
        useCases: ["Rapid MVP AI Integration", "Growth Hacking Agents", "Tech Debt Automation"],
        metric: "Accelerated Series A milestones",
    },
];

export function Industries() {
    const targetRef = useRef<HTMLDivElement>(null);
    const stripRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Use useTransform with a mapper function so it dynamically reads the strip width
    // every time scrollYProgress changes — no stale state issues
    const x = useTransform(scrollYProgress, (progress) => {
        if (!stripRef.current) return 0;
        const totalWidth = stripRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const maxScroll = Math.max(0, totalWidth - viewportWidth);
        return -progress * maxScroll;
    });

    return (
        <section ref={targetRef} className="relative h-[200vh] bg-black" id="industries">
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden pt-20">
                <div className="max-w-7xl mx-auto px-6 w-full mb-12">
                    <Typography variant="h2" className="text-white">
                        Industries We Serve
                    </Typography>
                    <Typography variant="p" className="text-neutral-400 max-w-xl mt-4">
                        Domain-specific execution that drives measurable business impact.
                    </Typography>
                </div>

                <motion.div
                    ref={stripRef}
                    style={{ x }}
                    className="flex gap-6 pl-6 pr-6 md:pl-24 md:pr-24 w-max"
                >
                    {industries.map((ind) => (
                        <Card key={ind.name} className="card-lift w-[400px] shrink-0 h-[450px] flex flex-col bg-neutral-950 border-white/10 hover:border-brand-darkred/50">
                            <CardHeader className="border-b border-white/5 pb-6">
                                <CardTitle className="text-2xl text-white">{ind.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <h5 className="font-semibold text-white/80 mb-4 font-display">Key AI Use Cases</h5>
                                    <ul className="space-y-3">
                                        {ind.useCases.map((uc) => (
                                            <li key={uc} className="flex items-center gap-3 text-neutral-400">
                                                <span className="w-1.5 h-1.5 rounded-full bg-brand-darkred" />
                                                {uc}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-8 p-4 rounded-xl bg-brand-darkred/10 border border-brand-darkred/20">
                                    <span className="block text-brand-darkred font-semibold text-lg">
                                        {ind.metric}
                                    </span>
                                    <span className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">Outcome</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
