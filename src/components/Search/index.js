import { Row, Col } from 'react-bootstrap';
import './Search.css';



export default function Search(props){

    const { onSearchInputChange } = props;

    const handleInputChange = (event) => {
        onSearchInputChange(event.target.value);
    };

    return(
        <div>
            <Row className='d-flex justify-content-center align-items-center'>
                <Col sm={12} md={12}>
                    <input className="search" placeholder='Ingresa el nombre del producto a buscar' onChange={handleInputChange}></input>
                </Col>
            </Row>
        </div>
    )
}