import React, { useState } from "react";
import "./PrincessFinder.css"; // Import styles

export default function PrincessFinder() {
  const [date, setDate] = useState("");
  const [name, setName] = useState("EETANMAY");

  const rotateString = async () => {
    if (!date || isNaN(date) || date < 1) {
      alert("Please enter a valid date!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/rotate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: parseInt(date) }),
      });

      const data = await response.json();
      setName(data.rotatedName);
    } catch (error) {
      console.error("Error connecting to backend:", error);
      alert("Failed to connect to the server!");
    }
  };

  return (
    <div className="princess-container">
      <h1>Searching for the princess...</h1>
      <div className="princess-card">
        <p>Found a scrambled name: {name}</p>
        <input
          type="number"
          placeholder="Enter Date (DD)"
          className="princess-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button className="princess-button" onClick={rotateString}>
          Reveal Princess Name
        </button>
      </div>
    </div>
  );
}
