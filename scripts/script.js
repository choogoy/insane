'use strict';

const headerContactsPhoneNumberAccord = document.querySelector('.header-contacts__phone-number-accord');
const headerContactsArrow = document.querySelector('.header-contacts__arrow img');
const popups = document.querySelectorAll('.popup');
const popupMenu = document.querySelector('.popup-dialog-menu');
const popupRepairTypes = document.querySelector('.popup-repair-types');
const popupPrivacy = document.querySelector('.popup-privacy');
const popupConsultation = document.querySelector('.popup-consultation');
const popupTransparency = document.querySelector('.popup-transparency');
const popupThank = document.querySelector('.popup-thank');
const accordion = document.querySelectorAll('.title_block');
const sectionFormula = document.getElementById('formula');
const navListRepair = document.querySelector('.nav-list-repair');
const typesRepair = document.querySelectorAll('.types-repair');
const repairTypesNavItems = document.querySelectorAll('.repair-types-nav__item');

const maskPhone = (selector, masked = '+7 (___) ___-__-__') => {
	const elems = document.querySelectorAll(selector);

	function mask(event) {
		const keyCode = event.keyCode;
		const template = masked,
			def = template.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, "");
		let i = 0,
			newValue = template.replace(/[_\d]/g, function (a) {
				return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
			});
		i = newValue.indexOf("_");
		if (i != -1) {
			newValue = newValue.slice(0, i);
		}
		let reg = template.substr(0, this.value.length).replace(/_+/g,
			function (a) {
				return "\\d{1," + a.length + "}";
			}).replace(/[+()]/g, "\\$&");
		reg = new RegExp("^" + reg + "$");
		if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
			this.value = newValue;
		}
		if (event.type == "blur" && this.value.length < 5) {
			this.value = "";
		}

	}

	for (const elem of elems) {
		elem.addEventListener("input", mask);
		elem.addEventListener("focus", mask);
		elem.addEventListener("blur", mask);
	}
	
};

const sendForm = () => {
    const forms = document.querySelectorAll('form');
  
    const postData = body => {
        return fetch('server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(body)
        });
    };
  
    const requestForm = (form, event) => {
        event.preventDefault();
        const formData = new FormData(form);
        let body = {};
          
        formData.forEach((value, key) => body[key] = value);

        const formReset = () => {
            form.reset();
            setTimeout(() => {
                popupThank.style.visibility = 'hidden';
            }, 2000);
        };
  
        postData(body)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error(`status: ${response.status}`);
                }
                popupThank.style.visibility = 'visible';
                formReset();
            })
            .catch(error => {
                console.error(error);
                formReset();
            });
    };
  
    forms.forEach(form => form.addEventListener('submit', event => requestForm(form, event)));
};

sendForm();

const checkWidth = () => {
    const width = window.innerWidth;
    if (width < 576) {
        popupMenu.style.transform = 'translate3d(0, -100vh, 0)';
    } else {
        popupMenu.style.transform = 'translate3d(645px, 0, 0)';
    }
};

checkWidth();

const openMenu = () => popupMenu.style.transform = 'translate3d(0, 0, 0)';

const closeMenu = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 576) {
        popupMenu.style.transform = 'translate3d(0, -100vh, 0)';
    } else {
        popupMenu.style.transform = 'translate3d(645px, 0, 0)';
    }
};

const smoothScroll = id => {
    document.getElementById(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
};

const closeAccordion = () => accordion.forEach(item => item.classList.remove('msg-active'));

closeAccordion();
   
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
        this.slides[0].classList.add('active-slide'); 
        this.slides[0].dataset.slide = 1;
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
        for (const item of this.slides) {
            item.classList.remove('active-slide');
        }
        this.slides[this.options.position].classList.add('active-slide'); 
        this.slides[this.options.position].dataset.slide = this.options.position + 1;
    }

    nextSlider() {
        if (this.options.infinity || this.options.position < this.slides.length - this.slidesToShow) {
            ++this.options.position;

            if (this.options.position > this.slides.length - this.slidesToShow) {
                this.options.position = 0;
            }

            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
        }
        for (const item of this.slides) {
            item.classList.remove('active-slide');
        }
        this.slides[this.options.position].classList.add('active-slide');    
        this.slides[this.options.position].dataset.slide = this.options.position + 1;
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
    main: '.repair-types-slider',
    wrap: '.types-repair1',
    next: '#repair-types-arrow_right',
    prev: '#repair-types-arrow_left',
    slidesToShow: 1,
};

const options3 = {
    main: '.popup-transparency-slider-wrap',
    wrap: '.popup-transparency-slider',
    // next: '#transparency_right',
    // prev: '#transparency_left',
    slidesToShow: 1,
};

const options2 = {
    main: '.reviews-slider-wrap',
    wrap: '.reviews-slider',
    // next: '#reviews-arrow_right',
    // prev: '#reviews-arrow_left',
    slidesToShow: 1,
};

const formulaOptions = {
    main: '.formula-slider-wrap',
    wrap: '.formula-slider',
    next: '#formula-arrow_right',
    prev: '#formula-arrow_left',
    slidesToShow: 1,
};


const repairOptions = {
    main: '.repair-types-nav',
    wrap: '.nav-list-repair',
    next: '.nav-arrow_right',
    prev: '.nav-arrow_left',
    slidesToShow: 1,
};

const repairSlider = new SliderCarousel(repairOptions);

// if (window.innerWidth < 1024) {
//     repairSlider.init();
// }


const a = document.querySelector('.repair-types-slider').childElementCount;

const formulaCarousel = new SliderCarousel(formulaOptions);
// const carousel = new SliderCarousel(options);
const carousel2 = new SliderCarousel(options2);
const carousel3 = new SliderCarousel(options3);

formulaCarousel.init();
// carousel.init();
carousel2.init();
carousel3.init();

const openRepair = index => {

    const repairTypesSliderSlides = document.querySelectorAll('.repair-types-slider__slide');

    repairTypesSliderSlides.forEach(slide => slide.classList.remove('active-slide'));

    typesRepair.forEach(elem => {
        elem.classList.remove('active-repair');
        elem.style.cssText = 'display: none !important';
    });
    typesRepair[index].style.cssText = 'display: block';
    typesRepair[index].classList.add('active-repair');
    let total = document.querySelector('.slider-counter-content__total');

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

openRepair(0);


const transparencySlider = () => {

    if (window.innerWidth < 1090) {
        document.querySelector('.transparency-slider-wrap').classList.add('transparency-slider-wrap-mobile');
        document.querySelector('.transparency-slider').classList.add('transparency-slider-mobile');
        document.querySelector('.transparency-slider').style.flexWrap = 'nowrap';
        document.querySelectorAll('.transparency-item').forEach(item => item.style.cssText = 'flex: 0 0 100% !important');


        const options = {
            main: '.transparency-slider-wrap-mobile',
            wrap: '.transparency-slider-mobile',
            next: '#transparency-arrow_right',
            prev: '#transparency-arrow_left',
            slidesToShow: 1,
        };
    
        const carousel = new SliderCarousel(options);
        
        carousel.init();

    } else {
        document.querySelector('.transparency-slider-wrap').classList.remove('transparency-slider-wrap-mobile');
        document.querySelector('.transparency-slider').classList.remove('transparency-slider-mobile');
        document.querySelector('.transparency-slider').style.cssText = 'flex-frap: wrap; transform: translate(0);';
        document.querySelectorAll('.transparency-item').forEach(item => item.style.cssText = 'flex: 0 0 0 !important');
    }

};

transparencySlider();

document.onclick = event => {
    const target = event.target;
    const contactsArrow = target.closest('.header-contacts__arrow');
    const menuIcon = target.closest('.menu__icon');
    const closeMenuBtn = target.closest('.close-menu');

    console.dir(target);

    if (target.id.includes('feedback-input')) {
        maskPhone(`#${target.id}`, '+7 (___) ___-__-__');
    }

    if (contactsArrow) {

        headerContactsPhoneNumberAccord.classList.toggle('open');

        if (headerContactsPhoneNumberAccord.classList.contains('open')) {
        headerContactsArrow.style.cssText = 'transform: rotate(180deg); transition: transform 0.5s';
        headerContactsPhoneNumberAccord.style.top = '25px';
        headerContactsPhoneNumberAccord.firstElementChild.style.opacity = 1;
        } else {
        headerContactsPhoneNumberAccord.style.top = 0;
        headerContactsPhoneNumberAccord.firstElementChild.style.opacity = 0;
        headerContactsArrow.style.transform = 'rotate(0)';
        }

    }

    if (menuIcon) {
        openMenu();
    }

    if (closeMenuBtn) {
        closeMenu();
    }

    if (target.closest('.no-overflow')) {
        closeMenu();
        popupRepairTypes.style.visibility = 'visible';
    }

    if (target.closest('div.popup-menu-nav__item>a.menu-link') || target.closest('.button-footer > a')) {
        event.preventDefault();
        const blockID = target.getAttribute('href').substr(1);
        smoothScroll(blockID);
        closeMenu();
    }

    if (target.closest('.popup-repair-types > .close') || target.closest('.popup-repair-types-nav__title > .close')) {
        popupRepairTypes.style.visibility = 'hidden';
    }

    if (target.closest('span.link-privacy')) {
        popupPrivacy.style.visibility = 'visible';
    }

    if (target.closest('.popup-dialog-privacy > .close') || target.closest('.popup-privacy > .close')) {
        popupPrivacy.style.visibility = 'hidden';
    }

    if (target.closest('.button_wide')) {
        popupConsultation.style.visibility = 'visible';
    }

    if (target.closest('.close-consultation')) {
        popupConsultation.style.visibility = 'hidden';
    }

    if (target.closest('.transparency-item__img')) {
        popupTransparency.style.visibility = 'visible';
    }

    if (target.closest('.popup-transparency > .close')) {
        popupTransparency.style.visibility = 'hidden';
    }

    if (target.closest('.close-thank')) {
        popupThank.style.visibility = 'hidden';
    }

    // accordion
    if (target.closest('.title_block')) {
        if (!target.classList.contains('msg-active')) {
            closeAccordion();
            target.classList.add('msg-active');
        } else {
            target.classList.remove('msg-active');
        }
    }

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

        let activeSlide = document.querySelector('.active-repair > .active-slide');
        let current = document.querySelector('.repair-slider-counter-content__current');

        current.textContent = activeSlide.dataset.slide;

    }

};

sectionFormula.addEventListener('mouseover', event => {

    const a = event.target.closest('.formula-item__icon');

        if (a) {
            a.firstElementChild.style.cssText = `visibility: visible; opacity: 1; transition: opacity 0.5s; top: ${a.parentNode.clientHeight + 20}px; z-index: 20`;

            if (a.parentNode.getBoundingClientRect().top < a.firstElementChild.clientHeight) {
                a.firstElementChild.style.cssText = `visibility: visible; opacity: 1; transition: opacity 0.5s; top: ${a.parentNode.clientHeight + 20}px; z-index: 20`;
                a.firstElementChild.classList.add('rotate');
            } else {
                a.firstElementChild.style.cssText = 'visibility: visible; opacity: 1; transition: opacity 0.5s';
                a.firstElementChild.classList.remove('rotate');
            }
        }
});

sectionFormula.addEventListener('mouseout', event => {
    const a = event.target.closest('.formula-item__icon');
        if (a) {
            a.firstElementChild.style.visibility = 'hidden';
        }
});

window.addEventListener('resize', () => {
    transparencySlider();
    checkWidth();
});