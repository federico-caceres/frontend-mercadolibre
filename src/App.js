import './App.css';
import React, { useState, useEffect } from 'react';
import { searchProducts, getProductDetails } from './services';
import { Row, Col, Image, Button, Modal } from 'react-bootstrap';
import NavBar from './components/NavBar/';
import Product from './components/Product/';

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
          <h2>Lista de productos</h2>
          <ul>
            { 
              (dataProducts) 
              ? dataProducts.map(item => 
                <li key={item.id}>
                  <div>
                    <Product key={item.id} selectedProductDetails={item} handleShowModal={handleShowModal}></Product>                    
                  </div>
                </li>
                ) 
              : <p>Sin datos de productos</p>
            }
          </ul>
        </div>
      </div>

      <Modal show={showModal} onHide={handleHideModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProductDetails ? selectedProductDetails.title : <p>Cargando...</p>}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {selectedProductDetails ? (
          <>
            <Row>
              <Col>
                <Image src={selectedProductDetails.pictures[0].url} alt="Descripción de la imagen" thumbnail style={{ width: '300px', height: '400px' }}/>
              </Col>
              <Col>
                <p><b>Precio:</b> $ {selectedProductDetails.price}</p>
                <h5>Descripción del producto</h5>
                <p>{selectedProductDetails.description ? selectedProductDetails.description : 
                  <div>Esto es una simulación en la descripción del producto</div>
                }</p>
              </Col>
            </Row>
          </>
        ) : (
          <p>Cargando...</p>
        )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHideModal}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default App;
