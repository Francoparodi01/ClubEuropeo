import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import "bootstrap/dist/css/bootstrap.min.css";

const FormContainer = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  margin-top: 200px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const FormField = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input,
  textarea {
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.875rem;
`;

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const Contacto = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            message: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(50, 'Debe tener 50 caracteres o menos')
                .required('Requerido'),
            email: Yup.string()
                .email('Correo electrónico inválido')
                .required('Requerido'),
            message: Yup.string()
                .max(500, 'Debe tener 500 caracteres o menos')
                .required('Requerido'),
        }),
        onSubmit: (values, { setSubmitting, resetForm }) => {
            const templateParams = {
                from_name: values.name,
                from_email: values.email,
                message: values.message,
            };

            emailjs.send('service_v5ywvuk', 'template_yz20j6u', templateParams, 'nr_2TStfUOiGxPasA')
                .then(response => {
                    console.log('Correo enviado exitosamente', response.status, response.text);
                    resetForm();
                    setSubmitting(false);
                    Swal.fire("¡El correo se envió exitosamente!");
                })
                .catch(error => {
                    console.error('Hubo un error al enviar el correo', error);
                    setSubmitting(false);
                    Swal.fire("No se pudo enviar el correo.");
                });
        },
    });

    return (
        <FormContainer>
            <FormTitle>Contactá con nosotros y despejá tus dudas.</FormTitle>
            <form onSubmit={formik.handleSubmit} id='contacto'>
                <FormField>
                    <label htmlFor="name">Nombre</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <ErrorMessage>{formik.errors.name}</ErrorMessage>
                    ) : null}
                </FormField>

                <FormField>
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <ErrorMessage>{formik.errors.email}</ErrorMessage>
                    ) : null}
                </FormField>

                <FormField>
                    <label htmlFor="message">Mensaje</label>
                    <textarea
                        id="message"
                        name="message"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.message}
                    />
                    {formik.touched.message && formik.errors.message ? (
                        <ErrorMessage>{formik.errors.message}</ErrorMessage>
                    ) : null}
                </FormField>

                <SubmitButton type="submit" disabled={formik.isSubmitting}>Enviar</SubmitButton>
            </form>
        </FormContainer>
    );
};

export default Contacto;
