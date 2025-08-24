let swiper = new Swiper(".mySwiper", {
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

let swiperModal = new Swiper(".modalSwiper", {
    lazy: true,
    slidesPerView: 1,
    navigation: {
        nextEl: ".swiper-button-next-modal",
        prevEl: ".swiper-button-prev-modal",
    },
});

let modal = document.getElementById("slider-modal");

let openModal = (slideId= 1) => {
   swiperModal.slideTo(slideId, 0);
   modal.classList.toggle("invisible");
}

let closeModal = () => {
    modal.classList.toggle("invisible");
}