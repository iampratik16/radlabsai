'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MOCK_HERO_CONTENT } from '@/data/mock/navigation';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Button } from '@/components/ui/FeatureButton';
import { ParticleField } from '@/components/effects/ParticleField';

export function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const zoomTextRef = useRef<HTMLDivElement>(null);
    const zoomTextInnerRef = useRef<HTMLDivElement>(null);
    const backgroundLayerRef = useRef<HTMLDivElement>(null);
    const contentHiderRef = useRef<HTMLDivElement>(null);
    const contentInnerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();
    const [mounted, setMounted] = React.useState(false);

    // Only render GSAP-animated content client-side
    useEffect(() => { setMounted(true); }, []);

    // 10/10 Cinematic "Zoom Through" setup
    useEffect(() => {
        if (prefersReducedMotion || !containerRef.current || !zoomTextRef.current) return;

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {

            // Initial entrance — use ONLY transform+opacity (no filter:blur — it triggers CPU repaint every frame)
            gsap.fromTo(zoomTextInnerRef.current,
                { scale: 0.5, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.8, ease: "expo.out", force3D: true }
            );

            // Content entrance — transform+opacity only
            gsap.fromTo(contentInnerRef.current,
                { opacity: 0, y: 80, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, delay: 1, duration: 1.5, ease: "expo.out", force3D: true }
            );

            // Pin the hero and scale the massive text incredibly huge until we "fall through" it
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=2000",
                    scrub: 0.8,          // Smooth interpolation (0.8s catch-up) instead of instant — prevents jank
                    pin: true,
                    anticipatePin: 1,
                    pinReparent: false,   // Don't move pinned element in DOM — prevents React removeChild errors
                    fastScrollEnd: true,  // Quick cleanup when user scrolls fast past section
                }
            });

            // Calculate responsive scale and positioning
            const isMobile = window.innerWidth < 768;
            const targetScale = isMobile ? 150 : 200;
            // Increase targetX to push the text further right, centering the "A" of "AI" on the screen
            const targetX = isMobile ? 22 : 23;
            // Fine-tune vertical position to hit the crossbar/hole of the "A"
            const targetY = isMobile ? 5 : 4;

            // The scale math: scale up and pan into the triangular counter/hole inside the 'A'
            tl.to(zoomTextRef.current, {
                scale: targetScale,
                xPercent: targetX,
                yPercent: targetY,
                transformOrigin: "center center",
                force3D: true,  // Promote to GPU layer for smooth compositing
                rotationZ: 0.01, // Force hardware acceleration to prevent text rasterization/pixelation
                z: 0.1, // Extra hardware acceleration kick
                ease: "power2.inOut",
                duration: 1
            }, 0);

            // Hide the massive text layer completely at the end to wipe it from compositor
            tl.to(zoomTextRef.current, {
                opacity: 0,
                duration: 0.1
            }, 0.9);

            // Fade out the nodes/UI so we don't zoom into them
            tl.to(contentHiderRef.current, {
                opacity: 0,
                scale: 1.5,
                duration: 0.4
            }, 0);

            // Fade the background completely to black at the end so the next section blends perfectly
            tl.to(backgroundLayerRef.current, {
                opacity: 0,
                duration: 0.3
            }, 0.7);

        }, containerRef);

        return () => {
            try {
                ctx.revert();
                ScrollTrigger.getAll().forEach(t => t.kill());
            } catch (e) {
                // Suppress React removeChild errors during fast unmount/tab switch
            }
        };
    }, [prefersReducedMotion]);

    return (
        <section
            ref={containerRef}
            id="hero"
            suppressHydrationWarning
            className="relative w-full h-[100svh] flex items-center justify-center overflow-hidden bg-black touch-pan-y"
            style={{ willChange: 'transform' }}
        >
            {/* Background layer */}
            <div
                ref={backgroundLayerRef}
                className="absolute inset-0 z-0 bg-black flex items-center justify-center overflow-hidden"
                style={{ willChange: 'opacity' }}
            >
                {/* Wacky grid and radial gradients simulating an AI neural core */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,0,0,0.8)_0%,#000000_60%)]" />
                <ParticleField />
                <div
                    className="absolute inset-[-100%] opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(#ff3333 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                        transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)'
                    }}
                />
            </div>

            {/* This layer holds our massive clipping text we will scale up */}
            <div
                ref={zoomTextRef}
                className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
                style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden', perspective: 1000, contain: 'layout style paint' }}
            >
                {/* Massive bold font for the mask — use large base size so scaled text stays sharp */}
                <div ref={zoomTextInnerRef} className="text-[12vw] leading-none font-bold tracking-tighter text-white font-sans text-center whitespace-nowrap flex flex-col uppercase opacity-90" style={{ transformStyle: 'preserve-3d', WebkitFontSmoothing: 'subpixel-antialiased' }}>
                    <span className="text-[var(--color-fire-neon)] -translate-y-8 md:translate-y-0">BESPOKE</span>
                    <span className="mt-[12vh] md:mt-[4vw]">AI</span>
                    <span className="text-[var(--color-text-secondary)] italic font-serif lowercase mt-[-2vw]">Solutions</span>
                </div>
            </div>

            {/* Draggable Nodes & Standard UI Interface (These disappear as we zoom) */}
            <div ref={contentHiderRef} className="absolute inset-0 z-20 pointer-events-none" style={{ willChange: 'transform, opacity' }}>
                <div ref={contentInnerRef} className="absolute inset-0">

                    {/* Position standard CTA text above the AI, completely transparent and visible via difference blend */}
                    <div className="absolute top-[20%] md:top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-4 z-50 mix-blend-difference pointer-events-auto">
                        <p className="w-full text-center text-white font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold leading-relaxed">
                            BLENDING CREATIVITY, ENGINEERING & INNOVATION TO BUILD<br />
                            INTELLIGENT AI SOLUTIONS.
                        </p>
                    </div>

                    {/* The call to action button stays below the massive AI text */}
                    <div className="absolute bottom-[10%] md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-auto z-40">
                        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center group relative">
                            <div className="absolute inset-0 bg-[var(--color-fire-neon)] opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-1000" />
                            <Button cta={MOCK_HERO_CONTENT.primaryCta} className="shadow-[0_0_20px_rgba(255,51,51,0.4)] scale-90 md:scale-110 !px-6 md:!px-10 py-3 md:py-4 text-[10px] md:text-sm font-bold tracking-[0.1em] hover:scale-105 md:hover:scale-125 transition-transform duration-500" />
                        </div>
                    </div>
                </div>
            </div>


        </section>
    );
}
