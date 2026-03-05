"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, ChevronDown } from "lucide-react";

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
            {/* ── Floating trigger button (New design: rotating ring + icon swap + particles) ── */}
            <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100]" suppressHydrationWarning>
                <AnimatePresence>
                    {!open && (
                        <motion.div
                            key="fab"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className="relative"
                        >
                            <style>{`
                                @keyframes rotate-ring {
                                    to { transform: rotate(360deg); }
                                }
                                @keyframes particle-burst {
                                    0%   { transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0) scale(1); opacity: 1; }
                                    100% { transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(var(--dist) * -1)) scale(0); opacity: 0; }
                                }
                                .chatbot-fab { position: relative; width: 76px; height: 76px; border-radius: 50%; border: none; cursor: pointer; background: #111111; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 32px rgba(0,0,0,0.5); }
                                .chatbot-fab::before {
                                    content: ''; position: absolute; inset: -5px; border-radius: 50%;
                                    background: conic-gradient(from 0deg, #E63946, #C1121F, transparent 60%, transparent 80%, #E63946);
                                    opacity: 0; transition: opacity 0.5s ease;
                                    animation: rotate-ring 3.2s linear infinite paused; z-index: -1;
                                }
                                .chatbot-fab::after {
                                    content: ''; position: absolute; inset: -24px; border-radius: 50%;
                                    background: radial-gradient(circle, rgba(230,57,70,0.42) 0%, transparent 70%);
                                    opacity: 0; transition: opacity 0.5s ease, transform 0.5s ease;
                                    transform: scale(0.6); z-index: -2;
                                }
                                .chatbot-fab:hover { transform: scale(1.08); }
                                .chatbot-fab:hover::before { opacity: 1; animation-play-state: running; }
                                .chatbot-fab:hover::after { opacity: 0.85; transform: scale(1.15); }
                                .chatbot-fab-inner { width: 70px; height: 70px; border-radius: 50%; background: #111111; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,0.07); transition: border-color 0.4s ease; transform: scale(1); }
                                .chatbot-fab:hover .chatbot-fab-inner { border-color: rgba(230,57,70,0.35); }
                                .chatbot-icon-bot, .chatbot-icon-spark { position: absolute; transition: all 0.45s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
                                .chatbot-icon-bot { transform: scale(1.2) rotate(0deg); opacity: 1; }
                                .chatbot-icon-spark { transform: scale(0) rotate(-180deg); opacity: 0; }
                                .chatbot-fab:hover .chatbot-icon-bot { transform: scale(0) rotate(180deg); opacity: 0; }
                                .chatbot-fab:hover .chatbot-icon-spark { transform: scale(1.2) rotate(0deg); opacity: 1; }
                                .chatbot-particles { position: absolute; inset: 0; pointer-events: none; }
                                .chatbot-particles span { position: absolute; width: 4px; height: 4px; background: #E63946; border-radius: 50%; top: 50%; left: 50%; animation: particle-burst 1.2s ease-out infinite paused; }
                                .chatbot-fab:hover .chatbot-particles span { animation-play-state: running; }
                                .chatbot-particles span:nth-child(1) { animation-delay: 0s;    --angle: 0deg;   --dist: 45px; }
                                .chatbot-particles span:nth-child(2) { animation-delay: 0.1s;  --angle: 45deg;  --dist: 40px; }
                                .chatbot-particles span:nth-child(3) { animation-delay: 0.05s; --angle: 90deg;  --dist: 48px; }
                                .chatbot-particles span:nth-child(4) { animation-delay: 0.15s; --angle: 135deg; --dist: 38px; }
                                .chatbot-particles span:nth-child(5) { animation-delay: 0.08s; --angle: 180deg; --dist: 42px; }
                                .chatbot-particles span:nth-child(6) { animation-delay: 0.12s; --angle: 225deg; --dist: 46px; }
                                .chatbot-particles span:nth-child(7) { animation-delay: 0.03s; --angle: 270deg; --dist: 38px; }
                                .chatbot-particles span:nth-child(8) { animation-delay: 0.18s; --angle: 315deg; --dist: 48px; }
                                .chatbot-tooltip { position: absolute; right: 90px; top: 50%; transform: translateY(-50%) translateX(8px); background: #1a1a1a; border: 1px solid rgba(255,255,255,0.08); padding: 10px 18px; border-radius: 12px; font-family: system-ui, sans-serif; font-size: 14px; font-weight: 500; color: #f0f0f0; white-space: nowrap; opacity: 0; pointer-events: none; transition: all 0.35s cubic-bezier(0.175,0.885,0.32,1.275); }
                                .chatbot-tooltip::after { content: ''; position: absolute; right: -6px; top: 50%; transform: translateY(-50%) rotate(45deg); width: 12px; height: 12px; background: #1a1a1a; border-right: 1px solid rgba(255,255,255,0.08); border-bottom: 1px solid rgba(255,255,255,0.08); }
                                .chatbot-fab:hover .chatbot-tooltip { opacity: 1; transform: translateY(-50%) translateX(0); }
                                @media (max-width: 480px) { .chatbot-fab { width: 64px; height: 64px; } .chatbot-fab-inner { width: 60px; height: 60px; } .chatbot-tooltip { display: none; } }
                            `}</style>

                            {/* Pulse ring before first open */}
                            {pulse && <span className="absolute inset-0 rounded-full animate-ping" style={{ background: 'rgba(230,57,70,0.35)', borderRadius: '50%' }} />}

                            <button
                                className="chatbot-fab"
                                onClick={() => setOpen(true)}
                                aria-label="Open AI Chat"
                            >
                                <div className="chatbot-fab-inner">
                                    {/* Default: bot icon */}
                                    <svg className="chatbot-icon-bot" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#E63946" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
                                        <circle cx="9" cy="13" r="1.25" fill="#E63946" stroke="none" />
                                        <circle cx="15" cy="13" r="1.25" fill="#E63946" stroke="none" />
                                        <path d="M10 17c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
                                    </svg>
                                    {/* Hover: lightning bolt */}
                                    <svg className="chatbot-icon-spark" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#E63946" opacity="0.92" />
                                    </svg>
                                </div>

                                {/* Particle burst */}
                                <div className="chatbot-particles">
                                    <span /><span /><span /><span />
                                    <span /><span /><span /><span />
                                </div>

                                {/* Tooltip */}
                                <div className="chatbot-tooltip">Ask Radlabs AI</div>
                            </button>
                        </motion.div>
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
