import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import "bootstrap/dist/css/bootstrap.min.css";

const NoticiasContainer = styled.div`
  padding: 20px;
  margin-top: 170px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(21rem, 1fr));
  gap: 60px;
  justify-content: center;
`;

const Card = styled.div`
  background-color: #f2f2f2;  /* Fondo más claro */
  border: none;

  .card-title {
    font-size: 1.25rem;
    font-weight: bold;
    color: #0056b3;  /* Azul más claro */
    text-align: left;
  }

  .card-text {
    font-size: 1rem;
    color: #444444;  /* Texto más oscuro */
    text-align: left;
  }

  .card-img-top {
    height: 200px;
    object-fit: cover;
  }

  .card-footer {
    background-color: transparent;
    border-top: none;
    padding-top: 0;
  }

  &:hover {
    box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.2);  /* Sombra más suave */
  }
`;

const Author = styled.div`
  font-size: 0.875rem;
  color: #666666;
  text-align: left;
`;

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await axios.get('http://localhost:5000/news');
        setNoticias(response.data);
      } catch (error) {
        console.error('Error fetching noticias', error);
      }
    };

    fetchNoticias();
  }, []);

  return (
    <NoticiasContainer>
      <CardContainer>
        {noticias.map((noticia) => (
          <Card key={noticia._id} className="card"> 
            <div className="card-body">
              <h5 className="card-title">{noticia.title}</h5>
              <p className="card-text">{noticia.content}</p>
            </div>
            {noticia.imageUrl && (
              <img src={noticia.imageUrl} alt={noticia.title} className="card-img-top" />
            )}
            <div className="card-footer">
              <Author>Por {noticia.author}</Author>
            </div>
          </Card>
        ))}
      </CardContainer>
    </NoticiasContainer>
  );
};

export default Noticias;
