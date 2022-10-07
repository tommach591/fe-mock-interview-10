import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="Home">
      <div className="HomeContents">
        <h1 className="Title">Games</h1>
        <Link className="LinkButton" to="/colorguesser">
          <div>Color Guesser</div>
        </Link>
        <Link className="LinkButton" to="/pokemontypematchup">
          <div>Pokemon Type Matchup</div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
