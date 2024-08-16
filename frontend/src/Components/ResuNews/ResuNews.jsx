import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

// Estilos personalizados utilizando styled-components
const StyledCard = styled(Card)`
  width: 18rem;
  margin: 20px;
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
  justify-content: space-evenly;
  margin-top: 50px;
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
          const previewContent = content ? content.split(' ').slice(0, 25).join(' ') + '...' : '';

          return (
            <StyledCard key={item._id}>
              <Card.Body>
                <StyledCardTitle>{title}</StyledCardTitle>
                <StyledCardText
                  dangerouslySetInnerHTML={{ __html: previewContent }}
                />
              </Card.Body>
            </StyledCard>
          );
        })}
      </NewsContainer>
    </div>
  );
};

export default ResuNews;
