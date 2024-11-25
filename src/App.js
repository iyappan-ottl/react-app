import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '' });

  // Fetch items from backend
  useEffect(() => {
    axios.get('http://localhost:3001/api/items')
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios.post('http://localhost:3001/api/items', form)
      .then(res => setItems([...items, res.data]))
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/api/items/${id}`)
      .then(() => setItems(items.filter(item => item._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>CRUD App</h1>
      <form>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="description" placeholder="Description" onChange={handleChange} />
        <input name="price" type="number" placeholder="Price" onChange={handleChange} />
        <button type="button" onClick={handleSubmit}>Add Item</button>
      </form>

      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.name} - {item.description} - ${item.price}
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;