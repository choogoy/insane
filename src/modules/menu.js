import smoothScroll from './smoothScroll.js';
import closeMenu from './closeMenu.js';

const menu = () => {

    const headerContactsArrow = document.querySelector('.header-contacts__arrow img');
    const headerContactsPhoneNumberAccord = document.querySelector('.header-contacts__phone-number-accord');
    const popupMenu = document.querySelector('.popup-dialog-menu');

    const openMenu = () => popupMenu.style.transform = 'translate3d(0, 0, 0)';

    window.addEventListener('resize', closeMenu);

    document.addEventListener('click', event => {
        const target = event.target;

        if (target.closest('.header-contacts__arrow')) {

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
    
        if (target.closest('.menu__icon')) {
            openMenu();
        }
    
        if (target.closest('.close-menu')) {
            closeMenu();
        }

        if (target.closest('div.popup-menu-nav__item>a.menu-link') || target.closest('.button-footer > a')) {
            event.preventDefault();
            
            const blockID = target.getAttribute('href').substr(1);

            smoothScroll(blockID);
            closeMenu();
        }

    });

};

export default menu;