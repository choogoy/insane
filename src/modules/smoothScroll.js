const smoothScroll = id => {
    document.getElementById(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
};

export default smoothScroll;