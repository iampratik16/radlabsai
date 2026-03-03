import Link from "next/link";
import { Typography } from "@/components/ui/typography";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-24 pb-12 overflow-hidden relative">
            <div className="absolute inset-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-50" suppressHydrationWarning></div>

            <div className="max-w-7xl mx-auto px-6" suppressHydrationWarning>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16" suppressHydrationWarning>
                    <div className="md:col-span-1" suppressHydrationWarning>
                        <Link href="/" className="flex items-center gap-3 mb-6 group">
                            <div className="relative w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110" suppressHydrationWarning>
                                <Image
                                    src="/logo.png"
                                    alt="Radlabs Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-xl font-display font-bold text-white tracking-wide">
                                Radlabs
                            </span>
                        </Link>
                        <Typography variant="p" className="text-neutral-400 max-w-sm mt-0">
                            Blending creativity, engineering & innovation to build intelligent systems that accelerate modern business growth.
                        </Typography>
                    </div>

                    <div>
                        <h4 className="text-white font-display font-semibold mb-6">Services</h4>
                        <ul className="flex flex-col gap-4">
                            <li><Link href="/services/ai" className="text-neutral-400 hover:text-brand-red transition-colors text-sm">Custom AI Architecture</Link></li>
                            <li><Link href="/services/llm" className="text-neutral-400 hover:text-brand-red transition-colors text-sm">LLM Integration & RAG</Link></li>
                            <li><Link href="/services/agents" className="text-neutral-400 hover:text-brand-red transition-colors text-sm">Agentic Workflows</Link></li>
                            <li><Link href="/services/software" className="text-neutral-400 hover:text-brand-red transition-colors text-sm">Software Development</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-display font-semibold mb-6">Company</h4>
                        <ul className="flex flex-col gap-4">
                            <li><Link href="/about" className="text-neutral-400 hover:text-white transition-colors text-sm">About Us</Link></li>
                            <li><Link href="/approach" className="text-neutral-400 hover:text-white transition-colors text-sm">Our Approach</Link></li>
                            <li><Link href="/careers" className="text-neutral-400 hover:text-white transition-colors text-sm">Careers</Link></li>
                            <li><Link href="/contact" className="text-neutral-400 hover:text-white transition-colors text-sm">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-display font-semibold mb-6">Newsletter</h4>
                        <p className="text-neutral-400 text-sm mb-4">Insights on enterprise AI and engineering excellence.</p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-red w-full"
                            />
                            <button className="bg-white text-black rounded-full px-4 py-2 text-sm font-medium hover:bg-neutral-200 transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-neutral-500 text-sm" suppressHydrationWarning>© {new Date().getFullYear()} Radlabs Technologies. All rights reserved.</p>
                    <div className="flex gap-6" suppressHydrationWarning>
                        <Link href="/privacy" className="text-neutral-500 hover:text-white text-sm transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-neutral-500 hover:text-white text-sm transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
