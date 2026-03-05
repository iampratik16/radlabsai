"use client";

import { motion } from "framer-motion";
import { Typography } from "@/components/ui/typography";

interface PageHeaderProps {
    title: string;
    subtitle: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
    return (
        <section className="relative pt-40 pb-20 overflow-hidden">
            <div className="absolute inset-0 z-0" suppressHydrationWarning>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-red/10 rounded-full blur-[120px] opacity-50 mix-blend-screen" suppressHydrationWarning />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center" suppressHydrationWarning>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Typography variant="h1" className="text-shimmer-hover mb-6 tracking-tight drop-shadow-md">
                        {title}
                    </Typography>
                    <Typography variant="p" className="text-xl md:text-2xl text-neutral-400 font-sans max-w-3xl mx-auto leading-relaxed">
                        {subtitle}
                    </Typography>
                </motion.div>

                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                    className="h-px w-32 bg-gradient-to-r from-transparent via-brand-red to-transparent mx-auto mt-12"
                />
            </div>
        </section>
    );
}
