'use client';

import { useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function CapabilitiesClient({ children }: { children: ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textColumnRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    // The Data Terminal reveal effect
    useScrollTrigger(containerRef, undefined, {
        onEnter: () => {
            if (prefersReducedMotion || !containerRef.current) return;

            const items = containerRef.current.querySelectorAll('.capability-item');

            gsap.fromTo(items,
                {
                    opacity: 0,
                    x: -30,
                    filter: 'blur(10px)'
                },
                {
                    opacity: 1,
                    x: 0,
                    filter: 'blur(0px)',
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    overwrite: "auto"
                }
            );
        },
        once: true,
        start: "top 70%"
    });

    return (
        <div ref={containerRef} className="w-full flex flex-col md:flex-row gap-16 md:gap-24 relative">
            {children}
        </div>
    );
}
