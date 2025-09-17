from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Task

app = Flask(__name__)
CORS(app)

# חיבור ל-SQLite
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///tasks.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

# ---- Routes (CRUD) ----
@app.get("/tasks")
def list_tasks():
    tasks = Task.query.order_by(Task.created_at.desc()).all()
    return jsonify([t.to_dict() for t in tasks])

@app.post("/tasks")
def create_task():
    data = request.get_json(force=True)
    title = (data.get("title") or "").strip()
    description = (data.get("description") or "").strip()
    if not title:
        return jsonify({"error": "title is required"}), 400
    task = Task(title=title, description=description)
    db.session.add(task)
    db.session.commit()
    return jsonify(task.to_dict()), 201

@app.put("/tasks/<int:task_id>")
def update_task(task_id):
    task = Task.query.get_or_404(task_id)
    data = request.get_json(force=True)
    if "title" in data:
        task.title = (data["title"] or "").strip() or task.title
    if "description" in data:
        task.description = (data["description"] or "").strip()
    if "done" in data:
        task.done = bool(data["done"])
    db.session.commit()
    return jsonify(task.to_dict())

@app.delete("/tasks/<int:task_id>")
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({"ok": True})

@app.get("/health")
def health():
    return {"status": "ok"}

# ---- Init DB once & run ----
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    print("Database initialized. Server is starting...")
    app.run(debug=True)
