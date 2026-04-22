import { useEffect, useState } from "react";
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

  useEffect(() => {
    load();
  }, []);

  async function createTask(payload) {
    const res = await fetch(`${API_BASE}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const created = await res.json();
    setTasks((ts) => [created, ...ts]);
  }

  async function toggleDone(task) {
    const res = await fetch(`${API_BASE}/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !task.done }),
    });
    const updated = await res.json();
    setTasks((ts) => ts.map((t) => (t.id === updated.id ? updated : t)));
  }

  async function deleteTask(id) {
    await fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" });
    setTasks((ts) => ts.filter((t) => t.id !== id));
  }

  async function clearCompleted() {
    const completed = tasks.filter((t) => t.done);

    await Promise.all(
      completed.map((task) =>
        fetch(`${API_BASE}/tasks/${task.id}`, { method: "DELETE" })
      )
    );

    setTasks((ts) => ts.filter((t) => !t.done));
  }

  const remaining = tasks.filter((t) => !t.done).length;

  return (
    <h1 className="ob-title">
  <span className="ob-title-icon" aria-hidden="true">
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
  TaskFlow
</h1>

          <span className="ob-badge" aria-label={`${tasks.length} total tasks`}>
            {tasks.length === 0
              ? "No tasks"
              : `${tasks.length} task${tasks.length !== 1 ? "s" : ""}`}
          </span>
        </div>
      </header>

      <main className="ob-main">
        <div className="ob-wrap">
          <TaskForm onCreate={createTask} />

          {loading ? (
            <div className="ob-empty" role="status" aria-live="polite">
              <div className="ob-empty-ring" aria-hidden="true">
                <div className="ob-empty-ring-inner" />
              </div>
              <p className="ob-empty-title">Loading…</p>
              <p className="ob-empty-sub">Fetching your tasks.</p>
            </div>
          ) : (
            <TaskList
              tasks={tasks}
              onToggle={toggleDone}
              onDelete={deleteTask}
              onClearCompleted={clearCompleted}
            />
          )}
        </div>
      </main>
    </div>
  );
}
