import SliderCarousel from './sliderCarousel.js';

const successBlock = () => {

    const formula = document.getElementById('formula');

    const formulaOptions = {
        main: '.formula-slider-wrap',
        wrap: '.formula-slider',
        next: '#formula-arrow_right',
        prev: '#formula-arrow_left',
        slidesToShow: 1,
    };

    const formulaCarousel = new SliderCarousel(formulaOptions);

    formulaCarousel.init();

    formula.addEventListener('mouseover', event => {

        const a = event.target.closest('.formula-item__icon');
    
            if (a) {
                a.firstElementChild.style.cssText = `visibility: visible; opacity: 1; transition: opacity 0.5s; top: ${a.parentNode.clientHeight + 20}px;`;
    
                if (a.parentNode.getBoundingClientRect().top < a.firstElementChild.clientHeight) {
                    a.firstElementChild.style.cssText = `visibility: visible; opacity: 1; transition: opacity 0.5s; top: ${a.parentNode.clientHeight + 20}px;`;
                    a.firstElementChild.classList.add('rotate');
                } else {
                    a.firstElementChild.style.cssText = 'visibility: visible; opacity: 1; transition: opacity 0.5s';
                    a.firstElementChild.classList.remove('rotate');
                }
            }
    });
    
    formula.addEventListener('mouseout', event => {
        const a = event.target.closest('.formula-item__icon');
            if (a) {
                a.firstElementChild.style.visibility = 'hidden';
            }
    });

};

export default successBlock;