import requests

BASE = "http://127.0.0.1:5000"

def list_tasks():
    r = requests.get(f"{BASE}/tasks")
    print(r.json())

def create_task(title, description=""):
    r = requests.post(f"{BASE}/tasks", json={"title": title, "description": description})
    print(r.json())

if __name__ == "__main__":
    create_task("Test from script", "added via api_client.py")
    list_tasks()
