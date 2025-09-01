import './css/style.css'

import { initNavDropdown } from './js/menu.js';

const dispose = initNavDropdown();

if (import.meta.hot) {
    import.meta.hot.dispose(dispose);
}


/*<==========mobile-menu-logic==============>*/

const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuOpen = document.getElementById('mobile-menu-open');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const menuButtons = document.querySelectorAll('.menu-btn');
const menuItems = document.querySelectorAll('.menu-item');

mobileMenuOpen.addEventListener('click', () => {
   mobileMenu.classList.toggle('invisible');
   mobileMenu.classList.toggle('opacity-0');
});

mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.toggle('invisible');
    mobileMenu.classList.toggle('opacity-0');
});

menuButtons.forEach((button, index) => {
    const dropdown = menuItems[index].querySelector('.menu-dropdown');

    button.addEventListener('click', () => {
        const isVisible = dropdown.classList.contains('opacity-100');
        dropdown.classList.toggle('opacity-100', !isVisible);
        dropdown.classList.toggle('pointer-events-none', isVisible);
        dropdown.classList.toggle('scale-100', !isVisible);
        dropdown.classList.toggle('scale-95', isVisible);
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.menu-item')) {
        menuItems.forEach(item => {
            const dropdown = item.querySelector('.menu-dropdown');
            dropdown.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
            dropdown.classList.remove('opacity-100', 'scale-100');
        });
    }
});

/*<==========mobile-menu-logic-end==============>*/