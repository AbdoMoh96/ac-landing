const sliderNav = document.querySelector('.slider-nav');

const sliderNavElements = [...sliderNav.getElementsByTagName('span')];


const sliderNavUnderLine = (el) => {
  const selectedElement = el.target.innerHTML;

  sliderNavElements.forEach((item) => {
      if (item.innerHTML === selectedElement) {
         item.classList.remove('border-b-transparent');
      }else{
          item.classList.add('border-b-transparent');
      }
  })
};

sliderNavElements.forEach(el => {
    el.addEventListener('click', sliderNavUnderLine);
});


