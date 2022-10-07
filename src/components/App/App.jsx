import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import ColorPicker from "../ColorGuesser";
import PokemonTypeMatchup from "../PokemonTypeMatchup";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/colorguesser" element={<ColorPicker />} />
        <Route path="/pokemontypematchup" element={<PokemonTypeMatchup />} />
      </Routes>
    </div>
  );
}

export default App;
