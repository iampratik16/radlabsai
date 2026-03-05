"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/ui/PageHeader";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Send, Mail, MapPin } from "lucide-react";
import React, { useState } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        message: ""
    });

    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                // Safely check if the response is actually JSON before parsing
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    const data = await response.json();
                    throw new Error(data.error || "Failed to send message");
                } else {
                    throw new Error("Server error: Unable to process request. Please make sure the API key is configured.");
                }
            }

            setStatus("success");
            setFormData({ name: "", email: "", company: "", message: "" });
        } catch (error) {
            console.error("Submission error:", error);
            setStatus("error");
            setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred. Please try again.");
        }
    };

    return (
        <>
            <PageHeader
                title="Book a Consultation"
                subtitle="Ready to transform your operations with intelligent systems? Let's discuss your business objectives and how Radlabs can help."
            />

            <section className="pb-32 relative text-white max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* Contact Information */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col justify-center"
                >
                    <Typography variant="h3" className="mb-6">
                        Get in Touch
                    </Typography>
                    <Typography variant="p" className="text-neutral-400 mb-12">
                        Whether you are looking for custom AI models, scalable software, or strategic AI consulting, our team is ready to engineer a robust solution tailored to your goals.
                    </Typography>

                    <div className="space-y-8" suppressHydrationWarning>
                        <div className="flex items-center gap-4 group" suppressHydrationWarning>
                            <div className="card-lift w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-brand-red/10 group-hover:border-[var(--color-fire-neon)]/50 transition-all" suppressHydrationWarning>
                                <Mail className="icon-hover w-5 h-5 text-neutral-400 group-hover:text-brand-red" />
                            </div>
                            <div suppressHydrationWarning>
                                <p className="text-sm text-neutral-500 font-display tracking-widest uppercase mb-1">Email Us</p>
                                <a href="mailto:sales@radlabs.tech" className="text-lg font-medium text-white hover:text-brand-red transition-colors">
                                    sales@radlabs.tech
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 group" suppressHydrationWarning>
                            <div className="card-lift w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-brand-red/10 group-hover:border-[var(--color-fire-neon)]/50 transition-all" suppressHydrationWarning>
                                <MapPin className="icon-hover w-5 h-5 text-neutral-400 group-hover:text-brand-red" />
                            </div>
                            <div>
                                <p className="text-sm text-neutral-500 font-display tracking-widest uppercase mb-1">Location</p>
                                <p className="text-lg font-medium text-white">
                                    Global / Remote
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl"
                    suppressHydrationWarning
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-red/5 to-transparent rounded-3xl" suppressHydrationWarning />

                    {status === "success" ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative z-10 flex flex-col items-center justify-center text-center py-16 px-8 h-full min-h-[400px]"
                        >
                            <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                                <Send className="w-10 h-10 text-green-500 translate-x-1 -translate-y-1" />
                            </div>
                            <Typography variant="h3" className="text-white mb-4">
                                Message Sent!
                            </Typography>
                            <Typography variant="p" className="text-neutral-400">
                                Thank you, our engineering team will review your inquiry and connect with you shortly.
                            </Typography>
                            <Button
                                variant="outline"
                                className="mt-8 text-neutral-300 border-white/20 hover:bg-white/5"
                                onClick={() => setStatus("idle")}
                            >
                                Send Another Message
                            </Button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="relative z-10 space-y-6" suppressHydrationWarning>
                            {/* Form fields remain the same */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" suppressHydrationWarning>
                                <div className="space-y-2" suppressHydrationWarning>
                                    <label htmlFor="name" className="text-sm font-medium text-neutral-300">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2" suppressHydrationWarning>
                                    <label htmlFor="email" className="text-sm font-medium text-neutral-300">Work Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red transition-all"
                                        placeholder="john@company.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="company" className="text-sm font-medium text-neutral-300">Company Name</label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red transition-all"
                                    placeholder="Acme Corp"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-neutral-300">How can we help?</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red transition-all resize-none"
                                    placeholder="Tell us about your project or objectives..."
                                />
                            </div>

                            {status === "error" && (
                                <div className="p-4 rounded-xl relative border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
                                    {errorMessage}
                                </div>
                            )}

                            <Button
                                type="submit"
                                variant="primary"
                                disabled={status === "submitting"}
                                className="w-full bg-brand-red hover:bg-brand-darkred text-white py-6 relative overflow-hidden group"
                            >
                                <span className={`flex items-center justify-center gap-2 text-lg transition-transform duration-300 ${status === "submitting" ? 'translate-y-[-150%]' : 'translate-y-0'}`}>
                                    Send Message <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                                {status === "submitting" && (
                                    <span className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    </span>
                                )}
                            </Button>
                        </form>
                    )}
                </motion.div>

            </section>
        </>
    );
}
