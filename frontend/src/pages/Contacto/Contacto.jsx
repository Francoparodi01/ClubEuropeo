import React from 'react';
import ContactForm from '../../Components/ContactForm/ContactForm';
import MapApi from '../../Components/Map/Map';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';

// Estilos personalizados con styled-components
const FormWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 70vh; 
  padding: 20px;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid #ccc; /* Puedes ajustar este borde según el estilo que desees */
  border-radius: 10px;
  overflow: hidden; /* Para que el mapa no se salga de los bordes */
`;

const Contacto = () => {
  return (
    <Container fluid style={{ height: '100vh' }}>
      <Row style={{ height: '100%' }}>
        <Col xs={12} md={4} style={{ display: 'flex', alignItems: 'center' }}>
          <FormWrapper>
            <ContactForm />
          </FormWrapper>
        </Col>
        
        <Col xs={12} md={8} style={{ padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
