import { useState } from "react";

export default function Counter({ setLastAction }) {
  const [count, setCount] = useState(0);
  const [warning, setWarning] = useState("");

  function increment() {
    setCount(count + 1);
    setWarning("");
    setLastAction("Incremented counter");
  }

  function decrement() {
    if (count === 0) {
      setWarning("Counter cannot go below 0");
      setLastAction("Attempted to go below 0");
      return;
    }
    setCount(count - 1);
    setWarning("");
    setLastAction("Decremented counter");
  }

  function reset() {
    setCount(0);
    setWarning("");
    setLastAction("Reset counter");
  }

  return (
    <div className="box">
      <h2>Counter</h2>
      <h3>{count}</h3>

      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>

      {warning && <p className="warning">{warning}</p>}
    </div>
  );
}

