import { Row, Col, Image, Button } from 'react-bootstrap';

export default function Product(props){
    const product = props.selectedProductDetails;

    const handleClick = (productId) => {
        props.handleShowModal(productId);
    };

    return (
        <div className='product'>
            <Row className='my-4'>
                <Col md={3} sm={6}>
                    <Image src={product.thumbnail} alt="Descripción de la imagen" style={{ width: '120px', height: '120px' }}/>
                </Col>
                <Col md={5} sm={6}>
                    <p>{product.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
                    <p>{product.title}</p>
                </Col>
                <Col md={2} sm={6}>
                    <p className='grayText'>{product.seller_address.country.name}</p>
                </Col>
                <Col md={2} sm={6}>
                    <Button onClick={() => handleClick(product.id)}>Ver detalles</Button>
                </Col>
            </Row>
        </div>
    )
}