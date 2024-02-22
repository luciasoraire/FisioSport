import "./HomePage.css";
import Intro from "./../../assets/intro.mp4";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <div className="titulovideo">
        <video src={Intro} className="videointro" autoPlay loop />
       {/* <Link to="/turno" className="titulosobrevideo">
          <h1>Solicite su turno</h1>
  </Link>*/}
      </div>

    </div>
  );
};

export default HomePage;
