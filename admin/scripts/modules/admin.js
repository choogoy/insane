import invisibleWarnings from "./invisibleWarnings.js";
import checkInputs from "./checkInputs.js";

const admin = () => {

  if (document.location.pathname == '/admin/index.html') {

      const form = document.querySelector('form');
      const login = document.getElementById('login');
      const password = document.getElementById('password');
      const btn = form.querySelector('.button');
      const inputs = form.querySelectorAll('input');

      invisibleWarnings();

      btn.setAttribute("disabled", "disabled");
      login.setAttribute("required", "required");
      password.setAttribute("required", "required");

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

export default admin;