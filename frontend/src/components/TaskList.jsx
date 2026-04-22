import "./tasks.css";

export default function TaskList({ tasks, onToggle, onDelete, onClearCompleted }) {
  const remaining = tasks.filter((t) => !t.done).length;
  const completedCount = tasks.filter((t) => t.done).length;
  const hasCompleted = completedCount > 0;

  if (!tasks.length) {
    return (
      <div className="ob-empty" role="status" aria-live="polite">
        <div className="ob-empty-ring" aria-hidden="true">
          <div className="ob-empty-ring-inner" />
        </div>
        <p className="ob-empty-title">No tasks yet</p>
        <p className="ob-empty-sub">Add something above to get started.</p>
      </div>
    );
  }

  return (
    <>
      <div className="ob-divider" aria-hidden="true" />

      <ul className="ob-list" aria-label="Task list" role="list">
        {tasks.map((t) => (
          <li
            key={t.id}
            className={`ob-item ${t.done ? "ob-item--done" : ""}`}
            aria-label={`Task: ${t.title}${t.done ? " (completed)" : ""}`}
          >
            <input
              className="ob-checkbox"
              type="checkbox"
              checked={t.done}
              onChange={() => onToggle(t)}
              aria-label={`Mark "${t.title}" as ${t.done ? "incomplete" : "complete"}`}
            />

            <div className="ob-item-body">
              <div className="ob-item-title">{t.title}</div>
              {t.description ? (
                <div className="ob-item-desc">{t.description}</div>
              ) : null}
            </div>

            <button
              type="button"
              className="ob-btn-delete"
              onClick={() => onDelete(t.id)}
              aria-label={`Delete task "${t.title}"`}
            >
              ×
            </button>
          </li>
        ))}
      </ul>

      <footer className="ob-footer">
        <span className="ob-footer-count">
          {remaining === 0 ? "All done" : `${remaining} remaining`}
        </span>

        <button
          type="button"
          className="ob-btn-clear"
          onClick={onClearCompleted}
          disabled={!hasCompleted}
          aria-label={`Clear ${completedCount} completed task${completedCount !== 1 ? "s" : ""}`}
        >
          Clear completed
        </button>
      </footer>
    </>
  );
}
