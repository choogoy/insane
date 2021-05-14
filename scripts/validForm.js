const validForm = () => {

  const inputs = document.querySelectorAll('input[id]');

  for (let input of inputs) {

      input.addEventListener('blur', event => {

          const target = event.target;

          if (target.classList.contains('form-name')) {
              let arr = [];
              target.value = target.value.replace(/[^а-яё -]/gi, '')
                  .replace(/-+/g, '-')
                  .replace(/ +/g, ' ')
                  .replace(/^-/g, '')
                  .replace(/^ /g, '')
                  .replace(/-$/g, '')
                  .replace(/ $/g, '');
              if (target.value) {
                  target.value = target.value[0].toUpperCase() + target.value.slice(1).toLowerCase();
                  target.value.split(' ').forEach(elem => arr.push(elem[0].toUpperCase() + elem.slice(1)));
                  target.value = arr.join(' ');
              }

          }

          if (target.classList.contains('form-email')) {
              target.value = target.value.replace(/[^a-z@_.!~*'\-]/gi, '')
                  .trim()
                  .replace(/-+/g, '-')
                  .replace(/^-/g, '')
                  .replace(/-$/g, '')
                  .replace(/ +/g, '')
                  .replace(' ', '');
          }

          if (target.classList.contains('form-phone')) {
              target.value = target.value.replace(/[^0-9\+]/gi, '')
                  .replace(/-+/g, '-')
                  .replace(/^-/g, '')
                  .replace(/-$/g, '');
          }

          if (target.closest('#form2-message')) {
              target.value = target.value.replace(/[^а-яё0-9,!?. -]/gi, '')
                  .replace(/-+/g, '-')
                  .replace(/ +/g, ' ')
                  .replace(/^-/g, '')
                  .replace(/^ /g, '')
                  .replace(/-$/g, '')
                  .replace(/ $/g, '');
          }

      });

  }

};

export default validForm;