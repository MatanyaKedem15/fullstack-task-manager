import { useState } from "react";

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");

  async function submit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    await onCreate({ title: title.trim(), description: description.trim() });
    setTitle(""); setDesc("");
  }

 return (
  <form onSubmit={submit} className="task-form">
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Task title"
      required
    />
    <input
      type="text"
      value={description}
      onChange={(e) => setDesc(e.target.value)}
      placeholder="Description (optional)"
    />
    <button type="submit" className="btn-primary">Add</button>
  </form>
);
}
