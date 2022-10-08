import "./Button.css";
import { TypeColor } from "../../utils/helper";

function Button({ description, handleClick }) {
  return (
    <div
      className="Button"
      style={{ background: `#${TypeColor[description.toLowerCase()]}` }}
      onClick={() => {
        handleClick();
      }}
    >
      {description}
    </div>
  );
}

export default Button;
