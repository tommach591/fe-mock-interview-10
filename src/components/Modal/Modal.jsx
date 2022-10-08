import "./Modal.css";
import Button from "../Button";
import ColorDisplay from "../ColorDisplay";
import { ToCaps } from "../../utils/helper";

function Modal({ answer, choice, reset, game }) {
  return (
    <div className="Modal">
      {answer === choice ? (
        <div className="Inner">
          <h3 className="Header Correct">Correct!</h3>
          <div className="Text">
            {game === 0 ? `#${answer}` : `${ToCaps(answer)}`}
            {game === 0 ? <ColorDisplay color={answer} /> : " "} was the right
            answer!
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
            The answer was {game === 0 ? `#${answer}` : `${ToCaps(answer)}.`}
            {game === 0 ? <ColorDisplay color={answer} /> : " "}
          </div>
          <div className="Text">
            {game === 0 ? `#${choice} ` : `${ToCaps(choice)} `}
            {game === 0 ? <ColorDisplay color={choice} /> : " "}
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
