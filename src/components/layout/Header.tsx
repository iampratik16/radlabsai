"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
    { name: "Services", href: "/services" },
    { name: "AI Capabilities", href: "/ai-capabilities" },
    { name: "Industries", href: "/industries" },
    { name: "Our Approach", href: "/approach" },
    { name: "About Us", href: "/about" },
];

export function Header() {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
                }`}
        >
            <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-8 h-10 flex items-center justify-center">
                        <Image
                            src="/logo.png"
                            alt="Radlabs Logo"
                            fill
                            className="object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_10px_rgba(255,26,26,0.6)]"
                            priority
                        />
                    </div>
                    <span className="text-xl font-display font-bold text-white tracking-wide">
                        Radlabs
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="relative text-sm font-medium text-neutral-300 hover:text-white transition-colors py-1 group"
                        >
                            {link.name}
                            <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-brand-red -translate-x-1/2 transition-all duration-300 group-hover:w-full rounded-full" />
                        </Link>
                    ))}
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-red to-brand-darkred rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500" />
                        <Button variant="primary" className="relative bg-white text-black hover:bg-black hover:text-white hover:scale-105 transition-all duration-300 border-none shadow-lg">
                            <span className="relative z-10 flex items-center gap-2">
                                Book AI Consultation
                            </span>
                        </Button>
                    </div>
                </nav>

                {/* Mobile Nav Toggle */}
                <button
                    className="md:hidden text-white p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-black/95 backdrop-blur-3xl border-b border-white/10 px-6 py-8"
                >
                    <div className="flex flex-col gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="relative text-lg font-medium text-neutral-300 hover:text-white transition-colors py-1 group w-max"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-red transition-all duration-300 group-hover:w-full rounded-full" />
                            </Link>
                        ))}
                        <div className="relative group w-full mt-4">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-red to-brand-darkred rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500" />
                            <Button variant="primary" className="relative w-full bg-white text-black hover:bg-black hover:text-white hover:scale-[1.02] transition-all duration-300 border-none shadow-lg">
                                <span className="relative z-10">Book AI Consultation</span>
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.header>
    );
}
