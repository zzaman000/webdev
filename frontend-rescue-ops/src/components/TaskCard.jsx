import "../styles/card.css";

export default function TaskCard({ task, onDelete, onMove, columnStatus }) {
  return (
    <div className={`card priority-${task.priority.toLowerCase()}`}>
      <div className="cardTop">
        <h3 className="cardTitle">{task.title}</h3>
        <span className="pill">{task.priority}</span>
      </div>

      <div className="actions">
        <button
          className="btnSmall"
          onClick={() => onMove(task.id, "todo")}
          disabled={columnStatus === "todo"}
          title={columnStatus === "todo" ? "Already in To Do" : "Move to To Do"}
        >
          To Do
        </button>

        <button
          className="btnSmall"
          onClick={() => onMove(task.id, "doing")}
          disabled={columnStatus === "doing"}
          title={columnStatus === "doing" ? "Already in Doing" : "Move to Doing"}
        >
          Doing
        </button>

        <button
          className="btnSmall"
          onClick={() => onMove(task.id, "done")}
          disabled={columnStatus === "done"}
          title={columnStatus === "done" ? "Already in Done" : "Move to Done"}
        >
          Done
        </button>

        <button className="btnDanger" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
