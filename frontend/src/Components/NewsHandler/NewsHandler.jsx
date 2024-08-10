import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
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
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!title || !content) {
      setMessage('Título y contenido son obligatorios.');
      return;
    }
  
    setLoading(true);
    setMessage(null);
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }
    formData.append('publishedAt', new Date().toISOString());
  
    try {
      await axios.post('http://localhost:5000/news', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Noticia publicada exitosamente.');
      setTitle('');
      setContent('');
      setImage(null);
    } catch (error) {
      setMessage('Error al publicar la noticia.');
      console.error('Error al publicar la noticia:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <Title>Generar Nueva Noticia</Title>
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
              {loading ? 'Publicando...' : 'Publicar Noticia'}
            </Button>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default AdminNewsForm;
