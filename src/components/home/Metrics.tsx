"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Typography } from "@/components/ui/typography";

interface CounterProps {
    end: number;
    suffix?: string;
    duration?: number;
    label: string;
}

function AnimatedCounter({ end, suffix = "", duration = 2, label }: CounterProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            let startTime: number;
            const step = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
                setCount(Math.floor(progress * end));
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
    }, [isInView, end, duration]);

    return (
        <div ref={ref} className="flex flex-col items-center text-center p-6 border border-white/5 rounded-2xl bg-white/5 backdrop-blur-sm">
            <div className="text-5xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-white mb-2">
                {count}{suffix}
            </div>
            <div className="text-sm font-semibold tracking-wide text-neutral-400 uppercase font-sans">
                {label}
            </div>
        </div>
    );
}

export function Metrics() {
    return (
        <section className="py-24 relative border-y border-white/10 bg-black/50">
            <div className="max-w-7xl mx-auto px-6">
                <Typography variant="h2" className="text-center mb-12 text-white">
                    Proof & Metrics
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <AnimatedCounter end={40} suffix="%" label="Faster Time-to-Market" />
                    <AnimatedCounter end={3} suffix="x" label="Operational Efficiency" />
                    <AnimatedCounter end={100} suffix="%" label="Production-Ready Delivery" />
                </div>
            </div>
        </section>
    );
}
