from django.test import TestCase, override_settings
from rest_framework.test import APITestCase
from tests.api.tests import run_test


# Insertion des Unit tests
class BackendTest(APITestCase):
    def test_run_test(self):
        run_test(self)
