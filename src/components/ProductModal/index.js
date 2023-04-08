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
    )
}