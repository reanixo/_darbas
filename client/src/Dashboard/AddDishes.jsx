import react, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AddDishes() {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get("http://localhost:3001/dish", {
        name: name,
        description: description,
        price: price,
      })
      .then((result) => {
    
      })
      .catch((err) => console.log(err));
  };

  return (
    <form id="form-container" onSubmit={handleSubmit}>
      <legend id="form-header">Add dish</legend>

      <input
        id="name-field"
        type="text"
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        id="description-field"
        type="text"
        placeholder="description"
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <input
        id="price-field"
        type="text"
        placeholder="price"
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <button>Add</button>
    </form>
  );
}

export default AddDishes;
