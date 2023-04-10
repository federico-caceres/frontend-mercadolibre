import './App.css';
import React, { useState, useEffect } from 'react';
import { searchProducts, getProductDetails } from './services';
import NavBar from './components/NavBar/';
import Product from './components/Product/';
import ProductModal from './components/ProductModal/';
import Search from './components/Search/';

function App() {

  const [dataProducts, setDataProducts] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm) {
      searchProduct(searchTerm);
    } else {
      searchProduct('iphone');
    }

  }, [searchTerm]);

  const handleSearchInputChange = (value) => {
    setSearchTerm(value);
  };

  const searchProduct = async (text) => {
    const result = await searchProducts(text);
    setDataProducts(result);
  }

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
        
        <Search onSearchInputChange={handleSearchInputChange}></Search>
        
        <div className='productList' style={{ backgroundColor: 'white', padding: '20px'}}>
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
