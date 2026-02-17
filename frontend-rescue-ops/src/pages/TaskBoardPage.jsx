import BoardHeader from "../components/BoardHeader";
import TaskForm from "../components/TaskForm";
import Column from "../components/Column";
import useTasks from "../hooks/useTasks";
import "../styles/board.css";

export default function TaskBoardPage() {
  const {
    tasks,
    error,
    addTask,
    deleteTask,
    moveTask,
    canAddMore,
    maxTasks
  } = useTasks();

  const columns = [
    { key: "todo", title: "To Do" },
    { key: "doing", title: "Doing" },
    { key: "done", title: "Done" }
  ];

  return (
    <div className="page">
      <BoardHeader />

      <TaskForm
        onAdd={addTask}
        canAddMore={canAddMore}
        maxTasks={maxTasks}
        error={error}
      />

      <div className="board">
        {columns.map(col => (
          <Column
            key={col.key}
            title={col.title}
            status={col.key}
            tasks={tasks.filter(t => t.status === col.key)}
            onDelete={deleteTask}
            onMove={moveTask}
          />
        ))}
      </div>
    </div>
  );
}
