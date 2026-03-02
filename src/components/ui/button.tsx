import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-red disabled:pointer-events-none disabled:opacity-50",
                    {
                        "bg-foreground text-background hover:bg-neutral-200 dark:hover:bg-neutral-800": variant === "primary",
                        "bg-brand-red/10 text-brand-red hover:bg-brand-red/20": variant === "secondary",
                        "border border-glass-border bg-glass-bg backdrop-blur-md hover:bg-white/10 dark:hover:bg-white/5": variant === "outline",
                        "hover:bg-neutral-100 dark:hover:bg-neutral-800": variant === "ghost",
                        "h-9 px-4 py-2 text-xs": size === "sm",
                        "h-11 px-8 py-2": size === "md",
                        "h-14 px-10 py-3 text-lg": size === "lg",
                    },
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
