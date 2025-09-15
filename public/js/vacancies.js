// ===== Careers Role Switcher =====
const applyForm = document.querySelector('#apply');


const showApplyForm = () => {
    applyForm.classList.remove('hidden');
};

const hideApplyForm = () => {
    applyForm.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    const rolesContainer = document.querySelector('#roles-container');
    if (!rolesContainer) return;

    const roleCards = Array.from(rolesContainer.querySelectorAll('[data-role-id]'));
    const rolePanels = Array.from(document.querySelectorAll('[data-role-panel]'));
    let currentId = null;
    let isAnimating = false;
    const getPanel = (id) => rolePanels.find(p => p.getAttribute('data-role-panel') === id);
    const fadeOutPanel = (panel) => new Promise((resolve) => {
        hideApplyForm();
        if (!panel) return resolve();
        if (panel.classList.contains('invisible')) return resolve();

        const onEnd = (e) => {
            if (e.propertyName !== 'opacity' && e.propertyName !== 'max-height') return;
            panel.removeEventListener('transitionend', onEnd);

            panel.classList.add('invisible', 'pointer-events-none', '!p-0', 'max-h-0');
            panel.setAttribute('aria-hidden', 'true');
            resolve();
        };
        panel.addEventListener('transitionend', onEnd);
        panel.style.maxHeight = panel.scrollHeight + 'px'; // set current height
        requestAnimationFrame(() => {
            panel.classList.add('opacity-0');
            panel.style.maxHeight = '0px';
        });
    });

    const fadeInPanel = (panel) => new Promise((resolve) => {
        if (!panel) return resolve();

        const onEnd = (e) => {
            if (e.propertyName !== 'opacity' && e.propertyName !== 'max-height') return;
            panel.removeEventListener('transitionend', onEnd);

            panel.style.maxHeight = ''; // clear inline style so it auto-sizes
            resolve();
        };

        panel.classList.remove('invisible', 'pointer-events-none', '!p-0', 'max-h-0');
        panel.setAttribute('aria-hidden', 'false');
        panel.style.maxHeight = '0px';

        requestAnimationFrame(() => {
            panel.addEventListener('transitionend', onEnd);
            panel.classList.remove('opacity-0');
            panel.style.maxHeight = panel.scrollHeight + 'px';
        });
    });

    const setSelectedCard = (id) => {
        roleCards.forEach(card => {
            const isActive = card.getAttribute('data-role-id') === id;

            card.classList.toggle('border', isActive);
            card.classList.toggle('border-[#1797C5]', isActive);

            // update heading colors
            const heading = card.querySelector('h3');
            if (heading) {
                heading.classList.toggle('text-brand-800', isActive);
                heading.classList.toggle('text-[#1797C5]', isActive);
                heading.classList.toggle('text-slate-800', !isActive);
            }

            card.querySelectorAll('span').forEach(span => {
                span.classList.toggle('text-slate-700', isActive);
            });

            card.setAttribute('aria-selected', String(isActive));
            card.tabIndex = isActive ? 0 : -1;
        });
    };

    const switchTo = async (id) => {
        if (isAnimating || id === currentId) return;
        isAnimating = true;

        const nextPanel = getPanel(id);
        const currentPanel = getPanel(currentId);

        await fadeOutPanel(currentPanel);
        await fadeInPanel(nextPanel);

        currentId = id;
        setSelectedCard(id);
        isAnimating = false;
    };

    rolesContainer.addEventListener('click', (e) => {
        const card = e.target.closest('[data-role-id]');
        if (!card || !rolesContainer.contains(card)) return;
        switchTo(card.getAttribute('data-role-id'));
    });

    rolesContainer.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const card = e.target.closest('[data-role-id]');
        if (!card) return;
        e.preventDefault();
        switchTo(card.getAttribute('data-role-id'));
    });

    roleCards.forEach(card => {
        if (!card.hasAttribute('tabindex')) card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.setAttribute('aria-pressed', 'false');
    });

    if (roleCards.length) {
        const firstId = roleCards[0].getAttribute('data-role-id');
        // Immediately show the first panel without animation flicker
        const firstPanel = getPanel(firstId);
        if (firstPanel) {
            firstPanel.classList.remove('invisible', 'pointer-events-none', 'opacity-0', 'max-h-0');
            firstPanel.setAttribute('aria-hidden', 'false');
            currentId = firstId;
            setSelectedCard(firstId);
        }
    }
});