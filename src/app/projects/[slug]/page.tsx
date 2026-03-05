import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/home/CTASection";
import { ArrowLeft, CheckCircle2, ChevronRight, BarChart3, Target, Zap, Clock } from "lucide-react";
import Link from "next/link";
import { Typography } from "@/components/ui/typography";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export function generateStaticParams() {
    return projects.map((p) => ({
        slug: p.slug,
    }));
}

export default async function ProjectPage({ params }: PageProps) {
    const resolvedParams = await params;
    const project = projects.find((p) => p.slug === resolvedParams.slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-16 selection:bg-brand-red/30">
            {/* Context/Back Link */}
            <div className="max-w-4xl mx-auto px-6 mb-12">
                <Link href="/projects" className="link-underline-swipe inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium tracking-wide uppercase mt-1">Back to Projects</span>
                </Link>
            </div>

            {/* Hero Section */}
            <article className="max-w-4xl mx-auto px-6">
                <header className="mb-20">
                    <div className="inline-flex flex-wrap items-center gap-4 mb-8">
                        <span className="px-3 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider text-brand-red">
                            {project.industry}
                        </span>
                        <span className="text-neutral-500">•</span>
                        <span className="text-sm text-neutral-400 flex items-center gap-2">
                            <Target className="w-4 h-4" /> {project.region}
                        </span>
                        <span className="text-neutral-500">•</span>
                        <span className="text-sm text-neutral-400 flex items-center gap-2">
                            <Clock className="w-4 h-4" /> {project.timeline}
                        </span>
                    </div>

                    <Typography variant="h1" className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-8 leading-[1.1]">
                        {project.title}
                    </Typography>

                    <p className="text-xl md:text-3xl text-neutral-300 font-light leading-relaxed border-l-4 border-brand-red pl-6">
                        {project.subtitle}
                    </p>
                </header>

                {/* Core Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    {project.metrics.map((metric, i) => (
                        <div key={i} className="card-lift p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <BarChart3 className="icon-hover w-16 h-16 text-brand-red" />
                            </div>
                            <div className="relative z-10">
                                <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2 tracking-tight group-hover:text-brand-red transition-colors">
                                    {metric.value}
                                </div>
                                <div className="text-sm font-medium text-neutral-300 uppercase tracking-wider mb-2">
                                    {metric.label}
                                </div>
                                <div className="text-xs text-neutral-500">
                                    {metric.context}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Content Body */}
                <div className="prose prose-invert prose-lg max-w-none text-neutral-300">

                    {/* Executive Summary */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-display font-bold text-white mb-6 flex items-center gap-3">
                            <Zap className="w-6 h-6 text-brand-red" /> Executive Summary
                        </h2>
                        {project.content.executiveSummary.split('\n\n').map((paragraph, i) => (
                            <p key={i} className="leading-relaxed mb-4">{paragraph}</p>
                        ))}
                    </div>

                    {/* The Challenge */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-display font-bold text-white mb-6">The Challenge</h2>
                        {project.content.theChallenge.split('\n\n').map((paragraph, i) => (
                            <p key={i} className="leading-relaxed mb-4">{paragraph}</p>
                        ))}
                    </div>

                    {/* Approach & Pillars */}
                    <div className="mb-16 p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
                        <h2 className="text-3xl font-display font-bold text-white mb-6">The Radlabs Approach</h2>
                        <p className="lead text-xl text-neutral-200 mb-10">{project.content.approachIntro}</p>

                        <div className="space-y-8">
                            {project.content.pillars.map((pillar, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <CheckCircle2 className="w-6 h-6 text-brand-red" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">{pillar.title}</h3>
                                        {pillar.description.split('\n\n').map((desc, j) => (
                                            <p key={j} className="text-neutral-400 mb-3">{desc}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-display font-bold text-white mb-8">The 7-Day Execution Timeline</h2>
                        <div className="space-y-6">
                            {project.content.executionTimeline.map((step, i) => (
                                <div key={i} className="flex gap-6 items-start group">
                                    <div className="flex-shrink-0 w-24 pt-1">
                                        <div className="text-sm font-bold text-brand-red uppercase tracking-wider">{step.days}</div>
                                    </div>
                                    <div className="flex-grow pb-6 border-b border-white/10 group-last:border-0 relative">
                                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                        <p className="text-neutral-400 m-0">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Results Table */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-display font-bold text-white mb-8">The Results: Day 0 vs. Day 7</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b-2 border-white/20">
                                        <th className="py-4 font-semibold text-neutral-300">Metric</th>
                                        <th className="py-4 font-semibold text-neutral-300">Day 0 — Baseline</th>
                                        <th className="py-4 font-semibold text-brand-red">Day 7 — Post-Radlabs</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {project.content.results.map((result, i) => (
                                        <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="py-4 pr-4 font-medium text-white">{result.metric}</td>
                                            <td className="py-4 pr-4 text-neutral-400">{result.day0}</td>
                                            <td className="py-4 text-brand-red font-semibold flex items-center gap-2">
                                                {result.day7} <ChevronRight className="w-4 h-4" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Deep Dives */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-4">{project.content.headlineAchievement.title}</h3>
                            <p className="text-neutral-400 text-sm">{project.content.headlineAchievement.content}</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-4">{project.content.aiOverview.title}</h3>
                            <p className="text-neutral-400 text-sm">{project.content.aiOverview.content}</p>
                        </div>
                    </div>

                    {/* The Radlabs Difference */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-display font-bold text-white mb-6">{project.content.radlabsDifference.title}</h2>
                        {project.content.radlabsDifference.content.map((paragraph, i) => (
                            <p key={i} className="leading-relaxed mb-4">{paragraph}</p>
                        ))}
                    </div>

                    {/* Next Steps */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-display font-bold text-white mb-6">{project.content.nextSteps.title}</h2>
                        <ul className="list-disc pl-5 space-y-3 text-neutral-400">
                            {project.content.nextSteps.content.map((step, i) => (
                                <li key={i}>{step}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Conclusion */}
                    <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-brand-red/20 to-black border border-brand-red/30 relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl font-display font-bold text-white mb-6">Conclusion</h2>
                            {project.content.conclusion.split('\n\n').map((paragraph, i) => (
                                <p key={i} className={`leading-relaxed ${i === project.content.conclusion.split('\n\n').length - 1 ? 'text-xs text-neutral-500 mt-8' : 'text-neutral-200 mb-4'}`}>
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </article>

            <div className="mt-24">
                <CTASection />
            </div>
        </main>
    );
}
