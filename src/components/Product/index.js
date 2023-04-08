import { Row, Col, Image, Button } from 'react-bootstrap';

export default function Product(props){
    const product = props.selectedProductDetails;

    const handleClick = (productId) => {
        props.handleShowModal(productId);
    };

    return (
        <div className='product'>
            <Row className='my-4'>
                <Col>
                    <Image src={product.thumbnail} alt="Descripción de la imagen" thumbnail style={{ width: '100px', height: '100px' }}/>
                </Col>
                <Col>
                    <p>$ {product.price}</p>
                    <p>{product.title}</p>
                </Col>
                <Col>
                    <p>{product.seller_address.country.name}</p>
                </Col>
                <Col>
                    <Button onClick={() => handleClick(product.id)}>Ver detalles</Button>
                </Col>
            </Row>
        </div>
    )
}