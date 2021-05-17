const changeItem = (id, body) => {
  fetch(`http://localhost:3000/api/items/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body)
  });
};

export default changeItem;