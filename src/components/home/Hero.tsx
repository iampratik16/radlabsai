"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                <div className="w-[800px] h-[800px] bg-brand-darkred rounded-full blur-[120px] mix-blend-screen" />
                <div className="w-[600px] h-[600px] bg-brand-red rounded-full blur-[100px] mix-blend-screen absolute translate-x-1/3 translate-y-1/3" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-red/30 bg-brand-red/10 backdrop-blur-sm mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                    <span className="text-sm font-medium text-brand-red font-sans tracking-wide uppercase">
                        Enterprise AI Engineering
                    </span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                >
                    <Typography variant="h1" className="text-white max-w-5xl leading-[1.1]">
                        AI Partners. <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-darkred to-brand-red animate-gradient-x">
                            Limitless Vision.
                        </span>
                    </Typography>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="mt-8 max-w-2xl"
                >
                    <Typography variant="lead" className="text-neutral-300">
                        Blending creativity, engineering & innovation to build intelligent systems that accelerate modern business growth.
                    </Typography>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="mt-12 flex flex-col sm:flex-row items-center gap-4"
                >
                    <div className="relative group w-full sm:w-auto">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-red via-brand-darkred to-brand-red rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500 bg-[length:200%_auto] hover:animate-gradient-x" />
                        <Button variant="primary" size="lg" className="relative w-full sm:w-auto bg-white text-black font-semibold hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 border-none shadow-xl">
                            <span className="relative z-10 flex items-center">
                                Book AI Consultation
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Button>
                    </div>
                    <div className="relative group w-full sm:w-auto">
                        <div className="absolute -inset-0.5 bg-white/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500" />
                        <Button variant="outline" size="lg" className="relative w-full sm:w-auto text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-md">
                            Explore Capabilities
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
