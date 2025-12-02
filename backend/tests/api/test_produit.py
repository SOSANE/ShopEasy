from rest_framework.test import APITestCase, APIClient
from api.models import models as m


class ProduitTest(APITestCase):
    def setUp(self):
        self.api_client = APIClient()
        self.marchand_user = m.Utilisateur.objects.create_user(
            username="marchand", password="pw", email="marchard@localhost"
        )
        self.marchand = m.Marchand.objects.create(utilisateur=self.marchand_user)

        self.produit_1 = m.Produit.objects.create(
            marchand=self.marchand,
            titre="Test produit",
            description="desc",
            prix=10.00,
            stock=5,
        )

        self.produit_2 = m.Produit.objects.create(
            marchand=self.marchand,
            titre="Test produitn 2",
            description="desc",
            prix=20.00,
            stock=2,
        )

    def test_list_produits(self):
        self.api_client.force_authenticate(user=None)
        resp = self.api_client.get("/api/produit/")
        self.assertEqual(resp.status_code, 200)

        for produit_res, produit_vrais in zip(
            resp.json(), [self.produit_1, self.produit_2]
        ):
            self.assertEqual(
                produit_res["marchand"], produit_vrais.marchand.utilisateur.id
            )
            self.assertEqual(produit_res["titre"], produit_vrais.titre)
            self.assertEqual(produit_res["description"], produit_vrais.description)
            self.assertEqual(float(produit_res["prix"]), produit_vrais.prix)
            self.assertEqual(float(produit_res["stock"]), produit_vrais.stock)

    def test_retrieve_produit_detail(self):
        self.api_client.force_authenticate(user=None)
        resp = self.api_client.get(f"/api/produit/{self.produit_1.id}/")
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertEqual(data.get("titre"), self.produit_1.titre)
        self.assertEqual(float(data.get("prix")), float(self.produit_1.prix))
