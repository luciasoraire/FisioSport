import React, { useEffect, useState } from "react";
import Logo from './../../assets/logo.png'
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Footer.css";


const Footer = () => {

    return (
        <>
        <div className="footer">
    <footer>
      <div class="top">
        <div class="pages">
          <ul>
            <h3>Explore</h3>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Contacto</a></li>
            <li><a href="#">Iniciar Sesión</a></li>

          </ul>

          <ul>
            <h3>Conozca</h3>
            <li><a href="#">Sobre Nosotros</a></li>
            <li><a href="#">Reseñas</a></li>
            <li><a href="#">Ubicación</a></li>
          </ul>

          <ul>
            <h3>Obras Sociales</h3>
            <li><a href="#">PAMI</a></li>
            <li><a href="#">Boreal</a></li>

          </ul>
        </div>
        <div class="newsletter">
          <h3>NEWSLETTER</h3>
          <form>
            <input
              type="email"
              name="newsletter_email"
              id="newsletter_email"
              placeholder="Email"
            />
            <input type="button" value="Enviar" />
          </form>
        </div>
      </div>
      <div class="social">
        <i class="fab fa-github"></i>
        <i class="fab fa-facebook"></i>
        <i class="fab fa-instagram"></i>
        <i class="fab fa-google"></i>
        
      </div>
      <div class="info">
        <div class="legal">
          <a href="#">Términos y Condiciones</a><a href="#">Política de Privacidad</a>
        </div>
        <div class="copyright">2024 &copy; Tesis Soraire, Lucía - Torres, Mariano</div>
      </div>
    </footer>
    </div>

        </>
    );
};

export default Footer;