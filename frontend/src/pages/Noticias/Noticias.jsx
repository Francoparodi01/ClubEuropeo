import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import "bootstrap/dist/css/bootstrap.min.css";

const NoticiasContainer = styled.div`
  padding: 20px;
  margin-top: 170px;
  text-align: center;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const Card = styled.div`
  width: 18rem;
  background-color: #00339b;
  color: #ffffff;
`;

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);
  
  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await axios.get('http://localhost:5000/news'); // Asegúrate de que la ruta sea correcta
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
          <Card key={noticia.id} className="card text-bg-primary mb-3">
            <div className="card-header">{noticia.title}</div>
            <div className="card-body">
              <h5 className="card-title">{noticia.title}</h5>
              <p className="card-text">{noticia.content}</p>
              {noticia.imageUrl && <img src={noticia.imageUrl} alt={noticia.title} className="img-fluid" />}
            </div>
          </Card>
        ))}
      </CardContainer>
    </NoticiasContainer>
  );
};

export default Noticias;
