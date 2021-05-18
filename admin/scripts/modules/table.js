import renderOptions from "./renderOptions.js";
import renderServices from "./renderServices.js";
import openModal from "./openModal.js";
import changeItem from "./changeItem.js";
import addItem from "./addItem.js";
import removeItem from "./removeItem.js";

const table = () => {

  if (document.location.pathname == '/admin/table.html') {

      const main = document.querySelector('.main');
      const select = document.getElementById('typeItem');
      const modal = document.getElementById('modal');
      const form = document.getElementById('form');

      renderOptions();
      renderServices('Все услуги');

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

export default table;