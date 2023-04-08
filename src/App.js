import './App.css';
import React, { useState, useEffect } from 'react';
import { searchProducts, getProductDetails } from './services';
import NavBar from './components/NavBar/';
import Product from './components/Product/';
import ProductModal from './components/ProductModal/';

function App() {

  const [dataProducts, setDataProducts] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await searchProducts();
      setDataProducts(result);
    }
    fetchData();
  }, []);

  const handleShowModal = async (productId) => {
    try {
      const productDetails = await getProductDetails(productId);
      setSelectedProductDetails(productDetails);
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleHideModal = () => {
    setShowModal(false);
  }  

  return (
    <div className="App">

      <NavBar></NavBar>

      <div className="containerProducts">
        <div style={{ backgroundColor: 'white', padding: '20px' }}>
          <ul>
            { 
              (dataProducts) 
              ? dataProducts.map(item => 
                <li key={item.id}>
                    <Product key={item.id} selectedProductDetails={item} handleShowModal={handleShowModal}></Product>                    
                    <hr></hr>
                </li>
                ) 
              : <p>Sin datos de productos</p>
            }
          </ul>
        </div>
      </div>

      <ProductModal 
        showModal={showModal} 
        selectedProductDetails={selectedProductDetails}
        handleShowModal={handleShowModal}
        handleHideModal={handleHideModal}
        >
      </ProductModal>

    </div>
  );
}

export default App;
