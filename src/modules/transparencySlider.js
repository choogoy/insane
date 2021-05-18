import SliderCarousel from './SliderCarousel.js';

const transparencySlider = () => {

    const popupTransparency = document.querySelector('.popup-transparency');
    const transparencyCurrentSlider = document.querySelector('.transparency-slider-counter-content__current');
    const transparencyTotal = document.querySelector('.transparency-slider-counter-content__total');

    const checkArrows = () => {

        if (window.innerWidth < 1091) {

            const currentSlide = document.querySelector('.transparency-slider > .active-slide');

            if (currentSlide) {

                if (currentSlide.dataset.slide == 3) {
                    document.getElementById('transparency-arrow_right').style.display = 'none';
                } else {
                    document.getElementById('transparency-arrow_right').style.display = 'flex';
                }
            
                if (currentSlide.dataset.slide == 1) {
                    document.getElementById('transparency-arrow_left').style.display = 'none';
                } else {
                    document.getElementById('transparency-arrow_left').style.display = 'flex';
                }
            } else {
                window.removeEventListener('resize', checkArrows);
            }
            

        } else {
            document.getElementById('transparency-arrow_right').style.display = 'none';
            document.getElementById('transparency-arrow_left').style.display = 'none';
        }

    };

    const options = {
        main: '.popup-transparency-slider-wrap',
        wrap: '.popup-transparency-slider',
        next: '#transparency_right',
        prev: '#transparency_left',
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

    checkArrows();

    document.addEventListener('click', event => {
        const target = event.target;
        const popupCurrentSlide = document.querySelector('.popup-transparency-slider > .active-slide');
        const total = document.querySelectorAll('.popup-transparency-slider__slide').length;
        const wrapper = document.querySelector('.popup-dialog-transparency-wrapper');

        transparencyTotal.textContent = total;
        transparencyCurrentSlider.textContent = popupCurrentSlide.dataset.slide;
        
        checkArrows();

        wrapper.style.cssText = `
            position: relative;
            width: 100%;
            display: flex;
            justify-content: center;
        `;

        if (popupCurrentSlide.dataset.slide == 3) {
            document.getElementById('transparency_right').style.display = 'none';
        } else {
            document.getElementById('transparency_right').style.display = 'flex';
        }

        if (popupCurrentSlide.dataset.slide == 1) {
            document.getElementById('transparency_left').style.display = 'none';
        } else {
            document.getElementById('transparency_left').style.display = 'block';
        }
        
        if (target.closest('.transparency-item__img')) {
            popupTransparency.style.visibility = 'visible';
            popupTransparency.classList.add('open');
        }
    
        if (target.closest('.popup-transparency > .close') || target.classList.contains('open') || target.classList.contains('popup-dialog-transparency-wrapper')) {
            popupTransparency.style.visibility = 'hidden';
            popupTransparency.classList.remove('open');
        }

    });

    window.addEventListener('resize', () => {
        checkArrows();
        transparencySlider();
    });

};

export default transparencySlider;