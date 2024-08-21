import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom'; 

const NoticiasContainer = styled.div`
  padding: 20px;
  margin-top: 150px;
  background-color: #f8f9fa;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(21rem, 1fr));
  gap: 30px;
  justify-content: center;
`;

const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  .card-body {
    padding: 20px;
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #003399;  /* Azul UE */
    margin-bottom: 10px;
  }

  .card-text {
    font-size: 1rem;
    color: #666666;
    margin-bottom: 20px;
  }

  .card-img-top {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .card-footer {
    padding: 10px 20px;
    background-color: #f8f9fa;
    border-top: 1px solid #e0e0e0;
  }
`;

const Author = styled.div`
  font-size: 0.875rem;
  color: #999999;
`;

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await axios.get('https://club-europeo-back.vercel.app/'); // Asegúrate de que la URL sea correcta
        setNoticias(response.data);
      } catch (error) {
        console.error('Error fetching noticias', error);
      }
    };

    fetchNoticias();
  }, []);

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
  };

  return (
    <NoticiasContainer>
      <CardContainer>
        {noticias.map((noticia) => (
          <Card key={noticia._id}>
            {noticia.imageUrl && (
              <img 
                src={noticia.imageUrl} 
                alt={noticia.title} 
                className="card-img-top" 
              />
            )}
            <div className="card-body">
              <h5 className="card-title">{noticia.title}</h5>
              <p className="card-text">
                {truncateText(stripHtml(noticia.content), 25)}
              </p>
              <Link to={`/news/${noticia._id}`} className="btn btn-primary">
                Leer más
              </Link>
            </div>
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
