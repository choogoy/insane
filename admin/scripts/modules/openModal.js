import getData from "./getData.js";

const openModal = (method, title = 'Добавление новой услуги', id = null) => {

  const modal = document.getElementById('modal');
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

export default openModal;