import os, sys; sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
import click
from app import app
from models import db, Task

@click.group()
def cli(): pass

@cli.command()
@click.argument("title")
@click.option("--desc", default="", help="Task description")
def add(title, desc):
    with app.app_context():
        task = Task(title=title, description=desc)
        db.session.add(task); db.session.commit()
        click.echo(f"Added task: {task.id} {task.title}")

@cli.command()
def list():
    with app.app_context():
        tasks = Task.query.all()
        for t in tasks:
            status = "✓" if t.done else "✗"
            click.echo(f"[{status}] {t.id}: {t.title}")

if __name__ == "__main__":
    cli()
