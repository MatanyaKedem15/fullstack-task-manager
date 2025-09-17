export default function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks.length) return <p style={{color:"#94a3b8"}}>No tasks yet. Add your first task!</p>;
  return (
    <ul className="list">
      {tasks.map(t => (
        <li key={t.id} className={`item ${t.done ? "done" : ""}`}>
          <input className="checkbox" type="checkbox" checked={t.done} onChange={()=>onToggle(t)} />
          <div style={{flex:1}}>
            <div className="item-title">{t.title}</div>
            {t.description ? <div className="item-desc">{t.description}</div> : null}
          </div>
          <div className="toolbar">
            <button className="danger" onClick={()=>onDelete(t.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
