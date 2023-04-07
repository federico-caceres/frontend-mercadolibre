import './App.css';
import React, { useState, useEffect } from 'react';
import { searchProducts, getProductDetails } from './services';
import logo from '../src/assets/img/logo.png';
import { Row, Col, Container, Navbar, Card, Image, Button, Modal } from 'react-bootstrap';

function App() {

  const [dataProducts, setDataProducts] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
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
      setSelectedProductId(productId);
      setSelectedProductDetails(productDetails);
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleHideModal = () => {
    setSelectedProductId(null);
    setShowModal(false);
  }  

  return (
    <div className="App">

      <Navbar className="navbar">
        <Container>
          <Navbar.Brand href='#home'>
            <img
                src={logo}
                width="300"
                height="40"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
          </Navbar.Brand>
        </Container>
      </Navbar>

      <div className="containerProducts">
        <div style={{ backgroundColor: 'white', padding: '20px' }}>
          <h2>Lista de productos</h2>
          <ul>
            { 
              (dataProducts) 
              ? dataProducts.map(item => 
                <li key={item.id}>
                  <div>
                    <Row className='my-4'>
                      <Col>
                        <Image src={item.thumbnail} alt="Descripción de la imagen" thumbnail style={{ width: '100px', height: '100px' }}/>
                      </Col>
                      <Col>
                        <p>$ {item.price}</p>
                        <p>{item.title}</p>
                      </Col>
                      <Col>
                        <p>{item.seller_address.country.name}</p>
                      </Col>
                      <Col>
                        <Button onClick={() => handleShowModal(item.id)}>Ver detalles</Button>
                      </Col>
                    </Row>
                    
                  </div>
                </li>
                ) 
              : <p>Sin datos</p>
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
