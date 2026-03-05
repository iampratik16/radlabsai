"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { FileDown, X, Send, ArrowRight } from "lucide-react";

// ── Gated Download Modal ─────────────────────────────────────────────────────
function BrochureModal({ onClose }: { onClose: () => void }) {
    const [formData, setFormData] = useState({
        name: "", email: "", company: "", message: ""
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        setErrorMsg("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    company: formData.company,
                    message: formData.message || "Requested brochure download.",
                }),
            });
            if (!res.ok) throw new Error("API error");

            setStatus("success");

            // Trigger PDF download automatically
            const link = document.createElement("a");
            link.href = "/radlabs-brochure.pdf";
            link.download = "Radlabs-Technical-Brochure.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch {
            setStatus("error");
            setErrorMsg("Something went wrong. Please email us at sales@radlabs.tech.");
        }
    };

    return (
        <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            {/* Blurred backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className="relative w-full max-w-lg bg-[#0c0c12] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            >
                {/* Ambient glow top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent" />

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors p-1 z-10"
                    aria-label="Close"
                >
                    <X size={20} />
                </button>

                <div className="p-8">
                    {status === "success" ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center text-center py-6"
                        >
                            <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mb-5">
                                <FileDown className="w-8 h-8 text-green-400" />
                            </div>
                            <h3 className="text-xl font-display font-bold text-white mb-2">Download Starting!</h3>
                            <p className="text-neutral-400 text-sm mb-6">
                                Your brochure is downloading now. Our team will also reach out to you shortly.
                            </p>
                            <Button
                                variant="outline"
                                onClick={onClose}
                                className="text-neutral-300 border-white/20 hover:bg-white/5"
                            >
                                Close
                            </Button>
                        </motion.div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center shrink-0">
                                    <FileDown className="w-5 h-5 text-brand-red" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-display font-bold text-white leading-tight">
                                        Get the Technical Brochure
                                    </h2>
                                    <p className="text-xs text-neutral-500 mt-0.5">
                                        Fill in your details and the PDF downloads instantly
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2 sm:col-span-1 space-y-1.5">
                                        <label htmlFor="dl-name" className="text-xs font-medium text-neutral-400">Full Name *</label>
                                        <input
                                            id="dl-name"
                                            name="name"
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-brand-red/40 focus:border-brand-red/50 transition-all"
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1 space-y-1.5">
                                        <label htmlFor="dl-email" className="text-xs font-medium text-neutral-400">Work Email *</label>
                                        <input
                                            id="dl-email"
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@company.com"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-brand-red/40 focus:border-brand-red/50 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="dl-company" className="text-xs font-medium text-neutral-400">Company Name</label>
                                    <input
                                        id="dl-company"
                                        name="company"
                                        type="text"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder="Acme Corp"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-brand-red/40 focus:border-brand-red/50 transition-all"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="dl-message" className="text-xs font-medium text-neutral-400">What are you looking to build?</label>
                                    <textarea
                                        id="dl-message"
                                        name="message"
                                        rows={3}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Brief description of your project or challenge..."
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-brand-red/40 focus:border-brand-red/50 transition-all resize-none"
                                    />
                                </div>

                                {status === "error" && (
                                    <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                                        {errorMsg}
                                    </p>
                                )}

                                <Button
                                    type="submit"
                                    variant="primary"
                                    disabled={status === "submitting"}
                                    className="w-full bg-brand-red hover:bg-brand-darkred text-white py-5 relative overflow-hidden group"
                                >
                                    <span className={`flex items-center justify-center gap-2 transition-transform duration-300 ${status === "submitting" ? "translate-y-[-150%]" : "translate-y-0"}`}>
                                        <FileDown size={16} />
                                        Download Brochure
                                    </span>
                                    {status === "submitting" && (
                                        <span className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        </span>
                                    )}
                                </Button>

                                <p className="text-[10px] text-neutral-600 text-center">
                                    Your details are stored securely and only used to send relevant updates from Radlabs.
                                </p>
                            </form>
                        </>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

// ── CTA Section ──────────────────────────────────────────────────────────────
export function CTASection() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
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
                            Let's Build Something <br className="hidden md:block" /> Remarkable
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
                        <a href="/contact" className="w-full sm:w-auto">
                            <Button variant="primary" size="lg" className="w-full sm:w-auto bg-white text-black group shadow-lg rounded-full font-semibold border border-transparent hover:text-brand-red hover:border-brand-red transition-all duration-300">
                                <span className="flex items-center gap-2">
                                    Book a Consultation
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Button>
                        </a>

                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => setModalOpen(true)}
                            className="w-full sm:w-auto text-white border-white/20 hover:border-brand-red/50 hover:bg-brand-red/10 transition-all duration-300 group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-red/0 via-brand-red/5 to-brand-red/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            <FileDown className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform relative z-10" />
                            <span className="relative z-10">View Technical Documentation</span>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Gated download modal */}
            <AnimatePresence>
                {modalOpen && <BrochureModal onClose={() => setModalOpen(false)} />}
            </AnimatePresence>
        </>
    );
}

