import * as React from "react";
import { cn } from "@/lib/utils";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    variant?: "h1" | "h2" | "h3" | "h4" | "p" | "lead" | "small";
    as?: React.ElementType;
}

export const Typography: React.FC<TypographyProps> = ({
    variant = "p",
    as,
    className,
    ...props
}) => {
    const Component = as || variant === "lead" || variant === "small" ? "p" : variant;

    const styles = {
        h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-7xl font-display",
        h2: "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 font-display",
        h3: "scroll-m-20 text-2xl font-semibold tracking-tight font-display",
        h4: "scroll-m-20 text-xl font-semibold tracking-tight font-display",
        p: "leading-7 [&:not(:first-child)]:mt-6 font-sans text-neutral-300",
        lead: "text-xl text-neutral-400 md:text-2xl font-sans",
        small: "text-sm font-medium leading-none font-sans text-neutral-500",
    };

    return (
        <Component
            className={cn(styles[variant], className)}
            {...props}
        />
    );
};
