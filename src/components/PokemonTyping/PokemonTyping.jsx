import "./PokemonTyping.css";
import { TypeColor } from "../../utils/helper";

function PokemonTyping({ type }) {
  let pokemonTyping = [];
  type.forEach((t) => {
    pokemonTyping.push(
      <div key={t} className="Type" style={{ background: `#${TypeColor[t]}` }}>
        <h3>{t.charAt(0).toUpperCase() + t.slice(1)}</h3>
      </div>
    );
  });
  return <div className="PokemonTyping">{pokemonTyping}</div>;
}

export default PokemonTyping;
