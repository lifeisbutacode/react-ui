import React, {useState, useEffect, useContext} from 'react'
import {ProductContext} from '../store/ProductStore';

import axios from 'axios';

export default function Done() {
  let content = "";
  let todos = "";
  const modal = document.getElementById("myModalList");
  const [todo, setTodo] = useState([]);
  const [modals, setModals] = useState('');
  const [success, setSuccess] = useContext(ProductContext);
  
  const showModal = () => {
    modal.style.display = "block";
  };

  const hideModal = () => {
    modal.style.display = "none";
  };

  const handleModal = (e) => {
    let id = e.target.id;
    if(id === "btnUpdate") {
      setModals(<p>Update</p>) 
    }else {
      setModals(<p>Delete</p>) 
    }
    showModal();
    return content;
    
  }
  


  useEffect(() => {
    axios
    .get('api/product')
    .then(res => {
      setSuccess(false);
      if(res.data.status === "SUCCESS"){
        setTodo(res.data.body);        
      }
    })
    .catch(err => {
      throw err;
    });
  }, [success, setSuccess]);

  
  if(todo.length >= 1) {
    todos = todo.map((i) => 
      <tr key={i.id}> 
        <td >{i.name.toUpperCase()}</td>
        <td >{i.description.toUpperCase()}</td>
        <td >{i.price}</td>
        <td>
          <button className="btnUpdate" id="btnUpdate" onClick={handleModal}>Update</button>
          <button className="btnDelete" id="btnDelete" onClick={handleModal}>Delete</button>
        </td>
      </tr>
    )
  } else {
    todos = <tr><td colSpan={4} style={{"textAlign":"center"}}>NO DATA FOUND</td></tr>
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
          {todos}
        </tbody>
      </table>

      <div id="myModalList" className="modal">
        <div className="modal-content">
          {modals}
        </div>
      </div>

    </div>
  )
}