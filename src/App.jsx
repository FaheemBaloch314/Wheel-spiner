import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import "./App.css";
import { BiX } from "react-icons/bi";

const App = () => {
  const [names, setNames] = useState([]);
  const [input, setInput] = useState("");
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [winner, setWinner] = useState("");

  const handleAdd = () => {
    if (input.trim() === "") return;
    setNames([...names, { option: input.trim() }]);
    setInput("");
  };

  const handleDelete = (index) => {
    setNames(names.filter((_, i) => i !== index));
  };

  const handleSpin = () => {
    if (names.length === 0) return;
    const newPrizeNumber = Math.floor(Math.random() * names.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleStop = () => {
    setMustSpin(false);
    setWinner(names[prizeNumber]?.option || "");
  };

  return (
    <div className="container">
      {/* LEFT SIDE */}
      <div className="left-side">
        <h2>Add Names</h2>

        <div>
          <input
            type="text"
            placeholder="Enter name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAdd()
              }
            }}
          />
          <button onClick={handleAdd}>Add</button>
        </div>

        <h3>Names List</h3>

        {/* NUMBERED LIST */}
        <ol className="name-list">
          {names.map((n, idx) => (
            <li key={idx}>
              <span className="name-text">{n.option}</span>
              <BiX
                className="delete-icon"
                onClick={() => handleDelete(idx)}
              />
            </li>
          ))}
        </ol>

        {winner && (
          <div className="winner-box">
            Winner: <strong>{winner}</strong>
          </div>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="right-side">
        <h2>Spin the Wheel</h2>

        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={names.length > 0 ? names : [{ option: "" }]}
          backgroundColors={[
            "#3e3e3e",
            "#b98d2cff",
            "#2cb933ff",
            "#df3428",
            "#f9c74f",
            "#90be6d",
          ]}
          textColors={["#ffffff"]}
          onStopSpinning={handleStop}
          radiusLineWidth={2}     // thicker lines for better visibility
          outerBorderColor="#222" // border around wheel
          outerBorderWidth={3}
          innerRadius={6}        // inner circle radius
          radiusLineColor="#fff"  // color of lines between sectors
          fontSize={30}           // font size for text inside sectors
          width={950}             // increased width
          height={950}            // increased height
        />

        <button className="spin-btn" onClick={() => {
          handleSpin()
          setWinner()
        }}>
          Spin
        </button>
      </div>
    </div>
  );
};

export default App;