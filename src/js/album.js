let swiper = new Swiper(".mySwiper", {
    lazy: true,
    spaceBetween: 50,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        // when window width is >= 0px (default)
        0: {
            slidesPerView: 1,
        },
        // when window width is >= 640px
        640: {
            slidesPerView: 2,
        },
        700: {
            slidesPerView: 3,
        },
        // when window width is >= 1024px
        1024: {
            slidesPerView: 4,
        },
    }
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