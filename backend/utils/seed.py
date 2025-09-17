# backend/utils/seed.py
import requests

API = "http://127.0.0.1:5000"

TASKS = [
    {"title": "Shopping", "description": "Buy milk & bread"},
    {"title": "Laundry", "description": "Wash white clothes"},
    {"title": "Gym", "description": "20-min workout"},
    {"title": "Call", "description": "Dentist appointment"},
    {"title": "Dinner", "description": "Cook pasta tonight"},
    {"title": "Netflix", "description": "Watch new episode"},
]

def main():
    for t in TASKS:
        r = requests.post(f"{API}/tasks", json=t, timeout=5)
        r.raise_for_status()
        print("Created:", r.json())

if __name__ == "__main__":
    main()
