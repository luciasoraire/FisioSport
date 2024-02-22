import React from 'react';
import "./RegisterPage.css";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Correo electrónico no válido').required('El correo electrónico es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria')
  });

  const onSubmit = async (values) => {
    try {
      // Realizar la solicitud de registro utilizando axios
      const response = await axios.post('http://localhost:3001/fisiosport/user/register', values);
      console.log(response.data); // Puedes manejar la respuesta según tus necesidades

      // Redirigir al usuario a la página de inicio de sesión después del registro
      navigate('/login');
    } catch (error) {
      console.error('Error al registrar al usuario:', error);
    }
  };

  return (
    <div className='containerRegister'>
      <div className='containerTittle'>
        <h1>¡Bienvenido a tu inicio de Sesión!</h1>
        <p>Regístrate y sé parte</p>
      </div>

      <div className='containerFormRegister'>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form className='formRegister'>
            <h1 className='registerTittle'>Registrarse</h1>

            <Field type='text' name='email' placeholder='Email' />

            <ErrorMessage name='email' component='div' className='error' />

            <Field type='password' name='password' placeholder='Contraseña' />

            <ErrorMessage name='password' component='div' className='error' />

            <button className='buttonRegister' type='submit'>
              Registrarse
            </button>

            <p className='noAccount'>¿Ya tienes una cuenta?</p>

            <Link to='/login'>
              <button className='buttonLogin' type='button'>
                Iniciar Sesión
              </button>
            </Link>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;
