from django.test import TestCase, override_settings
from rest_framework.test import APITestCase
from tests.api.tests import run_test
from tests.api.test_commande import CommandeTest
from tests.api.test_produit import ProduitTest


# Insertion des Unit tests
class BackendTest(APITestCase):
    def test_run_test(self):
        run_test(self)


# Insertion des tests de la commande
class CommandeTests(CommandeTest):
    pass


class ProduitTests(ProduitTest):
    pass
