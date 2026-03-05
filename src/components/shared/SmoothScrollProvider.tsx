'use client';

import React, { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {

    // Sync every Lenis scroll frame with GSAP ScrollTrigger
    useLenis(() => {
        ScrollTrigger.update();
    });

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.ticker.lagSmoothing(0);

        // Single refresh after fonts + images settle
        const refreshTimeout = setTimeout(() => {
            ScrollTrigger.refresh(true);
        }, 500);

        return () => {
            clearTimeout(refreshTimeout);
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <ReactLenis root options={{
            lerp: 0.08,               // Faster response — 0.05 was too floaty
            duration: 1.2,            // Slightly snappier total duration
            smoothWheel: true,
            syncTouch: false,         // Native touch scroll (most reliable for ScrollTrigger)
            touchMultiplier: 1.5,
            wheelMultiplier: 1,
        }}>
            {children}
        </ReactLenis>
    );
}
