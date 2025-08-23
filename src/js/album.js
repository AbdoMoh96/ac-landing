var swiper = new Swiper(".mySwiper", {
    lazy: true,
    slidesPerView: 4,
    spaceBetween: 45,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});