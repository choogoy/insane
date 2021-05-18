import getCookie from "./getCookie.js";
import setCookie from "./setCookie.js";
import invisibleWarnings from "./invisibleWarnings.js";
import clearInputs from "./clearInputs.js";

const checkInputs = form => {
      
  const cookieLogin = getCookie('relax-login');
  const cookiePassword = getCookie('relax-password');
  const login = document.getElementById('login');
  const password = document.getElementById('password');
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
              clearInputs(login, password);
          }

      }

      if (!flag) {
          clearInputs(login, password);
          document.location.pathname = '/admin/table.html';
      }

  } else {
      for (let key in body) {
          setCookie(key, body[key]);
      }
  }

};
export default checkInputs;