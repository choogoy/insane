const addItem = body => {
  fetch('http://localhost:3000/api/items/', {
      method: 'POST',
      body: JSON.stringify(body)
  });
};

export default addItem;