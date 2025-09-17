# backend/tests/test_models.py
import os, sys; sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
import unittest
from models import Task

class TestModels(unittest.TestCase):
    def test_to_dict_fields(self):
        t = Task(title="Test", description="Desc")
        d = t.to_dict()
        self.assertIn("id", d)
        self.assertIn("title", d)
        self.assertIn("done", d)

if __name__ == "__main__":
    unittest.main()
