const removeItem = id => fetch(`http://localhost:3000/api/items/${id}`, {method: 'DELETE'});

export default removeItem;