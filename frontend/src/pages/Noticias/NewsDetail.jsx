import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const NewsDetailContainer = styled.div`
  padding: 40px;
  background-color: #f8f9fa;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 768px) {
    margin-top: 120px;
  }
  @media (max-width: 480px) {
    margin-top: 120px;
  }
`;

const NewsTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #003399;
  text-align: center;
`;

const NewsContent = styled.div`
  font-size: 1.25rem;
  line-height: 1.8;
  color: #333;
  max-width: 800px;
  text-align: justify;
`;

const Author = styled.p`
  font-size: 1rem;
  color: #666;
  margin-top: 20px;
  text-align: center;
  width: 100%;
`;

const NewsImage = styled.img`
  width: 100%;
  max-width: 800px;
  height: auto;
  margin-bottom: 20px;
  border-radius: 8px;
`;

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/news/${id}`);
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [id]);

  if (!news) {
    return <p>Cargando...</p>;
  }

  return (
    <NewsDetailContainer>
      <NewsTitle>{news.title}</NewsTitle>
      <Author>Por {news.author}</Author>
      {news.imageUrl && <NewsImage src={news.imageUrl} alt={news.title} />}
      <NewsContent dangerouslySetInnerHTML={{ __html: news.content }} />
    </NewsDetailContainer>
  );
};

export default NewsDetail;
