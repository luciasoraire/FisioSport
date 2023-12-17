import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';
import { useDispatch } from 'react-redux';
import { getPatientInfo, userAuth } from '../../Redux/Actions/Actions';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showRecoveryLink, setShowRecoveryLink] = useState(false);
  const [emailForRecovery, setEmailForRecovery] = useState('');

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Correo electrónico no válido').required('El correo electrónico es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria')
  });

  const onSubmit = async(values, { setSubmitting, setFieldError }) => {
    // Lógica de envío del formulario
    try {
      const result = await dispatch(userAuth(values));
      
      if(result)
      {
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log(initialValues);
        setFieldError('password', 'Contraseña incorrecta');
        setShowRecoveryLink(true);
        setEmailForRecovery(values.email)
      } else {
        console.error('Error en la autenticación:', error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const redirectForgotPassPage = async () => {
    const response = await axios.post('http://localhost:3001/fisiosport/user/forgot-password', {email: emailForRecovery})
    
    navigate(`/forgot/${response.data.token}`)
  }

  return (
    <div className="containerLogin">
      <div className="messageLogin">
        <h1>¡Bienvenido a tu inicio de Sesión!</h1>
        <p>Regístrate y sé parte</p>
      </div>

      <div className="containerFormLogin">
        <p className="pprincipal">Iniciar Sesion</p>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form className="formLogin">
            <Field type="text" name="email" placeholder="Email" />

            <ErrorMessage name="email" component="div" className="error" />

            <Field type="password" name="password" placeholder="Contraseña" />

            <ErrorMessage name="password" component="div" className="error" />
            {showRecoveryLink && (
              <div className="recuperarContrasenaLink">
                <p onClick={redirectForgotPassPage}>¿Olvidaste tu contraseña?</p>
              </div>
            )}
            <button className="buttonLogin" type="submit">
              Iniciar Sesión
            </button>

            <p className="noAccount">¿Aún no tienes una cuenta?</p>

            <Link to="/register">
              <button className="buttonLogin" type="button">
                Registrarse
              </button>
            </Link>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
