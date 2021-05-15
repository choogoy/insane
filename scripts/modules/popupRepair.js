
import closeMenu from './closeMenu.js';

const popupRepair = () => {

    const popupRepairTypes = document.querySelector('.popup-repair-types');

    document.addEventListener('click', event => {

        const target = event.target;

        if (target.closest('.no-overflow')) {
            closeMenu();
            popupRepairTypes.style.visibility = 'visible';
            popupRepairTypes.classList.add('open');
        }

        if (target.closest('.popup-repair-types > .close') || target.closest('.popup-repair-types-nav__title > .close') || target.classList.contains('open')) {
            popupRepairTypes.style.visibility = 'hidden';
            popupRepairTypes.classList.remove('open');
        }

    });
};

export default popupRepair;