import React, {useState, useContext} from 'react'; 
import axios from 'axios';
import {ProductContext} from '../store/ProductStore';

export default function Product() {

  const [product, setProduct] = useState({});
  const [success, setSuccess] = useContext(ProductContext);
  const modal = document.getElementById("myModal");

  const showModal = () => {
    modal.style.display = "block";
  };

  const hideModal = () => {
    modal.style.display = "none";
  };

  const addTodo = () => {
    console.log (product);
    axios
    .post('api/product/create', product)
    .then(res => {
      console.log(res.data)
    });
  };

  const handleKeyUp = (e) => {
    setProduct({
      ...product,
      [e.target.name] : e.target.value
    });
  }

  const handleChange = (e) => {
    if(e.key === "Enter") {
      addTodo();
      setSuccess(true);
      showModal();
      setTimeout(hideModal, 1000);
    }
  }

  return (
    <div className="product">
      <h3>ADD A PRODUCT</h3>
      <div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" onKeyUp={handleKeyUp} onKeyPress={handleChange}/>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input type="text" name="description" onKeyUp={handleKeyUp} onKeyPress={handleChange}/>
        </div>

        <div className="form-group">          
          <label htmlFor="price">Price</label>
          <input type="text" name="price" onKeyUp={handleKeyUp} onKeyPress={handleChange}/>
        </div>

      </div>
      <button className="button" onClick={addTodo}>Add</button>

      <div id="myModal" className="modal">
        <div className="modal-content">
          <p>Successfully added {product.name}</p>
        </div>
      </div>

    </div>
  )
}
