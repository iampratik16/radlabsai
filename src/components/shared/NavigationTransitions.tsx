'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function NavigationTransitions() {
    const pathname = usePathname();
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (!document.startViewTransition) return;

        document.startViewTransition(() => {
            return new Promise<void>((resolve) => {
                requestAnimationFrame(() => resolve());
            });
        });
    }, [pathname]);

    return null;
}
