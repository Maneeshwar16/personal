import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import "./PrincessFinder.css"; 

export default function PrincessFinder() {
  const [date, setDate] = useState("");
  const [rotatedName, setRotatedName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Refs for animations
  const titleRef = useRef(null);
  const cardRef = useRef(null);
  const inputRef = useRef(null);
  const buttonRef = useRef(null);
  const nameRef = useRef(null);
  const messageRef = useRef(null);



  const rotateString = async () => {
    const parsedDate = parseInt(date, 10);
    if (!parsedDate || parsedDate < 1 || parsedDate > 31) {
      alert("Please enter a valid date (1-31)!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/rotate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: parsedDate }),
      });

      const data = await response.json();

      setTimeout(() => {
        setRotatedName(data.rotatedName);
        gsap.fromTo(
          nameRef.current,
          { opacity: 0, y: -20, scale: 0 },
          { opacity: 1, y: 0, scale: 1.2, duration: 1, ease: "bounce.out" }
        );
      }, 1500);

      setTimeout(() => {
        setMessage("🎉 Congratulations! We found the real princess 👑😍");
        setLoading(false);
        gsap.from(messageRef.current, { opacity: 0, y: -20, duration: 1, ease: "power2.out" });
      }, 3000);
    } catch (error) {
      console.error("Error connecting to backend:", error);
      alert("Failed to connect to the server!");
      setLoading(false);
    }
  };

  return (
    <div className="princess-container">
      <h1 ref={titleRef}>Searching for a princess...</h1>
      <div className="princess-card" ref={cardRef}>
        <p>
          Found a princess having these letters <b>EETANMAY</b>.<br/> but there's some confusion 
          in the order.Could you enter your birthdate?
        </p>
        <input
          type="number"
          placeholder="Enter Date (DD)"
          className="princess-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          ref={inputRef}
        />
        <button className="princess-button" onClick={rotateString} disabled={loading} ref={buttonRef}>
          {loading ? "Searching..." : "Reveal Princess Name"}
        </button>

        {loading && <p className="loading-text">🔍 Searching for the princess...</p>}

        {rotatedName && (
          <p className="new-message" ref={nameRef}>
            The real name is: <b>{rotatedName}</b>
          </p>
        )}

        {message && <p className="congrats-message" ref={messageRef}>{message} <br/>  itss youuh ❤️❤️</p>}
      </div>
    </div>
  );
}
