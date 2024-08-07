// src/HeroSection.js
import React from 'react';
import styled from 'styled-components';

const HeroSection = () => {
  return (
    <HeroContainer>
      <Overlay />
      <Content>
        <Title>Club Europeo</Title>
        <Subtitle>Patrimonio cultural de Buenos Aires</Subtitle>
        <ButtonContainer>
          <Button href="#contact">Contacto</Button>
          <Button href="#Noticias">Noticias</Button>
        </ButtonContainer>
      </Content>
    </HeroContainer>
  );
};

export default HeroSection;

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: url('/image.png') center center/cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  position: relative;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  font-family: 'Montserrat Alternates', sans-serif;
  font-weight: 600;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 40px;
  font-family: 'montserrat alternates', semi-bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Button = styled.a`
  background: #00339b;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1rem;
  transition: background 0.3s;

  &:hover {
    background: #002672;
  }
`;
