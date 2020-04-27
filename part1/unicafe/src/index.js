import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
      </div>
      <div>
        <h1>statictics</h1>
        <span>good {good}</span>
        <br />
        <span>neutral {neutral}</span>
        <br />
        <span>bad {bad}</span>
        <br />
        <span>all {good + neutral + bad}</span>
        <br />
        <span>average {(good - bad) / (good + neutral + bad)}</span>
        <br />
        <span>positive {(good / (good + neutral + bad)) * 100} %</span>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
