import './css/style.css'

import { initNavDropdown } from './js/menu.js';

const dispose = initNavDropdown();

if (import.meta.hot) {
    import.meta.hot.dispose(dispose);
}

