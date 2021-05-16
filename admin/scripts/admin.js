'use strict';

const admin = () => {

    if (document.location.pathname == '/admin/index.html') {

        const form = document.querySelector('form');
        const login = document.getElementById('login');
        const password = document.getElementById('password');
        const btn = form.querySelector('.button');
        const inputs = form.querySelectorAll('input');

        const invisibleWarnings = () => {
            const textWarning = document.querySelectorAll('.text-warning');
            textWarning.forEach(span => span.style.opacity = 0);
        };

        invisibleWarnings();

        btn.setAttribute("disabled", "disabled");
        login.setAttribute("required", "required");
        password.setAttribute("required", "required");

        // записываем куку
        const setCookie = (name, value, options = {}) => {

            options = {
                path: '/',
                // при необходимости добавьте другие значения по умолчанию
                ...options
            };

            if (options.expires instanceof Date) {
                options.expires = options.expires.toUTCString();
            }

            let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

            for (let optionKey in options) {
                updatedCookie += "; " + optionKey;
                let optionValue = options[optionKey];
                if (optionValue !== true) {
                    updatedCookie += "=" + optionValue;
                }
            }

            document.cookie = updatedCookie;
        };

        // считываем куку
        const getCookie = name => {
            let matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        };

        const checkLogin = () => {
        if (document.referrer == '' && document.location.pathname == '/admin/table.html') {
            document.location.pathname = '/admin/index.html';
        }
        };

        checkLogin();

        const clearInputs = () => {
            login.value = '';
            password.value = '';
        };

        const checkInputs = form => {
        
            const cookieLogin = getCookie('relax-login');
            const cookiePassword = getCookie('relax-password');
            const formData = new FormData(form);

            let flag = false;
            let body = {};

            formData.forEach((value, key) => body[key] = value);

            invisibleWarnings();

            if (cookieLogin && cookiePassword) {

                for (let key in body) {

                    if (body[key] !== getCookie(key)) {
                        let warning = document.querySelector(`[name=${key}]`).nextElementSibling;
                        warning.style.opacity = 1;
                        flag = true;
                        clearInputs();
                    }

                }

                if (!flag) {
                    clearInputs();
                    document.location.pathname = '/admin/table.html';
                }

            } else {
                for (let key in body) {
                    setCookie(key, body[key]);
                }
            }

        };

        [...inputs].every(input => {
            input.addEventListener('input', event => {
                if (event.target.value.trim() !== '') {
                    btn.removeAttribute("disabled");
                } else {
                    btn.setAttribute("disabled", "disabled");
                }
            });
        });

        form.addEventListener('submit', event => {
            event.preventDefault();
            checkInputs(form);
        });

    }
};

admin();

const getData = async url => {
    const response = await fetch(url);
    return await response.json();
};

const renderOptions = () => {
    const select = document.getElementById('typeItem');
    select.textContent = '';

    getData('http://localhost:3000/api/items')
        .then(data => {
            const servises = new Set();
            data.forEach(item => servises.add(item.type));

            select.insertAdjacentHTML('afterbegin', `<option value="Все услуги">Все услуги</option>`);

            servises.forEach(service => {
                select.insertAdjacentHTML('beforeend', `
                    <option value="${service}">${service}</option>
                `);

            });
        });

};

const renderServices = serviceType => {
    const tbody = document.getElementById('tbody');
    tbody.textContent = '';

    getData('http://localhost:3000/api/items')
        .then(data => {

            if (serviceType === 'Все услуги') {

                data.forEach( ({ id, type, name, units, cost }) => {
                    tbody.insertAdjacentHTML('beforeend', `
                        <tr class="table__row">
                            <td class="table__id table__cell">${id}</td>
                            <td class="table-type table__cell">${type}</td>
                            <td class="table-name table__cell">${name}</td>
                            <td class="table-units table__cell">${units === 'м2' ? `м<sup>2</sup>` : units}</td>
                            <td class="table-cost table__cell">${cost} руб</td>
                            <td>
                                <div class="table__actions table__cell">
                                    <button type="button" class="button action-change" data-id=${id}>
                                        <span class="svg_ui">
                                            <svg class="action-icon_change">
                                                <use xlink:href="./img/sprite.svg#change"></use>
                                            </svg>
                                        </span>
                                        <span>Изменить</span>
                                    </button>
                                    <button type="button" class="button action-remove" data-id=${id}>
                                        <span class="svg_ui">
                                            <svg class="action-icon_remove">
                                                <use xlink:href="./img/sprite.svg#remove"></use>
                                            </svg>
                                        </span>
                                        <span>Удалить</span>
                                    </button>
                                </div>
                            </td>
                        </tr>`);
                });

            } else { 

                data.filter(item => item.type === serviceType).forEach(({ id, type, name, units, cost }) => {
                    tbody.insertAdjacentHTML('beforeend', `
                        <tr class="table__row">
                            <td class="table__id table__cell">${id}</td>
                            <td class="table-type table__cell">${type}</td>
                            <td class="table-name table__cell">${name}</td>
                            <td class="table-units table__cell">${units === 'м2' ? `м<sup>2</sup>` : units}</td>
                            <td class="table-cost table__cell">${cost} руб</td>
                            <td>
                                <div class="table__actions table__cell">
                                    <button type="button" class="button action-change" data-id=${id}>
                                        <span class="svg_ui">
                                            <svg class="action-icon_change">
                                                <use xlink:href="./img/sprite.svg#change"></use>
                                            </svg>
                                        </span>
                                        <span>Изменить</span>
                                    </button>
                                    <button type="button" class="button action-remove" data-id=${id}>
                                        <span class="svg_ui">
                                            <svg class="action-icon_remove">
                                                <use xlink:href="./img/sprite.svg#remove"></use>
                                            </svg>
                                        </span>
                                        <span>Удалить</span>
                                    </button>
                                </div>
                            </td>
                        </tr>`);
                });

            }
        });

};

const addItem = body => {
    fetch('http://localhost:3000/api/items/', {
        method: 'POST',
        body: JSON.stringify(body)
    });
};

const changeItem = (id, body) => {
    fetch(`http://localhost:3000/api/items/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body)
    });
};

const removeItem = id => fetch(`http://localhost:3000/api/items/${id}`, {method: 'DELETE'});

const table = () => {

    if (document.location.pathname == '/admin/table.html') {

        const main = document.querySelector('.main');
        const select = document.getElementById('typeItem');
        const modal = document.getElementById('modal');
        const form = document.getElementById('form');

        renderOptions();
        renderServices('Все услуги');

        const openModal = (method, title = 'Добавление новой услуги', id = null) => {

            const modalHeader = document.querySelector('.modal__header');
            const typeVal = document.getElementById('type');
            const nameVal = document.getElementById('name');
            const unitsVal = document.getElementById('units');
            const costVal = document.getElementById('cost');
            const btn = document.querySelector('.button-ui_firm');

            modal.style.display = 'flex';
            modalHeader.textContent = title;

            btn.setAttribute('data-method', method);

            if (id) {

                btn.setAttribute('data-id', id);

                getData(`http://localhost:3000/api/items/${id}`)
                    .then(({ type, name, units, cost }) => {
                        typeVal.value = type;
                        nameVal.value = name;
                        unitsVal.value = units;
                        costVal.value = cost;
                    });
            } else {
                typeVal.value = '';
                nameVal.value = '';
                unitsVal.value = '';
                costVal.value = '';
            }

        };

        const closeModal = () => modal.style.display = 'none';

        main.addEventListener('click', event => {

            event.preventDefault();

            const target = event.target;
            const removeItemBtn = target.closest('.action-remove');
            const changeItemBtn = target.closest('.action-change');

            if (target.closest('.btn-addItem')) {
                openModal('add');
            }

            if (removeItemBtn) {
                event.preventDefault();
                const id = removeItemBtn.dataset.id;
                removeItem(id);
            }

            if (changeItemBtn) {
                openModal('change', 'Редактировать услугу', changeItemBtn.dataset.id);
            }

        });

        select.addEventListener('change', event => {
            const target = event.target;
            const selectedType = target[target.selectedIndex].label;
            renderServices(selectedType);
        });

        modal.onclick = event => {
            const target = event.target;

            if (target.classList.contains('modal__overlay') || target.closest('.button__close') || target.closest('.cancel-button')) {
                closeModal();
            }
        };

        form.addEventListener('submit', event => {

            event.preventDefault();

            const btn = document.querySelector('.button-ui_firm');
            const method = btn.dataset.method;

            console.log(method);

            const formData = new FormData(form);
            let flag = false;
            let body = {};
    
            formData.forEach((value, key) => body[key] = value);

            for (let key in body) {
                if (!body[key]) {
                    flag = true;
                }
            }
       
            if (flag === false && method === 'add') {
                addItem(body);
            }

            if (flag === false && method === 'change') {
                const id = btn.dataset.id;
                changeItem(id, body);
            }
        });

    }

};

table();