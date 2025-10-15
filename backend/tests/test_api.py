# backend/tests/test_api.py
import os, sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from models import Task

def _create(client, title="Task A", description="Desc"):
    res = client.post("/tasks", json={"title": title, "description": description})
    assert res.status_code == 201
    return res.get_json()

def test_health_ok(client):
    res = client.get("/health")
    assert res.status_code == 200
    assert res.get_json().get("status") == "ok"

def test_create_and_list_task(client):
    res = client.post("/tasks", json={"title": "Test", "description": "From test"})
    assert res.status_code == 201
    res = client.get("/tasks")
    assert res.status_code == 200
    data = res.get_json()
    assert len(data) == 1
    assert data[0]["title"] == "Test"

def test_list_initial_empty(client):
    res = client.get("/tasks")
    assert res.status_code == 200
    assert res.get_json() == []

def test_create_task_minimal(client):
    t = _create(client, title="Buy milk", description="2%")
    assert t["id"] > 0
    assert t["title"] == "Buy milk"
    assert t["description"] == "2%"
    assert t["done"] is False
    assert "created_at" in t

def test_create_requires_title(client):
    res = client.post("/tasks", json={"title": "   ", "description": "no title"})
    assert res.status_code == 400
    assert "error" in res.get_json()

def test_list_orders_by_created_desc(client):
    _create(client, "A")
    _create(client, "B")
    _create(client, "C")
    res = client.get("/tasks")
    ids = [t["title"] for t in res.get_json()]
    assert ids == ["C", "B", "A"]

def test_update_title_desc_done(client):
    t = _create(client, "Wash", "white")
    tid = t["id"]
    res = client.put(f"/tasks/{tid}", json={"title": "Wash clothes", "description": "white + colors"})
    assert res.status_code == 200
    updated = res.get_json()
    assert updated["title"] == "Wash clothes"
    assert updated["description"] == "white + colors"
    assert updated["done"] is False

    res = client.put(f"/tasks/{tid}", json={"done": True})
    assert res.status_code == 200
    assert res.get_json()["done"] is True

def test_update_trim_input(client):
    t = _create(client, " A ", "  x  ")
    tid = t["id"]
    res = client.put(f"/tasks/{tid}", json={"title": "   B   ", "description": "   y   "})
    assert res.status_code == 200
    u = res.get_json()
    assert u["title"] == "B"
    assert u["description"] == "y"

def test_update_not_found(client):
    res = client.put("/tasks/999999", json={"title": "Nope"})
    assert res.status_code == 404

def test_delete_task(client):
    t = _create(client, "Temp")
    tid = t["id"]
    res = client.delete(f"/tasks/{tid}")
    assert res.status_code == 200
    res = client.get("/tasks")
    titles = [x["title"] for x in res.get_json()]
    assert "Temp" not in titles

def test_delete_not_found(client):
    res = client.delete("/tasks/424242")
    assert res.status_code == 404
