export function initNavDropdown(userOptions = {}) {
    const {
        root = document,
        selectors = {
            nav: '.navbar',
            triggers: '.nav-item[data-target]',
            normalLinks: '.nav-link',
            panel: '#dropdown',
            menus: '.menu',
        },
        openDelay = 25,
        closeDelay = 120,
        minWidth = 220,
        gutter = 8,
        moveDurationMs = 180,
        sizeDurationMs = 200,
        easing = 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        // Force a direction if needed: 'ltr' | 'rtl' | 'auto'
        direction = 'auto',
    } = userOptions;

    const nav         = root.querySelector(selectors.nav);
    const allTriggers = Array.from(root.querySelectorAll(selectors.triggers));
    const normalLinks = Array.from(root.querySelectorAll(selectors.normalLinks));
    const panel       = root.querySelector(selectors.panel);
    const menus       = panel ? Array.from(panel.querySelectorAll(selectors.menus)) : [];

    if (!nav || !panel || !allTriggers.length || !menus.length) return () => {};

    // ---- RTL detection ----
    const docDir = (direction === 'auto'
            ? (document.documentElement.getAttribute('dir') || getComputedStyle(document.documentElement).direction)
            : direction
    )?.toLowerCase();
    const isRTL = docDir === 'rtl';

    // Ensure predictable base positioning (transform from left=0)
    panel.style.position = panel.style.position || 'absolute';
    panel.style.left = '0px';
    panel.style.right = 'auto';

    let closeTO = null, openTO = null, activeIdx = -1;
    const onCleanup = [];
    let animReady = false;

    const enablePanelTransitions = () => {
        panel.style.transitionProperty = 'transform,width';
        panel.style.transitionDuration = `${moveDurationMs}ms, ${sizeDurationMs}ms`;
        panel.style.transitionTimingFunction = `${easing}, ${easing}`;
        panel.style.willChange = 'transform,width';
        // Optional: transform origin at inline-start (mostly useful if you later add scale effects)
        panel.style.transformOrigin = isRTL ? 'top right' : 'top left';
    };
    const disablePanelTransitions = () => {
        panel.style.transitionProperty = 'none';
    };

    const setExpanded = (idx) => {
        allTriggers.forEach((el, i) => el.setAttribute('aria-expanded', String(i === idx)));
    };

    const showMenuById = (id) => {
        menus.forEach((m) => m.classList.toggle('hidden', m.id !== id));
    };

    const isPanelHidden = () => panel.classList.contains('hidden');

    const openPanelClasses = () => {
        panel.classList.remove('hidden', 'opacity-0', '-translate-y-2', 'pointer-events-none');
        panel.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
    };

    const closePanelClasses = (immediate) => {
        panel.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
        panel.classList.add('opacity-0', '-translate-y-2', 'pointer-events-none');
        if (immediate) panel.classList.add('hidden');
        else setTimeout(() => panel.classList.add('hidden'), 150);
    };

    const setPanelGeometry = (leftPx, widthPx, { immediate = false } = {}) => {
        if (immediate || !animReady) {
            const prev = panel.style.transitionProperty;
            disablePanelTransitions();
            panel.style.transform = `translateX(${leftPx}px)`;
            panel.style.width = `${widthPx}px`;
            requestAnimationFrame(() => {
                panel.style.transitionProperty = prev || 'transform,width';
            });
        } else {
            panel.style.transform = `translateX(${leftPx}px)`;
            panel.style.width = `${widthPx}px`;
        }
    };

    // Compute left (from container's left edge) and width, honoring RTL inline-start
    const computeGeometry = (triggerEl) => {
        const containerEl = (panel.offsetParent instanceof HTMLElement) ? panel.offsetParent : nav;
        const trigRect = triggerEl.getBoundingClientRect();
        const cRect    = containerEl.getBoundingClientRect();

        const activeMenu = panel.querySelector('.menu:not(.hidden)');
        const contentW   = activeMenu ? activeMenu.scrollWidth : minWidth;

        const maxWidth = Math.max(0, Math.floor(cRect.width - gutter * 2));
        let width = Math.max(Math.round(trigRect.width), contentW, minWidth);
        width = Math.min(width, maxWidth);

        // inline-start alignment:
        // LTR => align panel's left to trigger's left
        // RTL => align panel's right to trigger's right
        let left = isRTL
            ? Math.round(trigRect.right - cRect.left - width)
            : Math.round(trigRect.left  - cRect.left);

        // Clamp inside container with gutters
        left = Math.max(gutter, Math.min(left, Math.round(cRect.width - width - gutter)));

        return { left, width };
    };

    const movePanelUnder = (triggerEl, { immediate = false } = {}) => {
        const { left, width } = computeGeometry(triggerEl);
        setPanelGeometry(left, width, { immediate });
    };

    const openPanelFor = (index) => {
        clearTimeout(closeTO);
        openTO = setTimeout(() => {
            const trigger = allTriggers[index];
            if (!trigger) return;

            const id = trigger.dataset.target;

            const wasHidden = isPanelHidden();
            if (wasHidden) {
                panel.classList.remove('hidden');
                panel.style.visibility = 'hidden'; // measure without flash
            }

            showMenuById(id);
            movePanelUnder(trigger, { immediate: wasHidden || !animReady });

            if (wasHidden) {
                panel.style.visibility = '';
                openPanelClasses();
                requestAnimationFrame(() => {
                    enablePanelTransitions();
                    animReady = true;
                });
            }

            activeIdx = index;
            setExpanded(index);
        }, openDelay);
    };

    const closePanelSoon = (immediate = false) => {
        clearTimeout(openTO);
        clearTimeout(closeTO);
        const action = () => {
            closePanelClasses(immediate);
            activeIdx = -1;
            setExpanded(-1);
        };
        if (immediate) action();
        else closeTO = setTimeout(action, closeDelay);
    };

    const add = (el, evt, handler, opts) => {
        el.addEventListener(evt, handler, opts);
        onCleanup.push(() => el.removeEventListener(evt, handler, opts));
    };

    allTriggers.forEach((el, i) => {
        add(el, 'mouseenter', () => openPanelFor(i));
        add(el, 'focus',     () => openPanelFor(i));
        add(el, 'click', (e) => {
            const expanded = el.getAttribute('aria-expanded') === 'true';
            if (expanded && !isPanelHidden()) closePanelSoon(true);
            else openPanelFor(i);
            e.preventDefault();
        });
    });

    normalLinks.forEach((link) => {
        add(link, 'mouseenter', () => closePanelSoon(true));
        add(link, 'focus',      () => closePanelSoon(true));
    });

    [nav, panel].forEach((el) => {
        add(el, 'mouseenter', () => clearTimeout(closeTO));
        add(el, 'mouseleave', () => closePanelSoon(false));
    });

    ['resize', 'scroll'].forEach((evt) => {
        const handler = () => {
            if (!isPanelHidden() && activeIdx >= 0) {
                // Jump to the correct spot during layout changes
                movePanelUnder(allTriggers[activeIdx], { immediate: true });
            }
        };
        add(window, evt, handler, { passive: true });
    });

    add(document, 'keydown', (e) => {
        if (e.key === 'Escape' && !isPanelHidden()) closePanelSoon(true);
    });

    disablePanelTransitions();

    return function dispose() {
        onCleanup.forEach((fn) => fn());
        clearTimeout(openTO);
        clearTimeout(closeTO);
    };
}

export default initNavDropdown;
