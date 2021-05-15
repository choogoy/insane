import SliderCarousel from './sliderCarousel.js';

const tabRepairSlider = () => {

    if (window.innerWidth < 1024) {

        document.querySelector('.nav-list-popup-repair').style.cssText = 'flex-wrap: nowrap;';
        document.querySelectorAll('.popup-repair-types-nav__item').forEach(item => item.style.cssText = 'justify-content: flex-start; padding: 0 20px;');

        const options = {
            main: '.nav-popup-repair-types',
            wrap: '.nav-list-popup-repair',
            next: '#nav-arrow-popup-repair_right',
            prev: '#nav-arrow-popup-repair_left',
            slidesToShow: 1,
        };
    
        const carousel = new SliderCarousel(options);

        carousel.init();
    } else {
        document.querySelectorAll('.popup-repair-types-nav__item').forEach(item => item.classList.remove('glo-slider__item'));
        document.querySelector('.nav-list-popup-repair').style.cssText = 'flex-wrap: wrap; justify-content: center;';
    }

    window.addEventListener('resize', tabRepairSlider);

};

export default tabRepairSlider;