const invisibleWarnings = () => {
    const textWarning = document.querySelectorAll('.text-warning');
    textWarning.forEach(span => span.style.opacity = 0);
};

export default invisibleWarnings;