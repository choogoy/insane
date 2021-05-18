import getData from "./getData.js";

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

export default renderServices;