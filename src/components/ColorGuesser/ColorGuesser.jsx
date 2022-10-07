import { useState, useEffect, useCallback } from "react";
import "./ColorGuesser.css";
import { GetRandomColor } from "../../utils/helper";
import HomeButton from "../HomeButton";
import Score from "../Score";
import Box from "../Box";
import Button from "../Button";
import Modal from "../Modal";

function ColorGuesser() {
  const [score, setScore] = useState(0);
  const [color, setColor] = useState(GetRandomColor());
  const [modalOn, setModalOn] = useState(true);
  const [choice, setChoice] = useState("");
  const [buttons, setButtons] = useState();

  const resetGame = useCallback(() => {
    const handleCorrect = () => {
      setScore(score + 1);
      setModalOn(true);
    };

    const handleIncorrect = () => {
      setModalOn(true);
    };

    const RandomizeButtons = (newColor) => {
      setColor(newColor);

      const newButtons = [];
      let correctButton = Math.floor(Math.random() * 3);
      for (let i = 0; i < 3; i++) {
        if (i === correctButton) {
          newButtons.push(
            <Button
              key={i}
              description={`#${newColor}`}
              handleClick={() => {
                setChoice(newColor);
                handleCorrect();
              }}
            />
          );
        } else {
          let fakeColor = GetRandomColor();
          newButtons.push(
            <Button
              key={i}
              description={`#${fakeColor}`}
              handleClick={() => {
                setChoice(fakeColor);
                handleIncorrect();
              }}
            />
          );
        }
      }
      setButtons(newButtons);
    };

    setModalOn(false);
    RandomizeButtons(GetRandomColor());
    setChoice("");
  }, [score]);

  // Reset game once on load.
  useEffect(() => {
    resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ColorGuesser">
      <HomeButton />
      <div className="ColorGuesserContents">
        <Score score={score} />
        <Box color={color} />
        <div className="ColorGuesserButtons">{buttons}</div>
        {modalOn ? (
          <Modal
            color={color}
            choice={choice}
            reset={() => {
              resetGame();
            }}
          />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default ColorGuesser;
