import React from 'react';
import ContactForm from '../../Components/ContactForm/ContactForm';
import MapApi from '../../Components/Map/Map';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';

const StyledContainer = styled(Container)`
  height: 100vh;
  @media (max-width: 480px) {
    margin-bottom: 300px;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
  @media (max-width: 1024px) {
    margin-top: 10px;
  }
  @media (max-width: 1440px) {
  margin-top: 150px;
}
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
  @media (max-width: 480px) {
    margin-bottom: 300px;
  }

`;

const MapContainer = styled.div`
  width: 100%;
  height: 55vh;
  border: 2px solid #ccc;
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 50vh;
    margin-top: '100px';
  }

  @media (max-width: 480px) {
    height: 40vh;
  }
`;


const Contacto = () => {
  return (
    <StyledContainer fluid>
      <Row style={{ height: '100%' }}>
        <Col xs={12} md={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FormWrapper>
            <ContactForm />
          </FormWrapper>
        </Col>

        <Col xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '200px'}}>
          <MapWrapper>
            <MapContainer>
              <MapApi />
            </MapContainer>
          </MapWrapper>
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default Contacto;
