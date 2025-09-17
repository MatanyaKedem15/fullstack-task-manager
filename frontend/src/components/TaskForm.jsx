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
    <form onSubmit={submit} className="row" style={{marginBottom:12}}>
      <input
        type="text"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        placeholder="Task title"
        required
        style={{flex:2}}
      />
      <input
        type="text"
        value={description}
        onChange={(e)=>setDesc(e.target.value)}
        placeholder="Description (optional)"
        style={{flex:3}}
      />
      <button type="submit">Add</button>
    </form>
  );
}
