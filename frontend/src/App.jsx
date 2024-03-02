import { useEffect, useState } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { userAuthToken } from './Redux/Actions/Actions'
import ForgotPassPage from './pages/ForgotPassPage/ForgotPassPage'
import ProtectedRoute from './utils/ProtectedRoute'

function App() {

  const location = useLocation()

  const dispatch = useDispatch();

  const userAuth = useSelector(state => state.userAuth)

  useEffect(() => {
    const checkTokenAndSignIn = async () => {
      const existingToken = Cookies.get('token');

      if (existingToken) {
        dispatch(userAuthToken(existingToken));
      }
    };

    checkTokenAndSignIn();
  }, []);

  return (
    <div className='app'>
      {
        location.pathname !== '/admin' &&
        location.pathname !== '/login' &&
        !location.pathname.startsWith('/forgot/') &&
        location.pathname !== '/register' &&
        <NavBar />
      }
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/contacto' element={<ContactPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/forgot/:token' element={<ForgotPassPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route element={<ProtectedRoute canActivate={userAuth.isAdmin} />}>
          <Route path='/admin' element={<AdminPage />} />
        </Route>
        <Route path='/turno' element={<AppointmentPage />} />
        <Route path='/info' element={<PatientInfo />} />
        <Route path='/about' element={<AboutPage />} />

      </Routes>
      {
        location.pathname !== '/admin' &&
        location.pathname !== '/login' &&
        !location.pathname.startsWith('/forgot/') &&
        location.pathname !== '/register' && <Footer />
      }

    </div>
  )
}

export default App
