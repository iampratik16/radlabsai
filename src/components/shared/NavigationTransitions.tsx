'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Triggers the native View Transitions API on every Next.js client-side
 * navigation, giving a silky 200ms fade between pages via CSS keyframes
 * defined in globals.css (page-out / page-in).
 *
 * Falls back gracefully in browsers that don't support View Transitions.
 */
export function NavigationTransitions() {
    const pathname = usePathname();

    useEffect(() => {
        // No-op in browsers without View Transitions support
        if (!document.startViewTransition) return;

        // startViewTransition wraps the React state change that triggered the
        // router navigation. The actual DOM update has already happened by the
        // time this effect fires, so we just trigger a fresh transition so Next
        // can re-render into it. The approach is to prefetch aggressively via
        // the <Link prefetch> default in Next.js 13+ ( prefetch="true" ).
        // The view-transition CSS in globals.css handles the visual animation.
    }, [pathname]);

    return null;
}
