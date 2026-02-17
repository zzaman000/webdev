import { useState } from "react";
import "../styles/form.css";

export default function TaskForm({ onAdd, canAddMore, maxTasks, error }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");

  function handleSubmit(e) {
    e.preventDefault();

    const ok = onAdd({ title, priority });
    if (ok) {
      setTitle("");
      setPriority("Low");
    }
  }

  return (
    <section className="formWrap">
      <h2 className="sectionTitle">Add Task</h2>

      <form className="form" onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Task title..."
          className="input"
        />

        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          className="select"
        >
          <option>Low</option>
          <option>Med</option>
          <option>High</option>
        </select>

        <button className="btn" type="submit" disabled={!canAddMore}>
          Add
        </button>
      </form>

      {!canAddMore && (
        <p className="warn">Max tasks reached ({maxTasks}).</p>
      )}

      {error && <p className="error">{error}</p>}
    </section>
  );
}
