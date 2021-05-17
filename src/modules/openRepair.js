import SliderCarousel from './SliderCarousel.js';

const openRepair = index => {

    const repairTypesSliderSlides = document.querySelectorAll('.repair-types-slider__slide');
    const typesRepair = document.querySelectorAll('.types-repair');
    const total = document.querySelector('.slider-counter-content__total');
    
    repairTypesSliderSlides.forEach(slide => slide.classList.remove('active-slide'));

    typesRepair.forEach(elem => {
        elem.classList.remove('active-repair');
        elem.style.cssText = 'display: none !important';
    });

    typesRepair[index].style.cssText = 'display: block';
    typesRepair[index].classList.add('active-repair');

    total.textContent = typesRepair[index].children.length;

    const options = {
        main: '.repair-types-slider',
        wrap: `.types-repair${++index}`,
        next: '#repair-types-arrow_right',
        prev: '#repair-types-arrow_left',
        slidesToShow: 1,
    };

    const carousel = new SliderCarousel(options);

    carousel.init();
};

export default openRepair;