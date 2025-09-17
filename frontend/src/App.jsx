import { useEffect, useState, useMemo } from "react";
import { API_BASE } from "./config";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch(`${API_BASE}/tasks`);
    const data = await res.json();
    setTasks(data);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function createTask(payload) {
    const res = await fetch(`${API_BASE}/tasks`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const created = await res.json();
    setTasks(ts => [created, ...ts]);
  }
  async function toggleDone(task) {
    const res = await fetch(`${API_BASE}/tasks/${task.id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !task.done }),
    });
    const updated = await res.json();
    setTasks(ts => ts.map(t => t.id === updated.id ? updated : t));
  }
  async function deleteTask(id) {
    await fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" });
    setTasks(ts => ts.filter(t => t.id !== id));
  }

  const doneCount = useMemo(() => tasks.filter(t => t.done).length, [tasks]);

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1 className="title">🗂️ Task Manager</h1>
          <span className="badge">{doneCount}/{tasks.length} done</span>
        </div>

        <TaskForm onCreate={createTask} />

        <hr />
        {loading ? <p style={{color:"#94a3b8"}}>Loading…</p> :
          <TaskList tasks={tasks} onToggle={toggleDone} onDelete={deleteTask} />}

        <div className="footer">
          <span>Flask API · SQLite</span>
          <button className="secondary" onClick={load}>Refresh</button>
        </div>
      </div>
    </div>
  );
}
