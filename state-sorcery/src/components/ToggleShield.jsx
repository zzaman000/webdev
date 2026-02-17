import { useState } from "react";

export default function ToggleShield({ setLastAction }) {
  const [shield, setShield] = useState(false);

  function toggleShield() {
    setShield(!shield);
    setLastAction(`Spell Shield turned ${!shield ? "ON" : "OFF"}`);
  }

  return (
    <div className={`box ${shield ? "active" : ""}`}>
      <h2>Toggle Shield</h2>

      <button onClick={toggleShield}>
        Spell Shield: {shield ? "ON" : "OFF"}
      </button>
    </div>
  );
}
