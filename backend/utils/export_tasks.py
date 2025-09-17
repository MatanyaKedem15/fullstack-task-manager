import os, sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import csv
from models import db, Task
from app import app

with app.app_context():
    tasks = Task.query.all()
    with open("tasks_export.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["id", "title", "description", "done", "created_at"])
        writer.writeheader()
        for t in tasks:
            writer.writerow(t.to_dict())
print("Tasks exported to tasks_export.csv")
