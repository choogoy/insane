import SliderCarousel from './SliderCarousel.js';

const transparencySlider = () => {

    const popupTransparency = document.querySelector('.popup-transparency');

    const options = {
        main: '.popup-transparency-slider-wrap',
        wrap: '.popup-transparency-slider',
        // next: '#transparency_right',
        // prev: '#transparency_left',
        slidesToShow: 1,
    };
    
    const carousel = new SliderCarousel(options);

    carousel.init();

    if (window.innerWidth < 1090) {
        document.querySelector('.transparency-slider-wrap').classList.add('transparency-slider-wrap-mobile');
        document.querySelector('.transparency-slider').classList.add('transparency-slider-mobile');
        document.querySelector('.transparency-slider').style.flexWrap = 'nowrap';
        document.querySelectorAll('.transparency-item').forEach(item => item.style.cssText = 'flex: 0 0 100% !important');

        const optionsMobile = {
            main: '.transparency-slider-wrap-mobile',
            wrap: '.transparency-slider-mobile',
            next: '#transparency-arrow_right',
            prev: '#transparency-arrow_left',
            slidesToShow: 1,
        };
    
        const carouselMobile = new SliderCarousel(optionsMobile);

        carouselMobile.init();

    } else {
        document.querySelector('.transparency-slider-wrap').classList.remove('transparency-slider-wrap-mobile');
        document.querySelector('.transparency-slider').classList.remove('transparency-slider-mobile');
        document.querySelector('.transparency-slider').style.cssText = 'flex-frap: wrap; transform: translate(0);';
        document.querySelectorAll('.transparency-item').forEach(item => item.style.cssText = 'flex: 0 0 0 !important');
    }

    document.addEventListener('click', event => {
        const target = event.target;

        if (target.closest('.transparency-item__img')) {
            popupTransparency.style.visibility = 'visible';
            popupTransparency.classList.add('open');
        }
    
        if (target.closest('.popup-transparency > .close') || target.classList.contains('open')) {
            popupTransparency.style.visibility = 'hidden';
            popupTransparency.classList.remove('open');
        }
    });

    window.addEventListener('resize', transparencySlider);

};

export default transparencySlider;