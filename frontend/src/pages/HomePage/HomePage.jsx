import "./HomePage.css";
import Intro from "./../../assets/intro.mp4";
import Christian from "./../../assets/christian.jpg";
import ContactPage from "./../ContactPage/ContactPage";
import { Link } from "react-router-dom";
import ComentariosImagen from "./../../assets/comentarios.png";
import PrimerComentario from "./../../assets/comentario1.png";
import SegundoComentario from "./../../assets/comentario5.png";
import TercerComentario from "./../../assets/comentario3.png";
import CuartoComentario from "./../../assets/comentario4.png";
import QuintoComentario from "./../../assets/comentario2.png";
import SextoComentario from "./../../assets/comentario6.png";
import NavBar from "./../../components/NavBar/NavBar";
import Cartel from "./../../assets/cartel.png";
import Reseña1 from "./../../assets/reseña1.png";
import Reseña2 from "./../../assets/reseña2.png";
const HomePage = () => {
  return (
    <div>

<div className="titulovideo">
      <video src='https://res.cloudinary.com/djdqwkavb/video/upload/v1702782950/intro_l6fqwh.mp4' className="videointro" autoPlay loop />
      <Link to="/turno" className="titulosobrevideo"><h1>Solicite su turno</h1></Link>
      </div>

      <div className="container1">
        <img
          src={Christian}
          className="fotochristian"
          alt="Kinesiólogo de FisioSport"
        />
        <div className="textocontainer1">
          <p className="descripcionchristian">
            <h2 className="titulosobremi">Sobre mí</h2>
            <hr />
            <br />
            <b className="holaatodos">¡Hola a todos!</b>
            <br></br>
            <br></br>
            Me llamo Christian, tengo 33 años y soy Kinesiólogo, me recibí en el
            año 2016.<br></br>
            Estoy felizmente casado, tengo 2 hijos y una perrhija. Tengo un
            postgrado en Deportología de Alto Rendimiento y estoy constantemente
            actualizándome y capacitándome en este profesión que tanto me
            apasiona. Hace más de 6 años estoy a cargo del plantel superior de
            rugby del Club Cardenales y en el 2020 abrí mi consultorio en barrio
            Parque Centenario donde atiendo diariamente con turnos programados.
            <br></br>
            <br></br>
            Por consultas o mayor información podes contactarme{" "}
            <Link to={ContactPage} className="link">
              aquí.
            </Link>
          </p>
          <div className="comentarios">
            <div className="columna1">
              <img
                src={PrimerComentario}
                alt="Comentarios de Instagram"
                className="primercomentario"
              />
              <br></br>
              <img
                src={SegundoComentario}
                alt="Comentarios de Instagram"
                className="primercomentario"
              />
              <br></br>
              <img
                src={CuartoComentario}
                alt="Comentarios de Instagram"
                className="primercomentario"
              />
            </div>
            <div className="columna2">
              <img
                src={TercerComentario}
                alt="Comentarios de Instagram"
                className="primercomentario"
              />

              <br></br>
              <img
                src={QuintoComentario}
                alt="Comentarios de Instagram"
                className="primercomentario"
              />
              <br></br>
              <img
                src={SextoComentario}
                alt="Comentarios de Instagram"
                className="primercomentario"
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="container1">
        <div className="textocontainer1">
          <p className="descripcionchristian">
            <h2 className="titulosobremi">Consultorio</h2>
            <hr />
            <br />
            <b className="holaatodos">¿Dónde nos encontramos? </b>
            <br></br>
            <br></br>
            <p>
            Estamos ubicados en Álvarez Condarco 1205, altura Av. Coronel Suárez
            1200.
          </p>
          <br></br>
            <b className="holaatodos">Nuestros pacientes </b>
            <br></br>
            <br />
            <p>
              Para leer más opiniones o agregar su reseña en Google presione{" "}
              <a
                href="https://maps.app.goo.gl/7dco2RhQzUJApHiV9"
                className="linkreseñas"
              >
                aquí.
              </a>
              <br></br>
            </p>
            <div className="reseñas">
              <article className="reseña">
                <h1 className="nombrereseña">Patricia Marangoni</h1>
                <p className="estrellas">
                  <i class="fa-solid fa-star" id="estrella"></i>
                  <i class="fa-solid fa-star" id="estrella"></i>
                  <i class="fa-solid fa-star" id="estrella"></i>
                  <i class="fa-solid fa-star" id="estrella"></i>
                  <i class="fa-solid fa-star" id="estrella"></i>
                </p>
                <p className="descripcionreseña">
                  Excelente servicio!! Siempre voy cuando estoy con alguna
                  molestia y además lo recomiendo a todos siempre
                </p>
              </article>
              <article className="reseña">
                <h1 className="nombrereseña">Sandra Valle</h1>
                <p className="estrellas">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </p>
                <p className="descripcionreseña">
                  Excelente profesional y excelente persona Christian muy
                  recomendable el lugar muy higiénico
                </p>
              </article>
              <article className="reseña">
                <h1 className="nombrereseña">Gonzalo Reyna</h1>
                <p className="estrellas">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </p>
                <p className="descripcionreseña">
                  Fui para la rehabilitación de la rotura del tendón de aquiles.
                  Muy buena atención y profesionalismo.
                </p>
              </article>
              </div>
              <div className="reseñas">
              <article className="reseña">
                <h1 className="nombrereseña">Jorge Rafael Villagra</h1>
                <p className="estrellas">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </p>
                <p className="descripcionreseña">
                  Excelente atención del kine, me recuperó rápidamente de mi
                  lesión. 
                </p>
              </article>
              <article className="reseña">
                <h1 className="nombrereseña">Federico Rodriguez</h1>
                <p className="estrellas">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </p>
                <p className="descripcionreseña">
                Excelente atención y puntualidad. Recomendable.
                </p>
              </article>
              <article className="reseña">
                <h1 className="nombrereseña">Matías Sarmiento</h1>
                <p className="estrellas">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </p>
                <p className="descripcionreseña">
                El mejor kinesiólogo deportivo de Tucumán, muy recomendable para todos los deportes.
                </p>
              </article>
            </div>
            <br />
</p>
        </div>
        <img
          src={Cartel}
          className="fotochristian"
          alt="Kinesiólogo de FisioSport"
        />
      </div>
    </div>
  );
};

export default HomePage;
