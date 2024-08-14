import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

// Estilos personalizados utilizando styled-components
const StyledCard = styled(Card)`
  width: 18rem;
  margin: 20px; /* Ajuste de margen para agregar espacio entre tarjetas */
`;

const StyledCardTitle = styled(Card.Title)`
  font-size: 1.25rem;
  font-weight: bold;
`;

const StyledCardText = styled(Card.Text)`
  font-size: 1rem;
  color: #333;
`;

const NewsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly; /* Espacio uniforme entre las tarjetas */
  margin-top: 20px;
`;

const ResuNews = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/news')
      .then((response) => {
        setNews(response.data);
      })
      .catch((err) => {
        setError('Error al cargar las noticias');
        console.error(err);
      });
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <NewsContainer>
        {news.slice(0, 10).map((item) => {
          const { title, content } = item;
          // Limitar el contenido a 25 palabras con espacios entre ellas
          const previewContent = content ? content.split(' ').slice(0, 25).join(' ') : '';

          return (
            <StyledCard key={item._id}>
              <Card.Body>
                <StyledCardTitle>{title}</StyledCardTitle>
                <StyledCardText>
                  {previewContent}...
                </StyledCardText>
              </Card.Body>
            </StyledCard>
          );
        })}
      </NewsContainer>
    </div>
  );
};

export default ResuNews;
