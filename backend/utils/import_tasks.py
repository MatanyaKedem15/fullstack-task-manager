import os, sys; sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
import csv
from app import app
from models import db, Task

with app.app_context():
    with open("tasks_import.csv", newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            task = Task(title=row["title"], description=row.get("description",""))
            db.session.add(task)
        db.session.commit()
print("Imported tasks from tasks_import.csv")
