import "./HomeButton.css";
import HomeIcon from "../../utils/HomeIcon.svg";
import { Link } from "react-router-dom";

function HomeButton() {
  return (
    <div className="HomeButton">
      <Link to="/">
        <div className="HomeIcon">
          <img src={HomeIcon} alt="Home" />
        </div>
      </Link>
    </div>
  );
}

export default HomeButton;
