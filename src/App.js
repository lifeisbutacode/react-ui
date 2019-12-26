import React from 'react';
import Header from './components/Header';
import Product from './components/Product';
import Done from './components/List';
import ProductStore from './store/ProductStore';

function App() {
  return (
    <div className="App">
      <ProductStore>
        <Header/>
        <div className="container">
          <Product/>
          <Done/>
        </div>
      </ProductStore>
    </div>
  );
}

export default App;
