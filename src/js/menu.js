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
        gutter = 8,                 // Tailwind-safe clamp padding (px)
    } = userOptions;

    const nav         = root.querySelector(selectors.nav);
    const allTriggers = Array.from(root.querySelectorAll(selectors.triggers));
    const normalLinks = Array.from(root.querySelectorAll(selectors.normalLinks));
    const panel       = root.querySelector(selectors.panel);
    const menus       = panel ? Array.from(panel.querySelectorAll(selectors.menus)) : [];

    if (!nav || !panel || !allTriggers.length || !menus.length) return () => {};

    let closeTO = null, openTO = null, activeIdx = -1;
    const onCleanup = [];

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

    const movePanelUnder = (triggerEl) => {
        const containerEl = (panel.offsetParent instanceof HTMLElement) ? panel.offsetParent : nav;
        const trigRect = triggerEl.getBoundingClientRect();
        const cRect    = containerEl.getBoundingClientRect();

        // Measure content width (visible .menu)
        const activeMenu = panel.querySelector('.menu:not(.hidden)');
        const contentW   = activeMenu ? activeMenu.scrollWidth : minWidth;

        // Desired width, clamped to container width minus gutters
        const maxWidth = Math.max(0, Math.floor(cRect.width - gutter * 2));
        let width = Math.max(Math.round(trigRect.width), contentW, minWidth);
        width = Math.min(width, maxWidth);

        // Left relative to container, then clamped so panel stays inside
        let left = Math.round(trigRect.left - cRect.left);
        left = Math.max(gutter, Math.min(left, Math.round(cRect.width - width - gutter)));

        panel.style.width = `${width}px`;
        panel.style.left  = `${left}px`;
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
            movePanelUnder(trigger);

            if (wasHidden) panel.style.visibility = '';

            openPanelClasses();
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
                movePanelUnder(allTriggers[activeIdx]);
            }
        };
        add(window, evt, handler, { passive: true });
    });

    add(document, 'keydown', (e) => {
        if (e.key === 'Escape' && !isPanelHidden()) closePanelSoon(true);
    });

    return function dispose() {
        onCleanup.forEach((fn) => fn());
        clearTimeout(openTO);
        clearTimeout(closeTO);
    };
}

export default initNavDropdown;