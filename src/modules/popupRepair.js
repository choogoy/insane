
import closeMenu from './closeMenu.js';
import repairData from './repairData.js';
import repairNavSlider from './repairNavSlider.js';

const popupRepair = () => {

    const popupRepairTypes = document.querySelector('.popup-repair-types');
    const navListPopupRepair = document.querySelector('.nav-list-popup-repair');

    document.addEventListener('click', event => {

        const target = event.target;

        if (target.closest('.no-overflow')) {
            const data = repairData();

            closeMenu();
            repairNavSlider();

            popupRepairTypes.style.visibility = 'visible';
            popupRepairTypes.classList.add('open');

            data.then(response => {

                const types = new Set();

                response.forEach(item => types.add(item.type));

                navListPopupRepair.textContent = '';

                types.forEach((type, index) => {
                    const btn = document.createElement('button');

                    if (index === 0) {
                        btn.className = 'button_o popup-repair-types-nav__item glo-slider__item active';
                    } else {
                        btn.className = 'button_o popup-repair-types-nav__item glo-slider__item';
                    }
                    
                    btn.style.cssText = 'justify-content: flex-start; padding: 0px 20px;';
                    btn.textContent = type;

                    navListPopupRepair.insertAdjacentElement('beforeend', btn);
                });

            });
        }

        if (target.closest('.popup-repair-types > .close') || target.closest('.popup-repair-types-nav__title > .close') || target.classList.contains('open')) {
            popupRepairTypes.style.visibility = 'hidden';
            popupRepairTypes.classList.remove('open');
        }

    });
};

export default popupRepair;