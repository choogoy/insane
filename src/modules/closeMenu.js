const closeMenu = () => {

    const windowWidth = window.innerWidth;
    const popupMenu = document.querySelector('.popup-dialog-menu');

    if (windowWidth < 576) {
        popupMenu.style.transform = 'translate3d(0, -100vh, 0)';
    } else {
        popupMenu.style.transform = 'translate3d(645px, 0, 0)';
    }

};

export default closeMenu;