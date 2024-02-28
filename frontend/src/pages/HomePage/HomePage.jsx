import "./HomePage.css";
import Intro from "./../../assets/intro.mp4";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home">
      <div className="titulovideo">
        <video src={Intro} className="videointro" autoPlay loop />
        <div className="botonturno">

</div>

      </div>

    </div>
  );
};

export default HomePage;
