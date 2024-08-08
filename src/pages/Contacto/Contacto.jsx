import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

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
        <>
            <div className='titulo-form'>
                <h2>¡Contáctame!</h2>
            </div>
            <form onSubmit={formik.handleSubmit} className='form-contacto' id='contacto'>
                <label htmlFor="name" className='label-form'>Nombre</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                    <div className='error-message'>{formik.errors.name}</div>
                ) : null}

                <label htmlFor="email" className='label-form'>Correo Electrónico</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className='error-message'>{formik.errors.email}</div>
                ) : null}

                <label htmlFor="message" className='label-form'>Mensaje</label>
                <textarea
                    id="message"
                    name="message"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                />
                {formik.touched.message && formik.errors.message ? (
                    <div className='error-message'>{formik.errors.message}</div>
                ) : null}

                <button type="submit" disabled={formik.isSubmitting}>Enviar</button>
            </form>
        </>
    );
};

export default Contacto;