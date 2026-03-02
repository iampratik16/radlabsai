"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Typography } from "@/components/ui/typography";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function ScrollZoomFeature() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const text1Ref = useRef<HTMLDivElement>(null);
    const text2Ref = useRef<HTMLDivElement>(null);
    const text3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        const image = imageRef.current;

        if (!section || !container || !image) return;

        // Reset styles in case of re-mount
        gsap.set(image, { scale: 1, xPercent: 0, yPercent: 0 });
        gsap.set([text1Ref.current, text2Ref.current, text3Ref.current], { opacity: 0, y: 50 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=3000", // Makes the sticky section last for 3000px of scrolling
                scrub: 1.5, // Smooth scrubbing taking 1.5 seconds to "catch up" for maximum buttery smoothness
                pin: container,
                anticipatePin: 1,
            },
        });

        // Sequence 1: Zoom in slightly and show first text
        tl.to(image, { scale: 1.5, yPercent: 10, ease: "power1.inOut", duration: 2 }, 0)
            .to(text1Ref.current, { opacity: 1, y: 0, duration: 1 }, 0.5)
            .to(text1Ref.current, { opacity: 0, y: -50, duration: 1 }, 2);

        // Sequence 2: Deep zoom into the "chip/core", pan right, show second text
        tl.to(image, { scale: 3.5, xPercent: -20, yPercent: 30, ease: "power2.inOut", duration: 3 }, 2.5)
            .to(text2Ref.current, { opacity: 1, y: 0, duration: 1 }, 3)
            .to(text2Ref.current, { opacity: 0, y: -50, duration: 1 }, 5);

        // Sequence 3: Zoom way out and show final text, background shift
        tl.to(image, { scale: 0.8, xPercent: 0, yPercent: -10, ease: "power3.inOut", duration: 3 }, 5.5)
            .to(container, { backgroundColor: "rgba(10, 10, 10, 1)", duration: 2 }, 5.5)
            .to(text3Ref.current, { opacity: 1, y: 0, duration: 1 }, 6.5);

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full border-t border-white/5 bg-black" id="feature-zoom">
            <div
                ref={containerRef}
                className="h-screen w-full flex items-center justify-center overflow-hidden relative bg-black transition-colors"
            >
                {/* The Central Asset */}
                <div className="relative w-[400px] md:w-[800px] h-[400px] md:h-[800px] flex items-center justify-center pointer-events-none will-change-transform">
                    <Image
                        ref={imageRef as any}
                        src="/scroll-head-red-bg.png"
                        alt="Neural Humanoid Head Red Background"
                        width={1600}
                        height={1600}
                        quality={100}
                        className="object-contain origin-center will-change-transform transform-gpu"
                        style={{ transform: "translateZ(0)" }}
                        priority
                    />
                </div>

                {/* Text Overlays - Distinct textboxes with glassmorphic dark red accents */}
                <div ref={text1Ref} className="absolute top-1/4 left-[5%] md:left-[15%] max-w-sm pointer-events-none bg-black/80 backdrop-blur-xl border border-brand-red/30 p-8 rounded-2xl shadow-[0_0_40px_rgba(139,0,0,0.4)]">
                    <Typography variant="h3" className="text-white drop-shadow-md">
                        Digital Consciousness
                    </Typography>
                    <Typography variant="p" className="text-white/80 drop-shadow-sm font-medium mt-2">
                        Every Radlabs AI system is powered by an intricate mapping of neural networks, simulating complex cognitive architecture.
                    </Typography>
                </div>

                <div ref={text2Ref} className="absolute bottom-1/4 right-[5%] md:right-[15%] max-w-md text-right pointer-events-none bg-black/80 backdrop-blur-xl border border-brand-darkred/50 p-8 rounded-2xl shadow-[0_0_40px_rgba(255,26,26,0.2)]">
                    <Typography variant="h3" className="text-white drop-shadow-md">
                        Deep Topography
                    </Typography>
                    <Typography variant="p" className="text-neutral-300 drop-shadow-sm font-medium mt-2">
                        Zooming in reveals the contour and depth of our custom reasoning models, trained to replicate the nuances of human logic.
                    </Typography>
                </div>

                <div ref={text3Ref} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center max-w-xl pointer-events-none bg-gradient-to-br from-black/90 to-brand-darkred/90 p-10 rounded-3xl backdrop-blur-2xl border border-brand-red/50 shadow-[0_0_80px_rgba(255,26,26,0.4)]">
                    <Typography variant="h2" className="text-white mb-4 drop-shadow-lg">
                        The Mind, Synthesized.
                    </Typography>
                    <Typography variant="p" className="text-neutral-200">
                        From individual algorithmic nodes to a unified artificial ego, our technology mirrors human intelligence at scale.
                    </Typography>
                </div>
            </div>
        </section >
    );
}
