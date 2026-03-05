import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                // Glass base + creative hover: lift, border glow, shimmer border
                "card-border-animate group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-foreground shadow-sm",
                "transition-all duration-300 ease-out",
                "hover:-translate-y-1.5 hover:scale-[1.015] hover:bg-white/[0.08] hover:border-white/20 hover:shadow-[0_8px_30px_rgba(255,51,51,0.08)]",
                className
            )}
            {...props}
        />
    )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
    )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h3
            ref={ref}
            className={cn(
                "font-semibold leading-none tracking-tight text-xl",
                "group-hover:text-white transition-colors duration-300",
                className
            )}
            {...props}
        />
    )
);
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "p-6 pt-0 text-neutral-400 font-sans",
                "group-hover:text-neutral-200 transition-colors duration-300",
                className
            )}
            {...props}
        />
    )
);
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardContent };
