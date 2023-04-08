import { Container, Navbar, Image } from 'react-bootstrap';
import logo from '../../assets/img/logo.png';

export default function NavBar(){
    return (
        <Navbar className="navbar">
        <Container>
          <Navbar.Brand href='#home'>
            <Image
                src={logo}
                width="60"
                height="60"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
          </Navbar.Brand>
        </Container>
      </Navbar>   
    )
}