import "./Box.css";

function Box({ color }) {
  return (
    <div className="Box">
      <div className="ColoredBox" style={{ background: `#${color}` }}></div>
    </div>
  );
}

export default Box;
