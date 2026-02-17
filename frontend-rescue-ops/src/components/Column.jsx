import TaskCard from "./TaskCard";

export default function Column({ title, status, tasks, onDelete, onMove }) {
  return (
    <div className="column">
      <h2 className="columnTitle">{title}</h2>

      {tasks.length === 0 ? (
        <p className="empty">No tasks here.</p>
      ) : (
        tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
            onMove={onMove}
            columnStatus={status}
          />
        ))
      )}
    </div>
  );
}
