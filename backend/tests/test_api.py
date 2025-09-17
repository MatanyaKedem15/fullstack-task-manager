import os, sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import unittest
from app import app

class TestAPI(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_health(self):
        res = self.client.get("/health")
        self.assertEqual(res.status_code, 200)
        self.assertIn("status", res.get_json())

    def test_create_and_list_task(self):
        res = self.client.post("/tasks", json={"title": "Test", "description": "From test"})
        self.assertEqual(res.status_code, 201)
        task_id = res.get_json()["id"]

        res = self.client.get("/tasks")
        self.assertEqual(res.status_code, 200)
        tasks = res.get_json()
        self.assertTrue(any(t["id"] == task_id for t in tasks))

if __name__ == "__main__":
    unittest.main()
