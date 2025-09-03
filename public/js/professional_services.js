    const items = [...document.querySelectorAll('.service-item')];
    const panes = [...document.querySelectorAll('.pane')];

    function showPane(selector){
    panes.forEach(p => p.classList.add('hidden'));
    const pane = document.querySelector(selector);
    if (pane) pane.classList.remove('hidden');
}

    // init + events
    items.forEach((li, idx) => {
    if (idx === 0) li.classList.add('text-cyan-700');
    li.addEventListener('click', () => {
    items.forEach(i => i.classList.remove('text-cyan-700'));
    li.classList.add('text-cyan-700');
    showPane(li.dataset.target);
    moveIndicatorTo(li);
});
});

    // initial alignment
    window.addEventListener('load', () => moveIndicatorTo(items[0]));
    window.addEventListener('resize', () => {
    const current = document.querySelector('.service-item.text-cyan-700') || items[0];
    moveIndicatorTo(current);
});