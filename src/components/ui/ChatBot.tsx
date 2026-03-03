"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, ChevronDown, Sparkles } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type Role = "bot" | "user";
type Step =
    | "greeting"
    | "faq"
    | "collect_name"
    | "collect_email"
    | "collect_company"
    | "collect_message"
    | "submitting"
    | "done"
    | "error";

interface Message {
    id: string;
    role: Role;
    text: string;
    chips?: string[];
}

interface LeadData {
    name: string;
    email: string;
    company: string;
    message: string;
}

// ─── FAQ knowledge base ───────────────────────────────────────────────────────
const FAQ_CHIPS = [
    "What do you build?",
    "How long does it take?",
    "How much does it cost?",
    "Start a project →",
];

const FAQ_ANSWERS: Record<string, string> = {
    "What do you build?":
        "We build custom AI systems, agentic workflows, LLM integrations, RAG pipelines, and full-stack software products. Think of us as your end-to-end AI engineering partner — from architecture to production deployment. 🚀",
    "How long does it take?":
        "Timelines depend on scope. A focused AI feature or integration typically takes 2–4 weeks. A full-scale agentic platform usually runs 6–12 weeks. We always ship fast without cutting corners.",
    "How much does it cost?":
        "Every engagement is custom-scoped. We focus on delivering measurable ROI — most clients see a 3x efficiency gain within the first quarter. The best next step is a free 30-minute consultation call where we scope your requirements together. 🤝",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function uid() {
    return Math.random().toString(36).slice(2);
}

function botMsg(text: string, chips?: string[]): Message {
    return { id: uid(), role: "bot", text, chips };
}

function userMsg(text: string): Message {
    return { id: uid(), role: "user", text };
}

const GREETING = botMsg(
    "Hey there! 👋 I'm Rad, the Radlabs AI assistant. I can answer your questions about what we do, or help you start a conversation with the team. What would you like to know?",
    FAQ_CHIPS
);

function emailValid(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

// ─── Component ────────────────────────────────────────────────────────────────
export function ChatBot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([GREETING]);
    const [step, setStep] = useState<Step>("greeting");
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const [lead, setLead] = useState<LeadData>({ name: "", email: "", company: "", message: "" });
    const [pulse, setPulse] = useState(true);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Stop pulse after first open
    useEffect(() => {
        if (open) setPulse(false);
    }, [open]);

    // Scroll to bottom whenever messages change
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, typing]);

    // Focus input whenever step changes (not on done/submitting)
    useEffect(() => {
        if (open && step !== "done" && step !== "submitting" && step !== "error") {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [step, open]);

    const pushBot = useCallback((text: string, chips?: string[]) => {
        setTyping(true);
        setTimeout(() => {
            setTyping(false);
            setMessages((prev) => [...prev, botMsg(text, chips)]);
        }, 900);
    }, []);

    const handleSend = useCallback(
        async (raw: string) => {
            const text = raw.trim();
            if (!text) return;
            setInput("");

            // Add user message to chat
            setMessages((prev) => [...prev, userMsg(text)]);

            // ── Step machine ──────────────────────────────────────────────────────
            if (step === "greeting" || step === "faq") {
                // Check if it's a FAQ chip or free-text FAQ match
                const faqKey = Object.keys(FAQ_ANSWERS).find(
                    (k) => k.toLowerCase() === text.toLowerCase() || text.toLowerCase().includes(k.split(" ")[1].toLowerCase())
                );

                if (text === "Start a project →" || text.toLowerCase().includes("start")) {
                    setStep("collect_name");
                    pushBot(
                        "Great, let's make it happen! I'll need a few quick details to get you connected with our team. First — what's your full name?"
                    );
                    return;
                }

                if (faqKey) {
                    setStep("faq");
                    setTyping(true);
                    setTimeout(() => {
                        setTyping(false);
                        setMessages((prev) => [
                            ...prev,
                            botMsg(FAQ_ANSWERS[faqKey], ["Start a project →", "Ask something else"]),
                        ]);
                    }, 900);
                    return;
                }

                if (text.toLowerCase() === "ask something else") {
                    pushBot("Sure! Here's what I can help with:", FAQ_CHIPS);
                    return;
                }

                // Free-text catch-all
                setStep("collect_name");
                pushBot(
                    `Great question! Our team would be best placed to give you a thorough answer. Let me connect you with them. What's your full name?`
                );
                return;
            }

            if (step === "collect_name") {
                if (text.length < 2) {
                    pushBot("Could you share your full name? (at least 2 characters)");
                    return;
                }
                const firstName = text.split(" ")[0];
                setLead((prev) => ({ ...prev, name: text }));
                setStep("collect_email");
                pushBot(`Nice to meet you, ${firstName}! 😊 What's your work email address?`);
                return;
            }

            if (step === "collect_email") {
                if (!emailValid(text)) {
                    pushBot("Hmm, that doesn't look like a valid email. Could you double-check it?");
                    return;
                }
                setLead((prev) => ({ ...prev, email: text }));
                setStep("collect_company");
                pushBot("Perfect! What company or organisation are you with?");
                return;
            }

            if (step === "collect_company") {
                setLead((prev) => ({ ...prev, company: text }));
                setStep("collect_message");
                pushBot(
                    "Almost there! Briefly describe what you're looking to build or the challenge you'd like us to solve:"
                );
                return;
            }

            if (step === "collect_message") {
                if (text.length < 10) {
                    pushBot("Could you share a bit more detail? (at least 10 characters)");
                    return;
                }
                const finalLead = { ...lead, message: text };
                setLead(finalLead);
                setStep("submitting");

                setTyping(true);
                try {
                    const res = await fetch("/api/contact", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(finalLead),
                    });

                    if (!res.ok) throw new Error("API error");

                    setTyping(false);
                    setStep("done");
                    setMessages((prev) => [
                        ...prev,
                        botMsg(
                            `You're all set, ${finalLead.name.split(" ")[0]}! 🎉 Your details have been sent to the Radlabs team. Expect a reply at **${finalLead.email}** within 1 business day. Talk soon!`
                        ),
                    ]);
                } catch {
                    setTyping(false);
                    setStep("error");
                    setMessages((prev) => [
                        ...prev,
                        botMsg(
                            "Oops — something went wrong on our end. Please email us directly at **sales@radlabs.tech** and we'll get back to you ASAP."
                        ),
                    ]);
                }
                return;
            }
        },
        [step, lead, pushBot]
    );

    const handleChip = (chip: string) => handleSend(chip);

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend(input);
        }
    };

    const inputDisabled = step === "submitting" || step === "done" || step === "error";
    const showInput = step !== "done" && step !== "error";

    return (
        <>
            {/* ── Floating trigger button ─────────────────────────────────────────── */}
            <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100]" suppressHydrationWarning>
                <AnimatePresence>
                    {!open && (
                        <motion.button
                            key="fab"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            onClick={() => setOpen(true)}
                            aria-label="Open chat"
                            className="relative w-16 h-16 md:w-[72px] md:h-[72px] rounded-3xl bg-gradient-to-br from-brand-red to-red-900 shadow-[0_0_30px_rgba(255,51,51,0.4)] flex items-center justify-center text-white hover:scale-110 hover:shadow-[0_0_50px_rgba(255,51,51,0.8)] hover:-translate-y-2 active:scale-95 transition-all duration-300 border border-white/20 group overflow-hidden"
                        >
                            {/* Pulse ring */}
                            {pulse && (
                                <span className="absolute inset-0 rounded-3xl bg-brand-red animate-ping opacity-40" />
                            )}
                            {/* Glass overlay */}
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
                                <Bot className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-yellow-300 absolute -top-2 -right-2 animate-pulse drop-shadow-md" />
                            </div>
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* ── Chat panel ──────────────────────────────────────────────────── */}
                <AnimatePresence>
                    {open && (
                        <motion.div
                            key="panel"
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 40, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                            className="
                absolute bottom-0 right-0
                w-[92vw] sm:w-[400px]
                max-h-[85vh]
                flex flex-col
                rounded-2xl
                border border-white/10
                bg-[#0a0a0f]/90 backdrop-blur-2xl
                shadow-2xl shadow-black/60
                overflow-hidden
              "
                        >
                            {/* Header */}
                            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8 bg-black/30 shrink-0">
                                <div className="w-9 h-9 rounded-full bg-brand-red/20 border border-brand-red/40 flex items-center justify-center">
                                    <Bot size={18} className="text-brand-red" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-white leading-tight">Rad — Radlabs AI</p>
                                    <p className="text-xs text-green-400 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                                        Online now
                                    </p>
                                </div>
                                <button
                                    onClick={() => setOpen(false)}
                                    aria-label="Minimise chat"
                                    className="text-neutral-400 hover:text-white transition-colors p-1"
                                >
                                    <ChevronDown size={20} />
                                </button>
                                <button
                                    onClick={() => setOpen(false)}
                                    aria-label="Close chat"
                                    className="text-neutral-400 hover:text-white transition-colors p-1"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
                                {messages.map((msg) => (
                                    <div key={msg.id}>
                                        <div
                                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                        >
                                            {msg.role === "bot" && (
                                                <div className="w-7 h-7 rounded-full bg-brand-red/20 border border-brand-red/30 flex items-center justify-center mr-2 mt-0.5 shrink-0">
                                                    <Bot size={13} className="text-brand-red" />
                                                </div>
                                            )}
                                            <div
                                                className={`
                          max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed
                          ${msg.role === "user"
                                                        ? "bg-brand-red text-white rounded-br-sm"
                                                        : "bg-white/8 text-neutral-100 rounded-bl-sm border border-white/8"
                                                    }
                        `}
                                                dangerouslySetInnerHTML={{
                                                    __html: msg.text
                                                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                                                        .replace(/\n/g, "<br/>"),
                                                }}
                                            />
                                        </div>

                                        {/* Quick-reply chips */}
                                        {msg.chips && msg.chips.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-2 ml-9">
                                                {msg.chips.map((chip) => (
                                                    <button
                                                        key={chip}
                                                        onClick={() => handleChip(chip)}
                                                        disabled={inputDisabled}
                                                        className="
                              px-3 py-1.5 text-xs font-medium rounded-full
                              border border-brand-red/40 text-brand-red
                              hover:bg-brand-red/10 active:scale-95
                              transition-all duration-200 disabled:opacity-40
                            "
                                                    >
                                                        {chip}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Typing indicator */}
                                {typing && (
                                    <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 rounded-full bg-brand-red/20 border border-brand-red/30 flex items-center justify-center shrink-0">
                                            <Bot size={13} className="text-brand-red" />
                                        </div>
                                        <div className="bg-white/8 border border-white/8 px-3.5 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:0ms]" />
                                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:150ms]" />
                                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce [animation-delay:300ms]" />
                                        </div>
                                    </div>
                                )}
                                <div ref={bottomRef} />
                            </div>

                            {/* Input bar */}
                            {showInput && (
                                <div className="px-4 py-3 border-t border-white/8 bg-black/20 shrink-0">
                                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 focus-within:border-brand-red/50 transition-colors">
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={handleKey}
                                            placeholder={
                                                step === "submitting"
                                                    ? "Sending…"
                                                    : step === "collect_name"
                                                        ? "Your full name…"
                                                        : step === "collect_email"
                                                            ? "your@email.com"
                                                            : step === "collect_company"
                                                                ? "Company / Organisation…"
                                                                : step === "collect_message"
                                                                    ? "Describe your project…"
                                                                    : "Type a message…"
                                            }
                                            disabled={inputDisabled}
                                            className="flex-1 bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none disabled:opacity-50"
                                        />
                                        <button
                                            onClick={() => handleSend(input)}
                                            disabled={!input.trim() || inputDisabled}
                                            aria-label="Send"
                                            className="w-7 h-7 rounded-lg bg-brand-red flex items-center justify-center text-white disabled:opacity-30 hover:bg-brand-darkred transition-colors shrink-0"
                                        >
                                            <Send size={13} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Restart after done/error */}
                            {(step === "done" || step === "error") && (
                                <div className="px-4 py-3 border-t border-white/8 bg-black/20 shrink-0">
                                    <button
                                        onClick={() => {
                                            setMessages([GREETING]);
                                            setStep("greeting");
                                            setLead({ name: "", email: "", company: "", message: "" });
                                            setInput("");
                                        }}
                                        className="w-full text-xs text-neutral-400 hover:text-white transition-colors py-1"
                                    >
                                        ↩ Start a new conversation
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
