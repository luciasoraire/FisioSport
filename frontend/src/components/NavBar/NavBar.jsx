import React, { useEffect, useState } from "react";
import Logo from './../../assets/logo.png'
import { NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDashboard } from "react-icons/md";
import { closeSesion } from "../../Redux/Actions/Actions";
import Cookies from 'js-cookie';


const NavBar = () => {

    const [clicked, setClicked] = useState(false);
    const userAuth = useSelector(state => state.userAuth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClick = () => {
        setClicked(!clicked);
    }

    const handleLogout = () => {
        dispatch(closeSesion())
        Cookies.remove('token');
        navigate('/')
    }

    return (
        <>
            <nav>
                <a href="#">
                    <img src='https://res.cloudinary.com/djdqwkavb/image/upload/v1702783588/fisioSport/logo_ezmwer.png' alt="" className='logo' />
                </a>
                <div>
                    <ul id='navbar' className={clicked ? "#navbar active" : "#navbar"}>
                        <li>
                            <i class="fa-solid fa-house "></i><NavLink to="/"> Inicio</NavLink>
                        </li>
                        { userAuth.authenticated && <li>
                            <i class="fa-solid fa-calendar-days"></i> <NavLink to="/turno"> Turnos</NavLink>
                        </li>}
                        <li>
                            <NavLink to="/contacto"><i class="fa-solid fa-phone"></i> Contacto</NavLink>
                        </li>
                        <li>
                            {
                               !userAuth.authenticated 
                               ? <li><NavLink to="/login" activeClassName="active"><i class="fa-solid fa-user"></i> Iniciar Sesión</NavLink></li>              
                                : <p className="active" onClick={handleLogout}><i class="fa-solid fa-user"></i> Cerrar Sesión</p>            
                            }
                        </li>
                        <div>
                            {   
                                userAuth.authenticated && !userAuth.isAdmin && <li><NavLink to="/info" activeClassName="active"><i class="fa-solid fa-user"></i>Informacion Personal</NavLink></li>
                            }
                            {   
                                userAuth.isAdmin && <li><i class="fa-solid fa-table"></i><NavLink to="/admin" activeClassName="active">Dashboard</NavLink></li>
                            }
                            
                        </div>

                    </ul>
                </div>
                <div id='mobile' onClick={handleClick}>
                    <i id='bar' className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>

                </div>
            </nav>
        </>
    );
};

export default NavBar;