import { Row, Col, Image, Button, Modal } from 'react-bootstrap';

export default function ProductModal(props){

    const selectedProductDetails = props.selectedProductDetails;
    const showModal = props.showModal;
    const handleHideModal = props.handleHideModal;

    return (
        <div>
            <Modal show={showModal} onHide={handleHideModal} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedProductDetails ? selectedProductDetails.title : <p>Cargando...</p>}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProductDetails ? (
                    <>
                        <Row>
                            <Col md={6} sm={12}>
                                <Image src={selectedProductDetails.pictures[0].url} alt="Descripción de la imagen" style={{ width: '300px', height: '400px' }}/>
                            </Col>
                            <Col md={6} sm={12}>
                                <h3><b>Precio:</b> {selectedProductDetails.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</h3>
                                <h5><b>Cantidad:</b> {selectedProductDetails.available_quantity}</h5>
                                <h5><b>Descripción del producto</b></h5>
                                <p>{selectedProductDetails.description ? selectedProductDetails.description : 
                                <div>Esto es una simulación en la descripción del producto</div>
                                }</p>
                                <Row>
                                    <Button variant="primary" size="lg" block >Comprar</Button>
                                </Row>
                            </Col>
                        </Row>
                    </>
                    ) : (
                        <p>Cargando...</p>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    )
}