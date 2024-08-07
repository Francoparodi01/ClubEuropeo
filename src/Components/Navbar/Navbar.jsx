import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import euroflag from '../../assets/european-flag.png';

import './Navbar.css';

const NavbarComponent = () => {
  return (
    <Navbar bg="light" variant="light" expand="lg" className="fixed-top">
      <Container id='navbar-container'>
        <img className='euro-icon' src={euroflag} alt='Icono de UE'/>
        <Navbar.Brand href="#home" className='navbar-title'>Club Europeo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" id='nav-item'>Inicio</Nav.Link>
            <Nav.Link href="#link" id='nav-item'>Nosotros</Nav.Link>
            <Nav.Link href="#link" id='nav-item'>Noticias</Nav.Link>
            <Nav.Link href="#link" id='nav-item'>Contacto</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
