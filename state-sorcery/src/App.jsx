import { useState } from "react";
import Counter from "./components/Counter";
import ToggleShield from "./components/ToggleShield";
import ListManager from "./components/ListManager";
import "./App.css";

export default function App() {
  const [lastAction, setLastAction] = useState("None");

  return (
    <div className="container">
      <h1>State Sorcery</h1>

      <Counter setLastAction={setLastAction} />
      <ToggleShield setLastAction={setLastAction} />
      <ListManager setLastAction={setLastAction} />

      <div className="status">
        <p><b>Last Action:</b> {lastAction}</p>
      </div>
    </div>
  );
}
