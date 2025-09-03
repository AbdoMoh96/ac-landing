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



const slides = document.querySelectorAll('.staff-aug-services .swiper-slide');
const panels = document.querySelectorAll('.service-panel');
let openPanel = null;

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
    });
}

slides.forEach(slide => {
    slide.addEventListener('click', () => {
        const panelId = 'panel-' + slide.id;
        const targetPanel = document.getElementById(panelId);

        if (!targetPanel) return;

        if (openPanel === targetPanel) {
            collapse(targetPanel);
            openPanel = null;
            return;
        }

        if (openPanel) collapse(openPanel);
        expand(targetPanel);
        openPanel = targetPanel;
    });
});