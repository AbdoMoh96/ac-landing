const staffAugServicesSwiper = new Swiper(".staff-aug-services", {
    // your base options
    loop: false,
    simulateTouch: true,
    grabCursor: true,
    breakpoints: {
        0:   { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        700: { slidesPerView: 3 },
    }
});



let slidesAug = document.querySelectorAll('.staff-aug-services .swiper-slide');
let openPanelAug = null;

function expand(panel) {
    panel.style.display = 'block';
    panel.style.height = 'auto';
    const targetHeight = panel.scrollHeight + 'px';
    panel.style.height = '0px';
    requestAnimationFrame(() => {
        panel.style.height = targetHeight;
    });
    panel.addEventListener('transitionend', function handler(e) {
        if (e.propertyName !== 'height') return;
        panel.style.height = 'auto';
        panel.removeEventListener('transitionend', handler);
    });
}

function collapse(panel) {
    panel.style.height = panel.scrollHeight + 'px';
    requestAnimationFrame(() => {
        panel.style.height = '0px';
        panel.style.margin = '0px';
    });
}

slidesAug.forEach(slide => {
    slide.addEventListener('click', () => {
        const panelId = 'panel-' + slide.id;
        const targetPanel = document.getElementById(panelId);

        if (!targetPanel) return;

        if (openPanel === targetPanel) {
            collapse(targetPanel);
            openPanelAug = null;
            return;
        }

        if (openPanelAug) collapse(openPanelAug);
        expand(targetPanel);
        openPanelAug = targetPanel;
    });
});