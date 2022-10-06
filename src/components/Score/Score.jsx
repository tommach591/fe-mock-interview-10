import "./Score.css";

function Score({ score }) {
  return (
    <div className="Score">
      <h2>Score: {score}</h2>
    </div>
  );
}

export default Score;
