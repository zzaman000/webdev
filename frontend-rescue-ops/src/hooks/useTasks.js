import { useMemo, useState } from "react";
import { makeId } from "../utils/id";
import { validateTaskTitle, normalizeTitle } from "../utils/validate";

const MAX_TASKS = 20;

export default function useTasks() {
  const [tasks, setTasks] = useState([
    { id: "t1", title: "Set up project structure", status: "todo", priority: "Med" },
    { id: "t2", title: "Fix warnings and keys", status: "doing", priority: "High" },
    { id: "t3", title: "Write DEBUG_NOTES.md", status: "done", priority: "Low" }
  ]);

  const [error, setError] = useState("");

  const maxTasks = MAX_TASKS;
  const canAddMore = tasks.length < MAX_TASKS;

  const titlesSet = useMemo(() => {
    return new Set(tasks.map(t => normalizeTitle(t.title)));
  }, [tasks]);

  function addTask({ title, priority }) {
    setError("");

    if (!canAddMore) {
      setError(`Task limit reached (${MAX_TASKS}). Delete something first.`);
      return false;
    }

    const v = validateTaskTitle(title);
    if (!v.ok) {
      setError(v.message);
      return false;
    }

    const normalized = normalizeTitle(title);
    if (titlesSet.has(normalized)) {
      setError("Duplicate title. Use a unique task title.");
      return false;
    }

    const newTask = {
      id: makeId(),
      title: title.trim(),
      status: "todo",
      priority
    };

    setTasks(prev => [newTask, ...prev]);
    return true;
  }

  function deleteTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const ok = window.confirm(`Delete "${task.title}"?`);
    if (!ok) return;

    setTasks(prev => prev.filter(t => t.id !== id));
  }

  function moveTask(id, nextStatus) {
    setError("");

    setTasks(prev =>
      prev.map(t => {
        if (t.id !== id) return t;
        if (t.status === nextStatus) return t; // disable move to same
        return { ...t, status: nextStatus };
      })
    );
  }

  return {
    tasks,
    error,
    addTask,
    deleteTask,
    moveTask,
    canAddMore,
    maxTasks
  };
}
