# backend/tests/test_models.py
import unittest
from models import Task

class TestTaskModel(unittest.TestCase):
    def test_to_dict_has_keys(self):
        t = Task(title="Sample", description="Desc")
        d = t.to_dict()
        for key in ("id", "title", "description", "done", "created_at"):
            self.assertIn(key, d)

if __name__ == "__main__":
    unittest.main()
