const regionSwiper = new Swiper(".regions", {
    // your base options
    lazy: { loadOnTransitionStart: true },
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },
    simulateTouch: true,
    grabCursor: true,
    speed: 600,

    breakpoints: {
        0:   { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        700: { slidesPerView: 3 },
        1024:{ slidesPerView: 4 }
    }
});

const businessSectorsSwiper = new Swiper(".business-sectors", {
    // your base options
    lazy: { loadOnTransitionStart: true },
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },
    simulateTouch: true,
    grabCursor: true,
    speed: 600,

    breakpoints: {
        0:   { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        700: { slidesPerView: 3 },
        1024:{ slidesPerView: 4 }
    }
});

const customersSwiper2 = new Swiper(".customers", {
// your base options
    lazy: { loadOnTransitionStart: true },
    slidesPerView: 4,
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },
    simulateTouch: true,
    grabCursor: true,
    speed: 600,

    breakpoints: {
        0:   { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        700: { slidesPerView: 4 },
        800: { slidesPerView: 4 },
        2000:{ slidesPerView: 4 }
    }
});