'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MOCK_HERO_CONTENT } from '@/data/mock/navigation';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Button } from '@/components/ui/FeatureButton';
import { ParticleField } from '@/components/effects/ParticleField';

// Suppress the THREE.Clock deprecation warning that comes from @react-three/fiber
if (typeof window !== 'undefined') {
    const originalWarn = console.warn;
    console.warn = (...args) => {
        if (args[0] && typeof args[0] === 'string' && args[0].includes('THREE.Clock')) return;
        originalWarn.apply(console, args);
    };
}

export function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const zoomTextRef = useRef<HTMLDivElement>(null);
    const zoomTextInnerRef = useRef<HTMLDivElement>(null);
    const backgroundLayerRef = useRef<HTMLDivElement>(null);
    const contentHiderRef = useRef<HTMLDivElement>(null);
    const contentInnerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    // 10/10 Cinematic "Zoom Through" setup
    // Built specifically for React 18+ strict mode — useGSAP reliably cleans up the DOM
    useGSAP(() => {
        if (prefersReducedMotion || !containerRef.current || !zoomTextRef.current) return;

        gsap.registerPlugin(ScrollTrigger);

        // Initial entrance
        gsap.fromTo(zoomTextInnerRef.current,
            { scale: 0.5, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.8, ease: "expo.out", force3D: true }
        );

        gsap.fromTo(contentInnerRef.current,
            { opacity: 0, y: 80, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, delay: 1, duration: 1.5, ease: "expo.out", force3D: true }
        );

        // Pin the hero and scale the massive text
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=2000",
                scrub: 0.8,
                pin: true,
                anticipatePin: 1,
                // Do NOT use fastScrollEnd or manual pinSpacers — useGSAP handles DOM restoration automatically
                invalidateOnRefresh: true,
            }
        });

        // Calculate responsive scale and positioning
        const isMobile = window.innerWidth < 768;
        const targetScale = isMobile ? 150 : 200;
        const targetX = isMobile ? 22 : 23;
        const targetY = isMobile ? 5 : 4;

        // Scale up and pan into the 'A'
        tl.to(zoomTextRef.current, {
            scale: targetScale,
            xPercent: targetX,
            yPercent: targetY,
            transformOrigin: "center center",
            force3D: true,
            rotationZ: 0.01,
            z: 0.1,
            ease: "power2.inOut",
            duration: 1
        }, 0);

        // Fade out early so reverse scroll looks smooth
        tl.to(zoomTextRef.current, {
            opacity: 0,
            duration: 0.4
        }, 0.5);

        // Fade UI
        tl.to(contentHiderRef.current, {
            opacity: 0,
            scale: 1.5,
            duration: 0.4
        }, 0);

        // Fade background layer
        tl.to(backgroundLayerRef.current, {
            opacity: 0,
            duration: 0.3
        }, 0.7);

    }, { scope: containerRef, dependencies: [prefersReducedMotion] });

    return (
        <div className="relative w-full h-[100svh]">
            <section
                ref={containerRef}
                id="hero"
                suppressHydrationWarning
                className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black touch-pan-y"
                style={{ willChange: 'transform' }}
            >
                {/* Background layer */}
                <div
                    ref={backgroundLayerRef}
                    className="absolute inset-0 z-0 bg-black flex items-center justify-center overflow-hidden"
                    style={{ willChange: 'opacity' }}
                >
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

                {/* Massive clipping text */}
                <div
                    ref={zoomTextRef}
                    className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
                    style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden', perspective: 1000, contain: 'layout style paint' }}
                >
                    <div ref={zoomTextInnerRef} className="text-[12vw] leading-none font-bold tracking-tighter text-white font-sans text-center whitespace-nowrap flex flex-col uppercase opacity-90" style={{ transformStyle: 'preserve-3d', WebkitFontSmoothing: 'subpixel-antialiased' }}>
                        <span className="text-[var(--color-fire-neon)] -translate-y-8 md:translate-y-0">BESPOKE</span>
                        <span className="mt-[12vh] md:mt-[4vw]">AI</span>
                        <span className="text-[var(--color-text-secondary)] italic font-serif lowercase mt-[-2vw]">Solutions</span>
                    </div>
                </div>

                {/* UI Elements */}
                <div ref={contentHiderRef} className="absolute inset-0 z-20 pointer-events-none" style={{ willChange: 'transform, opacity' }}>
                    <div ref={contentInnerRef} className="absolute inset-0">
                        <div className="absolute top-[20%] md:top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-4 z-50 mix-blend-difference pointer-events-auto">
                            <p className="w-full text-center text-white font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold leading-relaxed">
                                BLENDING CREATIVITY, ENGINEERING & INNOVATION TO BUILD<br />
                                INTELLIGENT AI SOLUTIONS.
                            </p>
                        </div>
                        <div className="absolute bottom-[10%] md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-auto z-40">
                            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center group relative">
                                <div className="absolute inset-0 bg-[var(--color-fire-neon)] opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-1000" />
                                <Button cta={MOCK_HERO_CONTENT.primaryCta} className="shadow-[0_0_20px_rgba(255,51,51,0.4)] scale-90 md:scale-110 !px-6 md:!px-10 py-3 md:py-4 text-[10px] md:text-sm font-bold tracking-[0.1em] hover:scale-105 md:hover:scale-125 transition-transform duration-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
