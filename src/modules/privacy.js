const privacy = () => {

    const popupPrivacy = document.querySelector('.popup-privacy');
    
    document.addEventListener('click', event => {
        const target = event.target;

        if (target.closest('.link-privacy')) {
            popupPrivacy.style.visibility = 'visible';
            popupPrivacy.classList.add('open');
        }
    
        if (target.closest('.popup-dialog-privacy > .close') || target.closest('.popup-privacy > .close') || target.classList.contains('open')) {
            popupPrivacy.style.visibility = 'hidden';
            popupPrivacy.classList.remove('open');
        }

    });

};

export default privacy;