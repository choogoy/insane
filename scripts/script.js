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

};

sectionFormula.addEventListener('mouseover', event => {

    const a = event.target.closest('.formula-item__icon');

        if (a) {
            if (a.parentNode.getBoundingClientRect().top < a.firstElementChild.clientHeight) {
                console.log('повернуть');
                console.dir(a.parentNode);
                console.dir(a.firstElementChild);
                console.log(a.getBoundingClientRect().top);
                console.log(a.firstElementChild.clientHeight);
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

window.addEventListener('resize', checkWidth);