import { useEffect } from 'react';

/** Selectors that match the Elfsight free-plan badge in all its forms */
const BADGE_SELECTORS = [
    '.eapps-widget-toolbar',
    '.eapps-instagram-feed-toolbar',
    '.eapps-link',
    '[class*="eapps-widget-toolbar"]',
    '[class*="eapps-link"]',
    'a[href*="elfsight.com"]',
];

function removeBadges(root: Document | ShadowRoot | Element = document) {
    BADGE_SELECTORS.forEach((sel) => {
        try {
            root.querySelectorAll<HTMLElement>(sel).forEach((el) => {
                el.remove();
            });
        } catch (_) { /* cross-origin iframes will throw — safe to ignore */ }
    });
}

export default function InstagramFeed() {
    useEffect(() => {
        // 1. Load Elfsight script once
        if (!document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://elfsightcdn.com/platform.js';
            script.async = true;
            document.head.appendChild(script);
        }

        // 2. When the Elfsight popup appears, fix Lenis interference + sizing
        const POPUP_PATTERNS = [
            'eapps-instagram-feed-popup',
            'eapps-popup',
            'eapps-modal',
        ];

        function isPopupEl(el: Element) {
            return POPUP_PATTERNS.some(p =>
                Array.from(el.classList).some(c => c.includes(p))
            );
        }

        function fixPopup(el: HTMLElement) {
            // Tell Lenis to not intercept scroll inside this element
            el.setAttribute('data-lenis-prevent', '');
            // Also mark all scrollable children
            el.querySelectorAll<HTMLElement>('*').forEach(child => {
                const style = window.getComputedStyle(child);
                if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
                    child.setAttribute('data-lenis-prevent', '');
                }
            });
        }

        // 3. MutationObserver — badge removal + popup Lenis fix
        const observer = new MutationObserver((mutations) => {
            removeBadges(document);
            document.querySelectorAll('*').forEach((el) => {
                if (el.shadowRoot) removeBadges(el.shadowRoot);
            });
            // Check newly added nodes for popup elements
            mutations.forEach(m => {
                m.addedNodes.forEach(node => {
                    if (node instanceof HTMLElement) {
                        if (isPopupEl(node)) fixPopup(node);
                        node.querySelectorAll<HTMLElement>('*').forEach(child => {
                            if (isPopupEl(child)) fixPopup(child);
                        });
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: false,
        });

        // 4. Eager first pass
        removeBadges(document);

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="instagram"
            className="py-24 md:py-32 px-5 md:px-12 lg:px-24 bg-[var(--color-bg-deep)] relative"
        >
            {/* Section header */}
            <div className="max-w-7xl mx-auto mb-12 md:mb-16">
                <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-primary)] font-bold block mb-4">
                    Follow Along
                </span>
                <h2
                    className="text-4xl md:text-6xl lg:text-7xl uppercase leading-[0.85] text-white tracking-tighter"
                    style={{ fontFamily: 'var(--font-display)' }}
                >
                    We're on{' '}
                    <span className="text-outline-thick">Instagram</span>
                </h2>
            </div>

            {/* Elfsight widget */}
            <div className="max-w-7xl mx-auto">
                <div
                    className="elfsight-app-22f529d4-5e3b-44f8-9fd7-9cbf2ccf6883"
                    data-elfsight-app-lazy
                />
            </div>
        </section>
    );
}
