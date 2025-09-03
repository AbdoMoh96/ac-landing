const sliderNav = document.querySelector('.slider-nav');

const sliderNavElements = [...sliderNav.getElementsByTagName('span')];


const sliderNavUnderLine = (el) => {
  const selectedElement = el.target.innerHTML;

  sliderNavElements.forEach((item) => {
      if (item.innerHTML === selectedElement) {
         item.classList.remove('border-b-transparent');
         item.classList.remove('text-[#ACACAC]');
         item.classList.add('text-[#1C5064]');
      }else{
          item.classList.add('border-b-transparent');
          item.classList.add('text-[#ACACAC]');
          item.classList.remove('text-[#1C5064]');
      }
  })
};

sliderNavElements.forEach(el => {
    el.addEventListener('click', sliderNavUnderLine);
});

const swiper = new Swiper('.about-swiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    fadeEffect: { crossFade: true },
    effect: "fade",
    allowTouchMove: false,
    speed: 400,
    resistanceRatio: 0.85,
    on: {
        slideChange() {
            setActiveTab(swiper.activeIndex);
        }
    }
});


const prevBtn = document.getElementById('prevArrow');
const nextBtn = document.getElementById('nextArrow');

const servicesSwiper = new Swiper('.services-swiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    fadeEffect: { crossFade: true },
    effect: "fade",
    allowTouchMove: true,
    speed: 400,
    resistanceRatio: 0.85,
    on: {
        init(swiper) {
            updateArrows(swiper);
        },
        slideChange(swiper) {
            if (typeof setActiveTab === 'function') setActiveTab(swiper.activeIndex);
            updateArrows(swiper);
        }
    }
});



function setEnabled(el, enabled) {
    if (enabled) {
        el.classList.remove('grayscale', 'pointer-events-none');
        el.classList.add('cursor-pointer');
    } else {
        el.classList.add('grayscale', 'pointer-events-none');
        el.classList.remove('cursor-pointer');
    }
}

function updateArrows(swiper) {
    setEnabled(prevBtn, !swiper.isBeginning);
    setEnabled(nextBtn, !swiper.isEnd);
}

prevBtn.addEventListener('click', () => {
    if (!servicesSwiper.isBeginning) servicesSwiper.slidePrev();
});

nextBtn.addEventListener('click', () => {
    if (!servicesSwiper.isEnd) servicesSwiper.slideNext();
});

if (servicesSwiper.initialized) updateArrows(servicesSwiper);



const tabs = document.querySelectorAll('.slider-nav span');
tabs.forEach((tab, i) => {
    tab.setAttribute('role', 'button');
    tab.setAttribute('tabindex', '0');
    tab.dataset.index = i;
    tab.addEventListener('click', () => swiper.slideTo(i));
    tab.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            swiper.slideTo(i);
        }
    });
});

function setActiveTab(activeIdx) {
    tabs.forEach((tab, i) => {
        if (i === activeIdx) {
            tab.classList.remove('border-b-transparent');
        } else {
            // ensure this class exists at build time (already present in HTML)
            tab.classList.add('border-b-transparent');
        }
    });
}

// Set initial active underline (slide 0)
setActiveTab(0);


