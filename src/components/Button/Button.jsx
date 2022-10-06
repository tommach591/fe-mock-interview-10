import "./Button.css";

function Button({ description, handleClick }) {
  return (
    <div
      className="Button noselect"
      onClick={() => {
        handleClick();
      }}
    >
      {description}
    </div>
  );
}

export default Button;
