import "./ColorDisplay.css";

function ColorDisplay({ color }) {
  return (
    <div className="ColorDisplay" style={{ background: `#${color}` }}></div>
  );
}

export default ColorDisplay;
