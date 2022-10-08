import { useState, useEffect, useCallback } from "react";
import { getData, ToCaps, TypeAdvantages } from "../../utils/helper";
import "./PokemonTypeMatchup.css";
import HomeButton from "../HomeButton";
import Score from "../Score";
import Modal from "../Modal";
import Button from "../Button";
import PokemonTyping from "../PokemonTyping";

function PokemonTypeMatchup() {
  const [score, setScore] = useState(0);
  const [name, setName] = useState("");
  const [type, setType] = useState();
  const [typeAdvantage, setTypeAdvantage] = useState({});
  const [notEffective, setNotEffective] = useState([]);
  const [veryEffective, setVeryEffective] = useState([]);
  const [modalOn, setModalOn] = useState(false);
  const [choice, setChoice] = useState("");
  const [answer, setAnswer] = useState("");
  const [buttons, setButtons] = useState();

  const GetTypeAdvantage = useCallback(() => {
    let foundTypeAdvantage = {};
    if (type.length === 2) {
      for (const key in TypeAdvantages[type[0]]) {
        foundTypeAdvantage[key] =
          TypeAdvantages[type[0]][key] * TypeAdvantages[type[1]][key];
      }
    } else {
      foundTypeAdvantage = TypeAdvantages[type[0]];
    }
    return foundTypeAdvantage;
  }, [type]);

  const resetGame = () => {
    getData(
      `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 905) + 1}`
    )
      .then((data) => {
        let formatted = "";
        data.name.split("-").forEach((e) => {
          formatted += ToCaps(e) + " ";
        });
        setName(formatted);
        let types = [];
        data.types.forEach((type) => {
          types.push(type.type.name);
        });
        setType(types);
        setChoice("");
        setModalOn(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    if (type) {
      setTypeAdvantage(GetTypeAdvantage());
    }
  }, [type, GetTypeAdvantage]);

  useEffect(() => {
    let foundDisadvantage = [];
    let foundAdvantage = [];
    for (const key in typeAdvantage) {
      if (typeAdvantage[key] > 1) {
        foundDisadvantage.push(key);
      } else {
        foundAdvantage.push(key);
      }
    }
    setVeryEffective(foundDisadvantage);
    setNotEffective(foundAdvantage);
  }, [typeAdvantage]);

  useEffect(() => {
    let index = Math.floor(Math.random() * veryEffective.length);
    setAnswer(veryEffective[index]);
  }, [veryEffective, notEffective]);

  useEffect(() => {
    const handleCorrect = (c) => {
      setChoice(c);
      setScore(score + 1);
      setModalOn(true);
    };

    const handleIncorrect = (c) => {
      setChoice(c);
      setModalOn(true);
    };

    const RandomizeButtons = (answer) => {
      setAnswer(answer);
      let copyNotEffective = [...notEffective];
      const newButtons = [];
      let correctButton = Math.floor(Math.random() * 3);
      for (let i = 0; i < 3; i++) {
        if (i === correctButton) {
          newButtons.push(
            <Button
              key={i}
              description={`${ToCaps(answer)}`}
              handleClick={() => {
                handleCorrect(answer);
              }}
            />
          );
        } else {
          let type =
            copyNotEffective[
              Math.floor(Math.random() * copyNotEffective.length)
            ];
          copyNotEffective.splice(copyNotEffective.indexOf(type), 1);
          newButtons.push(
            <Button
              key={i}
              description={`${ToCaps(type)}`}
              handleClick={() => {
                handleIncorrect(type);
              }}
            />
          );
        }
      }
      setButtons(newButtons);
    };

    setModalOn(false);
    if (veryEffective.length !== 0 && notEffective.length !== 0)
      RandomizeButtons(answer);
    setChoice("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer, name]);

  return (
    <div className="PokemonTypeMatchup">
      <HomeButton />
      <div className="PokemonTypeMatchupContents">
        <Score score={score} />
        <div className="GameDisplay">
          <div className="PokemonName">
            <h2>{ToCaps(name)}</h2>
          </div>
          {type ? <PokemonTyping type={type} /> : <div />}
          <div className="PokemonTypeMatchupButtons">{buttons}</div>
          {modalOn ? (
            <Modal
              answer={answer}
              choice={choice}
              reset={() => {
                resetGame();
              }}
              game={1}
            />
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}

export default PokemonTypeMatchup;
