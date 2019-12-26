import React, {useState, useEffect, useContext} from 'react'
import {ProductContext} from '../store/ProductStore';

import axios from 'axios';

export default function Done() {
  let products = "";

  const modal = document.getElementById("myModalList");
  const modal1 = document.getElementById("myModalDelete");
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: ""
  });
  const [body, setBody] = useState({});
  const [payload, setPayload] = useState({});
  const [productId, setProductId] = useState(0);
  const [success, setSuccess] = useContext(ProductContext);
  
  const showModal = (trigger) => {
    trigger === "btnUpdate" ? modal.style.display = "block" : modal1.style.display = "block";
  };

  const hideModal = () => {
    modal.style.display = "none";
    modal1.style.display = "none";
  };

  const handleKeyUp = (e) => {
    setPayload({
      ...payload,
      [e.target.name] : e.target.value
    });
  }

  const handleChange = (e) => {
    if(e.key === "Enter") {
      console.log(payload)
      updateProduct()
    }
  }

  const updateProduct = () => {
    console.log(productId)
    axios
    .put(`api/product/${productId}`, payload)
    .then(res => {
      if(res.data.status === "SUCCESS") {
        setSuccess(true);  
        setTimeout(hideModal, 1000);
      }
    });
  };

  const deleteProduct = (e) => {
  axios
  .delete(`api/product/${productId}`, payload)
  .then(res => {
    if(res.data.status === "SUCCESS") {
      setSuccess(true);  
      hideModal();
    }
  });
  };

  const handleModal = (e) => {
    let buttonId = e.target.id;
    let id = e.target.getAttribute('data-id');
    setProductId(id)
    axios
    .get(`api/product/${id}`)
    .then(res => {
      if(res.data.status === "SUCCESS") {
        let item = res.data.body;
        setProduct({
          name : item.name,
          description : item.description,
          price : item.price,
        })
        setPayload({
          name : item.name,
          description : item.description,
          price : item.price,
        })
      }
    })
    
    showModal(buttonId);
  }
  
  useEffect(() => {
    axios
    .get('api/product')
    .then(res => {
      setSuccess(false);
      if(res.data.status === "SUCCESS"){
        setBody(res.data.body);   
        setPayload({});     
        setProduct({});     
      }else{
        setBody({})
      }
    })
    .catch(err => {
      throw err;
    });
  }, [success, setSuccess]);

  
  if(body.length >= 1) {
    products = body.map((i) => 
      <tr key={i.id}> 
        <td >{i.name.toUpperCase()}</td>
        <td >{i.description.toUpperCase()}</td>
        <td >{i.price}</td>
        <td>
          <button className="btnUpdate" id="btnUpdate" data-id={i.id} onClick={handleModal}>Update</button>
          <button className="btnDelete" id="btnDelete" data-id={i.id} onClick={handleModal}>Delete</button>
        </td>
      </tr>
    )
  } else {
    products = <tr><td colSpan={4} style={{"textAlign":"center"}}>NO DATA FOUND</td></tr>
  }
 

  return (
    <div className="list">
      <h3>LIST</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products}
        </tbody>
      </table>

      <div id="myModalList" className="modal">
        <div className="modal-content">
            <p>Update {product.name}</p>
            <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" defaultValue={product.name} onKeyUp={handleKeyUp} onKeyPress={handleChange}/>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input type="text" name="description" defaultValue={product.description} onKeyUp={handleKeyUp} onKeyPress={handleChange}/>
            </div>

            <div className="form-group">          
              <label htmlFor="price">Price</label>
              <input type="text" name="price" defaultValue={product.price} onKeyUp={handleKeyUp} onKeyPress={handleChange}/>
            </div>
          <button className="buttonModal" onClick={updateProduct}>SUBMIT</button>
          <button className="buttonModal" onClick={hideModal}>EXIT</button>
        </div>
      </div>

      <div id="myModalDelete" className="modal">
        <div className="modal-content">
          <p>Delete {product.name}?</p>
          <button className="buttonModal" onClick={deleteProduct}>DELETE</button>
          <button className="buttonModal" onClick={hideModal}>EXIT</button>
        </div>
      </div>

    </div>
  )
}