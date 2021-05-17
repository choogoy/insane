import SliderCarousel from './SliderCarousel.js';

const reviews = () => {

    const options = {
        main: '.reviews-slider-wrap',
        wrap: '.reviews-slider',

        slidesToShow: 1,
    };
    
    const carousel = new SliderCarousel(options);

    carousel.init();

};

export default reviews;