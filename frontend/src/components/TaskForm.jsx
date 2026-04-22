import { useRef, useState } from "react";
import "./tasks.css";

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const titleRef = useRef(null);

  async function submit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    await onCreate({
      title: title.trim(),
      description: description.trim(),
    });

    setTitle("");
    setDesc("");
    titleRef.current?.focus();
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      submit(e);
    }
  }

  return (
    <form onSubmit={submit} className="ob-form" aria-label="Add a new task">
      <div className="ob-form-fields">
        <div className="ob-field ob-field-title">
          <label className="ob-label" htmlFor="task-title">
            Task
          </label>
          <input
            id="task-title"
            ref={titleRef}
            type="text"
            className="ob-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What needs to be done?"
            autoComplete="off"
            maxLength={120}
            required
          />
        </div>

        <div className="ob-field ob-field-desc">
          <label className="ob-label" htmlFor="task-desc">
            Note
          </label>
          <input
            id="task-desc"
            type="text"
            className="ob-input"
            value={description}
            onChange={(e) => setDesc(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Optional details..."
            autoComplete="off"
            maxLength={200}
          />
        </div>
      </div>

      <button
        type="submit"
        className="ob-btn-add"
        disabled={!title.trim()}
        aria-label="Add task"
      >
        Add
      </button>
    </form>
  );
}
