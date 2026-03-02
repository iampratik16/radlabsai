"use client";

import { motion } from "framer-motion";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
    return (
        <section className="py-32 relative text-white border-t border-white/5 bg-gradient-to-b from-transparent to-brand-red/5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(59,130,246,0.15)_0%,rgba(0,0,0,0)_50%)] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography variant="h2" className="text-4xl md:text-5xl font-display font-bold leading-tight">
                        Let’s Build Something <br className="hidden md:block" /> Remarkable
                    </Typography>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Typography variant="p" className="text-xl text-neutral-400 max-w-2xl mx-auto">
                        Ready to integrate powerful AI architecture into your operations? Partner with Radlabs to architect the future of your enterprise.
                    </Typography>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Button variant="primary" size="lg" className="bg-white text-black hover:bg-neutral-200 group w-full sm:w-auto">
                        Schedule Architecture Review
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" size="lg" className="text-white w-full sm:w-auto">
                        View Technical Documentation
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
