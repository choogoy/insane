import SliderCarousel from './SliderCarousel.js';

const portfolioBlock = () => {

    const popupPortfolio = document.querySelector('.popup-portfolio');
    const slides = document.querySelectorAll('.portfolio-slider__slide');

    slides.forEach(item => item.style.cssText = 'flex: 0 0 0% !important');

    const options = {
        main: '.portfolio-slider-wrap',
        wrap: '.portfolio-slider',
        // next: '#portfolio-arrow_right',
        // prev: '#portfolio-arrow_left',
        slidesToShow: 3,
    };

    const optionsPopup = {
        main: '.popup-portfolio-slider-wrap',
        wrap: '.popup-portfolio-slider',
        next: '#popup_portfolio_right',
        prev: '#popup_portfolio_left',
        slidesToShow: 1,
    };

    const carousel = new SliderCarousel(options);
    const carouselPopup = new SliderCarousel(optionsPopup);

    carousel.init();
    carouselPopup.init();

    document.addEventListener('click', event => {

        const target = event.target;
        const wrap = document.querySelector('.popup-dialog-portfolio > .row');
        const currentSlide = +document.querySelector('.popup-portfolio-slider__slide.active-slide').dataset.slide;
        const currentValue = document.querySelector('.portfolio-slider-counter-content__current');
        const total = document.querySelectorAll('.popup-portfolio-slider__slide').length;

        if (target.closest('#popup_portfolio_right') || target.closest('#popup_portfolio_left')) {
            currentValue.textContent = currentSlide;
            wrap.children[currentSlide].style.display = 'block';
    
            for (let i = 1; i < wrap.children.length; i++) {
                if (i !== currentSlide) {
                    wrap.children[i].style.display = 'none';  
                }  
            }
        }

        if (target.closest('.portfolio-slider__slide-frame')) {
            popupPortfolio.style.visibility = 'visible';
            popupPortfolio.classList.add('open');
    
            document.querySelector('.portfolio-slider-counter-content__total').textContent = total;
            document.querySelector('.portfolio-slider-counter-content__current').textContent = currentSlide;
    
            wrap.children[currentSlide].style.display = 'block';
        }
    
        if (target.classList.contains('open') || target.closest('.close')) {
            popupPortfolio.style.visibility = 'hidden';
            popupPortfolio.classList.remove('open');
        }

    });

};

export default portfolioBlock;