import { useState } from "react";

export default function ListManager({ setLastAction }) {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  function addItem() {
    if (!input.trim()) {
      setLastAction("Blocked empty submission");
      return;
    }

    setItems([...items, input]);
    setLastAction(`Added "${input}"`);
    setInput("");
  }

  function removeItem(index) {
    const removed = items[index];
    setItems(items.filter((_, i) => i !== index));
    setLastAction(`Removed "${removed}"`);
  }

  return (
    <div className="box">
      <h2>List Manager</h2>

      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter item..."
      />
      <button onClick={addItem}>Add</button>

      <ul>
        {items.map((item, i) => (
          <li key={i}>
            {item}
            <button onClick={() => removeItem(i)}>Remove</button>
          </li>
        ))}
      </ul>

      <p><b>Total Items:</b> {items.length}</p>
    </div>
  );
}
