import React from 'react';
import ContactForm from '../../Components/ContactForm/ContactForm';
import MapApi from '../../Components/Map/Map';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';

// Estilos personalizados con styled-components
const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 70vh;
  border: 2px solid #ccc;
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 50vh;
  }

  @media (max-width: 480px) {
    height: 40vh;
  }
`;

const Contacto = () => {
  return (
    <Container fluid style={{ height: '100vh', marginTop: '100px', marginBottom: '70px'}}>
      <Row style={{ height: '100%' }}>
        {/* Formulario de contacto */}
        <Col xs={12} md={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FormWrapper>
            <ContactForm />
          </FormWrapper>
        </Col>

        <Col xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <MapWrapper>
            <MapContainer>
              <MapApi />
            </MapContainer>
          </MapWrapper>
        </Col>
      </Row>
    </Container>
  );
};

export default Contacto;
