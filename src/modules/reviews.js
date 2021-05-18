import SliderCarousel from './SliderCarousel.js';

const reviews = () => {

    const options = {
        main: '.reviews-slider-wrap',
        wrap: '.reviews-slider',
        next: '#reviews-arrow_right',
        prev: '#reviews-arrow_left',
        slidesToShow: 1,
    };
    
    const carousel = new SliderCarousel(options);

    carousel.init();

};

export default reviews;