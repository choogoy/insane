'use strict';

const sliderCarousel = () => {
    
    class SliderCarousel {
        constructor({ main, wrap, next, prev, infinity = false, position = 0, slidesToShow = 2, responsive = [] }) {

            if (!main || !wrap) {
                console.warn(`slider-carousel: передайте необходимые селекторы "main" и "wrap"!`);
            }

            this.main = document.querySelector(main);
            this.wrap = document.querySelector(wrap);
            this.next = document.querySelector(next);
            this.prev = document.querySelector(prev);
            this.slidesToShow = slidesToShow;
            this.slides = document.querySelector(wrap).children;
            this.options = {
                position,
                infinity,
                widthSlide: Math.floor(100 / this.slidesToShow),
            };
            this.responsive = responsive;
        }

        init() {
            this.addGloClass();
            this.addStyle();

            if (this.prev && this.next) {
                this.controlSlider();
            } else {
                this.addArrow();
                this.controlSlider();
            }

            if (this.responsive) {
                this.responseInit();
            }
        }

        addGloClass() {
            this.main.classList.add('glo-slider');
            this.wrap.classList.add('glo-slider__wrap');
            for (const item of this.slides) {
                item.classList.add('glo-slider__item');
            }
        }

        addStyle() {

            let style = document.getElementById('sliderCarusel-style');

            if (!style) {
                style = document.createElement('style');
                style.id = 'sliderCarusel-style';
            }

            style.innerHTML = `
                .glo-slider {
                    overflow: hidden !important;
                }
                .glo-slider__wrap {
                    display: flex !important;
                    transition: transform 0.5s !important;
                    will-change: transform !important;
                }
                .glo-slider__item {
                    display: flex !important;
                    align-items: center;
                    justify-content: center;
                    flex: 0 0 ${this.options.widthSlide}% !important;
                    margin: auto 0 !important;
                }`;
            

            document.head.append(style);
        // }        
        }

        controlSlider() {
            this.prev.addEventListener('click', this.prevSlider.bind(this));
            this.next.addEventListener('click', this.nextSlider.bind(this));
        }

        prevSlider() {
            if (this.options.infinity || this.options.position > 0) {
                
                --this.options.position;
                
                if (this.options.position < 0) {
                    this.options.position = this.slides.length - this.slidesToShow;
                }

                this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
            }
        }

        nextSlider() {
            if (this.options.infinity || this.options.position < this.slides.length - this.slidesToShow) {
                ++this.options.position;

                if (this.options.position > this.slides.length - this.slidesToShow) {
                    this.options.position = 0;
                }

                this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
            }
        }

        addArrow() {
            this.prev = document.createElement('button');
            this.next = document.createElement('button');

            this.prev.className = 'glo-slider__prev';
            this.next.className = 'glo-slider__next';

            this.main.append(this.prev);
            this.main.append(this.next);

            const style = document.createElement('style');
            
            style.textContent = `
                .glo-slider__next,
                .glo-slider__prev {
                    margin: 0 10px;
                    border: 20px solid transparent;
                    background: transparent;
                    outline: transparent;
                    cursor: pointer;
                }
                .glo-slider__next {
                    border-left-color: #19bbff;
                }
                .glo-slider__prev {
                    border-right-color: #19bbff;
                }
                .glo-slider__next:hover,
                .glo-slider__prev:hover,
                .glo-slider__next:focus,
                .glo-slider__prev:focus {
                    background: transparent;
                    outline: transparent;
                }`;
            
            document.head.append(style);
        }

        responseInit() {
            const slidesToShowDefault = this.slidesToShow;
            const allResponse = this.responsive.map(item => item.breakpoint);
            const maxResponse = Math.max(...allResponse);

            const checkResponse = () => {
                const widthWindow = document.documentElement.clientWidth;

                if (widthWindow < maxResponse) {
                    for (let i = 0; i < allResponse.length; i++) {
                        if (widthWindow < allResponse[i]) {
                            this.slidesToShow = this.responsive[i].slideToShow;
                            this.options.widthSlide = Math.floor(100 / this.slidesToShow);
                            this.addStyle();
                        }
                    }
                } else {
                    this.slidesToShow = slidesToShowDefault;
                    this.options.widthSlide = Math.floor(100 / this.slidesToShow);
                    this.addStyle();
                }
            };

            checkResponse();

            window.addEventListener('resize', checkResponse);
        }
    }

    const options = {
        main: '.transparency-slider-wrap',
        wrap: '.transparency-slider',
        slidesToShow: 1,
        infinity: true,
        responsive: [
            {
                breakpoint: 1024,
                slideToShow: 3,
            },
            {
                breakpoint: 768,
                slideToShow: 2,
            },
            {
                breakpoint: 576,
                slideToShow: 1,
            },
        ]
    };

    const carousel = new SliderCarousel(options);

    carousel.init();

};


// sliderCarousel();
// export default sliderCarousel;