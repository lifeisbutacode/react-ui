import React, {useState, useEffect, useContext} from 'react'
import {ProductContext} from '../store/ProductStore';

import axios from 'axios';

export default function Done() {

  const [todo, setTodo] = useState([]);
  const [success, setSuccess] = useContext(ProductContext);
  
  let todos = "";

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
      <h5 key={i.id}>{i.name.toUpperCase()}</h5>
    )
  } else {
    todos = <h5 style={{"textAlign":"center"}}>NO DATA FOUND</h5>;
  }
 

  return (
    <div className="list">
      <h3>LIST</h3>
      {todos}
    </div>
  )
}