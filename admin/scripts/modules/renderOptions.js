import getData from "./getData.js";

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

export default renderOptions;