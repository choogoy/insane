const accordion = () => {
    const accordion = document.querySelectorAll('.title_block');
    const closeAccordion = () => accordion.forEach(item => item.classList.remove('msg-active'));

    closeAccordion();

    document.addEventListener('click', event => {
        const target = event.target;

        if (target.closest('.title_block')) {
            if (!target.classList.contains('msg-active')) {
                closeAccordion();
                target.classList.add('msg-active');
            } else {
                target.classList.remove('msg-active');
            }
        }
    });
};

export default accordion;