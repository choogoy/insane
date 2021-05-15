import SliderCarousel from './sliderCarousel.js';
import openRepair from './openRepair.js';

const repairNavSlider = () => {

    const repairTypesNavItems = document.querySelectorAll('.repair-types-nav__item');
    const switchInner = document.getElementById('switch-inner');

    if (window.innerWidth < 1024) {

        document.querySelector('.repair-types-nav').classList.add('repair-types-nav-slider');
        document.querySelector('.nav-list-repair').classList.add('nav-list-repair-slider');
        document.querySelector('.nav-list-repair-slider').style.cssText = 'flex-wrap: nowrap;';
        document.querySelectorAll('.repair-types-nav__item').forEach(item => item.style.cssText = 'padding: 0 20px; justify-content: flex-start;');

        const options = {
            main: '.repair-types-nav-slider',
            wrap: '.nav-list-repair-slider',
            next: '#nav-arrow-repair-right_base',
            prev: '#nav-arrow-repair-left_base',
            slidesToShow: 1,
        };
    
        const carousel = new SliderCarousel(options);

        carousel.init();

    } else {

        document.querySelector('.repair-types-nav').classList.remove('repair-types-nav-slider');
        document.querySelector('.nav-list-repair').classList.remove('nav-list-repair-slider');
        document.querySelectorAll('.repair-types-nav__item').forEach(item => item.classList.remove('glo-slider__item'));
        document.querySelector('.nav-list-repair').style.cssText = 'flex-wrap: wrap;';
        
    }
    
    document.addEventListener('click', event => {
        const target = event.target;
    
        if (target.closest('.repair-types-nav__item')) {
    
            repairTypesNavItems.forEach(item => item.classList.remove('active'));
            
            target.classList.add('active');
    
            repairTypesNavItems.forEach((elem, index) => {
                if (target === elem) {
                    openRepair(index);
                }
            });
    
        }
    
        if (target.closest('#repair-types-arrow_left') || target.closest('#repair-types-arrow_right') || target.closest('.repair-types-nav__item')) {
    
            const activeSlide = document.querySelector('.active-repair > .active-slide');
            const current = document.querySelector('.repair-slider-counter-content__current');
    
            current.textContent = activeSlide.dataset.slide;
    
        }
    
        if (target.closest('.popup-repair-types-nav__item')) {
    
            document.querySelectorAll('.popup-repair-types-nav__item').forEach(item => item.classList.remove('active'));
            target.classList.add('active');
            switchInner.textContent = target.textContent;
        }
    
    });

    window.addEventListener('resize', repairNavSlider);

};

export default repairNavSlider;