import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importa Link para el enrutamiento
import euroflag from '../../assets/logo-club-europeo.png';
import './Navbar.css';

const NavbarComponent = () => {
  return (
    <Navbar bg="light" variant="light" expand="lg" className="fixed-top">
      <Container id='navbar-container'>
        <img className='euro-icon' src={euroflag} alt='Icono de UE'/>
        <Navbar.Brand as={Link} to="/" className='navbar-title'>Club Europeo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" id='nav-item'>Inicio</Nav.Link>
            <Nav.Link as={Link} to="/about" id='nav-item'>Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/news" id='nav-item'>Noticias</Nav.Link>
            <Nav.Link as={Link} to="/contact" id='nav-item'>Contacto</Nav.Link>
            <Nav.Link as={Link} to="/contact" id='nav-item'>Asociate</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
