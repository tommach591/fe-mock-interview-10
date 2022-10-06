import { useState, useEffect } from "react";
import "./App.css";
import { GetRandomColor } from "../../utils/helper";
import Score from "../Score";
import Box from "../Box";
import Button from "../Button";
import Modal from "../Modal";

function App() {
  const [score, setScore] = useState(0);
  const [color, setColor] = useState(GetRandomColor());
  const [modalOn, setModalOn] = useState(false);
  const [choice, setChoice] = useState("");
  const [buttons, setButtons] = useState();

  const resetGame = () => {
    RandomizeButtons();
    setModalOn(false);
    setChoice("");
  };

  const handleCorrect = () => {
    setScore(score + 1);
    setModalOn(true);
  };

  const handleIncorrect = () => {
    setModalOn(true);
  };

  useEffect(() => {
    resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  const RandomizeButtons = () => {
    const newButtons = [];
    let correctButton = Math.floor(Math.random() * 3);
    for (let i = 0; i < 3; i++) {
      if (i === correctButton) {
        newButtons.push(
          <Button
            key={i}
            description={`#${color}`}
            handleClick={() => {
              setChoice(color);
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

  return (
    <div className="App">
      <div className="AppContents">
        <Score score={score} />
        <Box color={color} />
        <div className="AppButtons">{buttons}</div>
        {modalOn ? (
          <Modal
            color={color}
            choice={choice}
            reset={() => {
              setColor(GetRandomColor());
            }}
          />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default App;
