import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    // Base styles – shimmer overlay is powered by .btn-shimmer pseudo-element in CSS
                    "btn-shimmer relative inline-flex items-center justify-center font-mono uppercase tracking-widest text-xs rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-fire-neon)] disabled:pointer-events-none disabled:opacity-50 overflow-hidden",
                    {
                        // Primary – white fill, red on hover, glow shadow pulse
                        "bg-white text-black hover:bg-[#FF3333] hover:text-white shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,51,51,0.6)] hover:scale-105 active:scale-95":
                            variant === "primary",
                        // Secondary – subtle glass
                        "bg-white/10 text-white hover:bg-white/20 border border-white/10 hover:border-white/30 backdrop-blur-sm hover:scale-105 active:scale-95":
                            variant === "secondary",
                        // Outline – border glow on hover
                        "border border-white/20 bg-transparent text-white hover:border-[var(--color-fire-neon)] hover:text-[var(--color-fire-neon)] hover:shadow-[0_0_15px_rgba(255,51,51,0.3)] active:scale-95":
                            variant === "outline",
                        // Ghost
                        "bg-transparent text-neutral-400 hover:text-white active:scale-95":
                            variant === "ghost",
                        // Sizes
                        "h-9 px-4 py-2": size === "sm",
                        "h-11 px-8 py-2": size === "md",
                        "h-14 px-10 py-3 text-sm": size === "lg",
                    },
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button };
