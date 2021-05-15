const consultation = () => {

    const popupConsultation = document.querySelector('.popup-consultation');

    document.addEventListener('click', event => {

        const target = event.target;

        if (target.closest('.button_wide')) {
            popupConsultation.style.visibility = 'visible';
            popupConsultation.classList.add('open');
        }
    
        if (target.closest('.close-consultation') || target.classList.contains('open')) {
            popupConsultation.style.visibility = 'hidden';
            popupConsultation.classList.remove('open');
        }

    });
};

export default consultation;