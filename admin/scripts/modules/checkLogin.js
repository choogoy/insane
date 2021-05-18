const checkLogin = () => {
  if (document.referrer == '' && document.location.pathname == '/admin/table.html') {
      document.location.pathname = '/admin/index.html';
  }
};

export default checkLogin;