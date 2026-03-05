"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PremiumButton } from "@/components/ui/PremiumButton";

const navLinks = [
    { name: "Services", href: "/services" },
    { name: "AI Capabilities", href: "/ai-capabilities" },
    { name: "Industries", href: "/industries" },
    { name: "Our Approach", href: "/approach" },
    { name: "Projects", href: "/projects" },
];

export function Header() {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [hoveredLink, setHoveredLink] = React.useState<string | null>(null);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? "bg-black/70 backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                : "bg-transparent"
                }`}
        >
            <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between" suppressHydrationWarning>
                {/* Logo with glow effect */}
                <Link href="/" className="flex items-center gap-3 group" suppressHydrationWarning>
                    <motion.div
                        className="relative w-8 h-10 flex items-center justify-center"
                        whileHover={{ scale: 1.15, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        suppressHydrationWarning
                    >
                        {/* Glow ring behind logo */}
                        <span className="absolute inset-0 rounded-full bg-red-500/30 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 scale-150" />
                        <Image
                            src="/logo.png"
                            alt="Radlabs Logo"
                            fill
                            className="object-contain drop-shadow-[0_0_12px_rgba(255,51,51,0.7)] group-hover:drop-shadow-[0_0_20px_rgba(255,51,51,1)] transition-all duration-500"
                            priority
                        />
                    </motion.div>
                    <motion.span
                        className="text-xl font-bold text-white tracking-wide"
                        style={{ fontFamily: "var(--font-sans)" }}
                        whileHover={{ letterSpacing: "0.08em" }}
                        transition={{ duration: 0.3 }}
                    >
                        Radlabs
                    </motion.span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onMouseEnter={() => setHoveredLink(link.name)}
                            onMouseLeave={() => setHoveredLink(null)}
                            className="nav-link-glow relative text-sm font-medium text-neutral-300 hover:text-white transition-colors duration-200 py-1"
                            suppressHydrationWarning
                        >
                            {link.name}
                            {/* Animated underline via CSS class */}
                        </Link>
                    ))}

                    {/* CTA Button */}
                    <Link href="/contact" suppressHydrationWarning>
                        <PremiumButton>
                            Book AI Consultation
                        </PremiumButton>
                    </Link>
                </nav>

                {/* Mobile Nav Toggle */}
                <motion.button
                    className="md:hidden text-white p-2 hover:text-red-400 transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                    whileTap={{ scale: 0.9 }}
                >
                    <motion.div
                        animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.div>
                </motion.button>
            </div>

            {/* Mobile Menu */}
            <motion.div
                initial={false}
                animate={mobileMenuOpen ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="md:hidden overflow-hidden bg-black/95 backdrop-blur-3xl border-b border-white/10"
                suppressHydrationWarning
            >
                <div className="px-6 py-8 flex flex-col gap-6">
                    {navLinks.map((link, i) => (
                        <motion.div
                            key={link.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={mobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ delay: i * 0.07, duration: 0.3 }}
                        >
                            <Link
                                href={link.href}
                                className="nav-link-glow text-lg font-medium text-neutral-300 hover:text-white transition-colors py-1 block w-max"
                                onClick={() => setMobileMenuOpen(false)}
                                suppressHydrationWarning
                            >
                                {link.name}
                            </Link>
                        </motion.div>
                    ))}
                    <Link href="/contact" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                        <PremiumButton className="w-full">
                            Book AI Consultation
                        </PremiumButton>
                    </Link>
                </div>
            </motion.div>
        </motion.header>
    );
}
