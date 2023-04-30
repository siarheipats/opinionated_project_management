#!/usr/bin/python3
import unittest
from unittest import TestCase
import requests  # pip install requests


class IntegrationTests(TestCase):
    def test_status_codes_200(self):
        result = requests.get("http://localhost:4000/api/")
        assert result.status_code == 200

    def test_status_codes_400(self):
        result = requests.get(
            "http://localhost:4000/api/",
            headers={"should_error": "error"},
        )
        assert result.status_code == 400

    def test_status_codes_404(self):
        result = requests.get("http://localhost:4000/does_not_exist/")
        assert result.status_code == 404


if __name__ == "__main__":
    unittest.main()