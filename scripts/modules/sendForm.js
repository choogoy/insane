const sendForm = () => {

    const forms = document.querySelectorAll('form');
    const popupThank = document.querySelector('.popup-thank');

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

    document.onclick = event => {

        const target = event.target;

        if (target.closest('.close-thank')) {
            popupThank.style.visibility = 'hidden';
        }
    }
};

export default sendForm;