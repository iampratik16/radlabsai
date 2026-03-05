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

        // After Lenis mounts and the DOM settles, refresh all ScrollTrigger positions
        const refreshTimeout = setTimeout(() => {
            ScrollTrigger.refresh(true);
        }, 300);

        // Second refresh after fonts + images settle
        const secondRefresh = setTimeout(() => {
            ScrollTrigger.refresh(true);
        }, 1200);

        return () => {
            clearTimeout(refreshTimeout);
            clearTimeout(secondRefresh);
            // Kill ALL ScrollTrigger instances on unmount to prevent stale pinned elements
            // from holding references to DOM nodes that React has since removed.
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
