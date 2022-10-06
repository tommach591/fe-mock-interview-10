import "./Modal.css";
import Button from "../Button";
import ColorDisplay from "../ColorDisplay";

function Modal({ color, choice, reset }) {
  return (
    <div className="Modal">
      {color === choice ? (
        <div className="Inner">
          <h3 className="Header Correct">Correct!</h3>
          <div className="Text">
            #{color} <ColorDisplay color={color} /> was the right answer!
          </div>
          <div className="ModalButton">
            <Button
              description={"Continue"}
              handleClick={() => {
                reset();
              }}
            />
          </div>
        </div>
      ) : (
        <div className="Inner">
          <h3 className="Header Incorrect">Incorrect!</h3>
          <div className="Text">
            The answer was #{color} <ColorDisplay color={color} />
          </div>
          <div className="Text">
            #{choice}
            <ColorDisplay color={choice} />
            was not the right answer.
          </div>
          <div className="ModalButton">
            <Button
              description={"Continue"}
              handleClick={() => {
                reset();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
