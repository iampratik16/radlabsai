'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (matchMedia('(pointer: coarse)').matches || prefersReducedMotion) {
            return;
        }

        setIsVisible(true);

        const onMouseMove = (e: MouseEvent) => {
            gsap.set(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
            });
            gsap.to(followerRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.6,
                ease: 'power3.out',
            });
        };

        const onMouseEnter = () => setIsVisible(true);
        const onMouseLeave = () => setIsVisible(false);

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseenter', onMouseEnter);
        window.addEventListener('mouseleave', onMouseLeave);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, [role="button"]')) {
                gsap.to(cursorRef.current, { scale: 0.5, duration: 0.2 });
                gsap.to(followerRef.current, { scale: 1.5, borderColor: 'var(--color-fire-neon)', backgroundColor: 'rgba(255,51,51,0.1)', duration: 0.2 });
            }
        };

        const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, [role="button"]')) {
                gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
                gsap.to(followerRef.current, { scale: 1, borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'transparent', duration: 0.2 });
            }
        };

        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseenter', onMouseEnter);
            window.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, [prefersReducedMotion]);

    return (
        <div suppressHydrationWarning style={{ display: isVisible ? 'contents' : 'none' }}>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-[var(--color-fire-neon)] rounded-full pointer-events-none z-[100]"
                style={{ mixBlendMode: 'difference' }}
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 border border-white/10 rounded-full pointer-events-none z-[99] backdrop-blur-[1px]"
            />
        </div>
    );
}
