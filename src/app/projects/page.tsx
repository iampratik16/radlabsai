"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { projects } from "@/data/projects";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CTASection } from "@/components/home/CTASection";

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-black">
            <PageHeader
                title="Our Case Studies"
                subtitle="Explore our track record of transforming obscurity into market dominance through custom AI architecture and data-driven strategy."
            />

            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <Link key={project.slug} href={`/projects/${project.slug}`}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="card-lift group relative h-full rounded-2xl border border-white/10 bg-white/5 p-8 overflow-hidden hover:border-white/30 transition-colors duration-500 cursor-pointer flex flex-col"
                            >
                                {/* Background Hover Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-red/0 via-transparent to-transparent group-hover:from-brand-red/10 transition-colors duration-500 z-0" />

                                <div className="relative z-10 flex flex-col flex-grow">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="inline-block px-3 py-1 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider text-brand-red">
                                            {project.service}
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-red transition-all duration-300 transform group-hover:scale-110 group-hover:-translate-y-1 group-hover:translate-x-1">
                                            <ArrowUpRight className="w-5 h-5 text-white" />
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-brand-red transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-neutral-400 text-sm mb-6 flex-grow">
                                        {project.subtitle}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                                        {project.metrics.slice(0, 2).map((metric, i) => (
                                            <div key={i}>
                                                <div className="text-xl font-bold text-white">{metric.value}</div>
                                                <div className="text-xs text-neutral-500 uppercase tracking-wider mt-1">{metric.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>

            <CTASection />
        </main>
    );
}
