"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PremiumButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    icon?: React.ReactNode;
    showArrow?: boolean;
    type?: "button" | "submit";
}

export function PremiumButton({ onClick, children, className, icon, showArrow = false, type = "button" }: PremiumButtonProps) {
    const [isHovered, setIsHovered] = useState(false);

    const RootTag = type === "submit" ? "button" : "div";

    return (
        <div
            className={cn("relative group inline-block", className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <style jsx>{`
                @keyframes rotate-ring {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes particle-burst {
                    0%   { transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0) scale(1); opacity: 1; }
                    100% { transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(var(--dist) * -1)) scale(0); opacity: 0; }
                }
                .premium-ring::before {
                    content: '';
                    position: absolute;
                    inset: -5px;
                    border-radius: 9999px;
                    background: conic-gradient(
                        from 0deg,
                        #E63946,
                        #C1121F,
                        transparent 60%,
                        transparent 80%,
                        #E63946
                    );
                    opacity: 0;
                    transition: opacity 0.5s ease;
                    animation: rotate-ring 3.2s linear infinite paused;
                    z-index: -1;
                }
                .group:hover .premium-ring::before {
                    opacity: 1;
                    animation-play-state: running;
                }
                .premium-glow::after {
                    content: '';
                    position: absolute;
                    inset: -24px;
                    border-radius: 9999px;
                    background: radial-gradient(circle, rgba(230, 57, 70, 0.42) 0%, transparent 70%);
                    opacity: 0;
                    transition: opacity 0.5s ease, transform 0.5s ease;
                    transform: scale(0.6);
                    z-index: -2;
                }
                .group:hover .premium-glow::after {
                    opacity: 0.85;
                    transform: scale(1.15);
                }
                .particle {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: #E63946;
                    border-radius: 50%;
                    top: 50%;
                    left: 50%;
                    pointer-events: none;
                    animation: particle-burst 1.2s ease-out infinite paused;
                }
                .group:hover .particle {
                    animation-play-state: running;
                }
            `}</style>

            <RootTag
                onClick={onClick}
                type={type === "submit" ? "submit" : undefined}
                role={type === "button" ? "button" : undefined}
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        if (type !== "submit") {
                            e.preventDefault();
                            onClick?.();
                        }
                    }
                }}
                className="relative flex items-center justify-center gap-2 px-8 py-3 bg-[#111111] border border-white/10 rounded-full text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 group-hover:border-brand-red/35 group-hover:scale-[1.08] active:scale-95 shadow-[0_8px_32px_rgba(0,0,0,0.5)] premium-ring premium-glow cursor-pointer overflow-hidden w-full h-full"
            >
                <div className="relative z-10 flex items-center gap-2">
                    <span className="relative overflow-hidden w-4 h-4 flex items-center justify-center">
                        <motion.div
                            animate={{
                                y: isHovered ? -20 : 0,
                                opacity: isHovered ? 0 : 1,
                                scale: isHovered ? 0.5 : 1.2,
                                rotate: isHovered ? 180 : 0
                            }}
                            transition={{ duration: 0.45, ease: [0.68, -0.55, 0.265, 1.55] }}
                            className="absolute"
                        >
                            {icon || (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 0 0 1 7 7v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
                                </svg>
                            )}
                        </motion.div>
                        <motion.div
                            initial={{ y: 20, opacity: 0, scale: 0 }}
                            animate={{
                                y: isHovered ? 0 : 20,
                                opacity: isHovered ? 1 : 0,
                                scale: isHovered ? 1.2 : 0,
                                rotate: isHovered ? 0 : -180
                            }}
                            transition={{ duration: 0.45, ease: [0.68, -0.55, 0.265, 1.55] }}
                            className="absolute text-brand-red"
                        >
                            <Sparkles size={16} />
                        </motion.div>
                    </span>
                    <span className="group-hover:text-brand-red transition-colors duration-300 whitespace-nowrap">
                        {children}
                    </span>
                    {showArrow && (
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:text-brand-red transition-all" />
                    )}
                </div>

                {/* Shimmer effect inside */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            </RootTag>

            {/* Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[
                    { angle: 0, dist: 45, delay: 0 },
                    { angle: 45, dist: 40, delay: 0.1 },
                    { angle: 90, dist: 48, delay: 0.05 },
                    { angle: 135, dist: 38, delay: 0.15 },
                    { angle: 180, dist: 42, delay: 0.08 },
                    { angle: 225, dist: 46, delay: 0.12 },
                    { angle: 270, dist: 38, delay: 0.03 },
                    { angle: 315, dist: 48, delay: 0.18 },
                ].map((p, i) => (
                    <span
                        key={i}
                        className="particle"
                        style={{
                            '--angle': `${p.angle}deg`,
                            '--dist': `${p.dist}px`,
                            animationDelay: `${p.delay}s`
                        } as React.CSSProperties}
                    />
                ))}
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-3 py-1 bg-[#1a1a1a] border border-white/10 rounded-lg text-[10px] text-neutral-400 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap translate-y-2 group-hover:translate-y-0 shadow-xl">
                Ask Radlabs AI
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#1a1a1a]" />
            </div>
        </div>
    );
}
