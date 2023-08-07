import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation } from 'react-router';
function NavBar() {
  const location = useLocation();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <a href="/"><img src="./icons8-real-estate-cute-color-96.png" alt="House" height={100} /></a>
        <Navbar.Brand href="/"><h1 className='siteLogo'>Op Prop</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav activeKey={location.pathname} className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/cust">Customer</Nav.Link>
            <Nav.Link href="/prop">Property</Nav.Link>
            <Nav.Link href="/booking">Bookings</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;