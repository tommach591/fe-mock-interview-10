import { useState, useEffect, useCallback } from "react";
import { getData, TypeWeakness } from "../../utils/helper";
import "./PokemonTypeMatchup.css";
import HomeButton from "../HomeButton";
import Score from "../Score";
import Button from "../Button";
import Modal from "../Modal";

function PokemonTypeMatchup() {
  const [score, setScore] = useState(0);
  const [type, setType] = useState();
  const [weakness, setWeakness] = useState({});

  const GetWeakness = (type1, type2) => {
    let foundWeakness = {};
    if (type2) {
      for (const key in TypeWeakness[type1]) {
        foundWeakness[key] =
          TypeWeakness[type1][key] * TypeWeakness[type2][key];
      }
    } else {
      foundWeakness = TypeWeakness[type1];
    }
    return foundWeakness;
  };

  const resetGame = () => {
    getData(
      `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 905) + 1}`
    )
      .then((data) => {
        let types = [];
        data.types.forEach((type) => {
          types.push(type.type.name);
        });
        setType(types);
        setWeakness(GetWeakness(types[0], types[1]));
        console.log(type);
        console.log(weakness);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    resetGame();
  }, []);

  return (
    <div className="PokemonTypeMatchup">
      <HomeButton />
      <div className="PokemonTypeMatchupContents">
        <Score score={score} />
        <div className="TypeDisplay">
          {type ? (
            type.map((t) => {
              return (
                <div key={t} className="Type">
                  <h2>{t.charAt(0).toUpperCase() + t.slice(1)}</h2>
                </div>
              );
            })
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}

export default PokemonTypeMatchup;
