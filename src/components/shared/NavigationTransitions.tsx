'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function NavigationTransitions() {
    const pathname = usePathname();
    const prevPathname = useRef(pathname);

    useEffect(() => {
        if (prevPathname.current === pathname) return;
        prevPathname.current = pathname;

        // Apply a CSS class to trigger the fade transition instead of using
        // document.startViewTransition(), which conflicts with React's DOM
        // reconciliation and causes "removeChild" errors.
        const main = document.querySelector('main');
        if (!main) return;

        main.style.opacity = '0';
        main.style.transition = 'opacity 0.2s ease-out';

        requestAnimationFrame(() => {
            main.style.opacity = '1';
        });
    }, [pathname]);

    return null;
}
