export function validateTaskTitle(title) {
  if (!title || !title.trim()) {
    return { ok: false, message: "Task title cannot be empty." };
  }
  if (title.trim().length < 2) {
    return { ok: false, message: "Task title must be at least 2 characters." };
  }
  return { ok: true, message: "" };
}

export function normalizeTitle(title) {
  return (title || "").trim().toLowerCase();
}
