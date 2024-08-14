import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la redirección

// Estilos personalizados utilizando styled-components
const StyledCard = styled(Card)`
  width: 18rem;
  margin: 30px;
`;

const StyledCardTitle = styled(Card.Title)`
  font-size: 1.25rem;
  font-weight: bold;
`;

const StyledCardText = styled(Card.Text)`
  font-size: 1rem;
  color: #333;
`;

const ResuNews = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Usa useNavigate para redirigir

  // Petición al backend para obtener las noticias
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

  const handleViewMore = () => {
    navigate('/news'); // Redirige a la ruta /news
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {news.slice(0, 10).map((item) => {
          const { title, content } = item;
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
      </div>
    </div>
  );
};

export default ResuNews;
