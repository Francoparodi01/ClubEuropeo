import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Form, Button, Container, Row, Col, Alert, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const FormContainer = styled(Container)`
  max-width: 600px;
  margin-top: 200px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  font-weight: bold;
`;

const AdminNewsForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [author, setAuthor] = useState(''); // Nuevo estado para el autor
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/news');
      setNewsList(response.data);
    } catch (error) {
      console.error('Error al obtener las noticias:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !author) {
      setMessage('Título, contenido y autor son obligatorios.');
      return;
    }

    setLoading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', author);
    if (image) {
      formData.append('image', image);
    }
    formData.append('publishedAt', new Date().toISOString());

    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/news/${editId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setMessage('Noticia actualizada exitosamente.');
      } else {
        await axios.post('http://localhost:5000/news', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setMessage('Noticia publicada exitosamente.');
      }

      setTitle('');
      setContent('');
      setAuthor(''); 
      setImage(null);
      setEditMode(false);
      setEditId(null);
      fetchNews();
    } catch (error) {
      setMessage(editMode ? 'Error al actualizar la noticia.' : 'Error al publicar la noticia.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (news) => {
    setTitle(news.title);
    setContent(news.content);
    setAuthor(news.author); 
    setEditId(news._id);
    setEditMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/news/${id}`);
      setMessage('Noticia eliminada exitosamente.');
      fetchNews();
    } catch (error) {
      setMessage('Error al eliminar la noticia.');
      console.error('Error al eliminar la noticia:', error);
    }
  };

  

  return (
    <FormContainer>
      <Title>{editMode ? 'Editar Noticia' : 'Escribir nueva noticia'}</Title>
      {message && <Alert variant={message.includes('Error') ? 'danger' : 'success'}>{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresar título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formContent" className="mt-3">
          <Form.Label>Contenido</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Ingresar contenido"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formAuthor" className="mt-3">
          <Form.Label>Autor</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresar autor"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formImage" className="mt-3">
          <Form.Label>Imagen</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>

        <Row className="mt-4">
          <Col className="d-flex justify-content-center">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Guardando...' : (editMode ? 'Actualizar Noticia' : 'Publicar Noticia')}
            </Button>
          </Col>
        </Row>
      </Form>

      <Title className="mt-5">Noticias Publicadas</Title>
      <ListGroup>
        {newsList.map((news) => (
          <ListGroup.Item key={news._id}>
            <div>
              <strong>{news.title}</strong>
              <div>Autor: {news.author}</div> 
            </div>
            <Button
              variant="secondary"
              onClick={() => handleEdit(news)}
              className="mt-2"
            >
              Editar
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDelete(news._id)}
              className="mt-2 ms-2"
            >
              Eliminar
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </FormContainer>
  );
};

export default AdminNewsForm;
