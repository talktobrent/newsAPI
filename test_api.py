from unittest import TestCase
from api import app

class TestCustomerHistory(TestCase):

    def test_customer_history(self):
        """
        Tests to ensure we receive a correct response from the api
        """
        with app.test_client() as api:
            response = api.get('/api/tesla')
            json_data = response.get_json()
            self.assertIsInstance(json_data, list)
            self.assertGreater(len(json_data), 0)