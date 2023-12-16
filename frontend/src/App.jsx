import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import ContactPage from './pages/ContactPage/ContactPage'
import LoginPage from './pages/LoginPage/LoginPage'
import AdminPage from './pages/AdminPage/AdminPage'
import AppointmentPage from './pages/AppointmentPage/AppointmentPage'
import AboutPage from './pages/AboutPage/AboutPage'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import PatientInfo from './pages/PatientInfo/PatientInfo'
import Cookies from 'js-cookie';

function App() {

  const location = useLocation()

  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenAndSignIn = async () => {
      const existingToken = Cookies.get('token');

      if (existingToken) {
        const response = await dispatch(userAuth({ token: existingToken }));

        if (response.payload.authenticated) {
          console.log('Inicio de sesión automático exitoso');
        } else {
          console.log('No se pudo realizar el inicio de sesión automático');
        }
      }
    };

    checkTokenAndSignIn();
  }, []);

  return (
    <div className='app'>
      {location.pathname !== '/admin' &&
      location.pathname !== '/login' &&
      location.pathname !== '/register' &&
      <NavBar/>}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/contacto' element={<ContactPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/turno' element={<AppointmentPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/info' element={<PatientInfo />} />

      </Routes>
      {location.pathname !== '/admin' &&
      location.pathname !== '/login' &&
      location.pathname !== '/register' && <Footer/>
      }
    </div> 
  )  
}

export default App
