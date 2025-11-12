from rest_framework.test import APITestCase, APIClient
from api.models import models as m


class ProduitPanierTest(APITestCase):
    def setUp(self):
        self.api_client = APIClient()
        self.user = m.Utilisateur.objects.create_user(username="client", password="pw")
        self.client_profile = m.Client.objects.create(utilisateur=self.user)
        self.panier, _ = m.Panier.objects.get_or_create(client=self.client_profile)

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

    def test_ajouté_produit_au_panier(self):
        self.api_client.force_authenticate(user=self.user)
        resp = self.api_client.post(
            "/api/panier/produit/",
            {
                "produit": self.produit_1.id,
                "quantité": 1,
            },
            format="json",
        )
        self.assertIn(resp.status_code, (200, 201, 204))
        pp = m.ProduitPanier.objects.filter(
            panier=self.panier, produit=self.produit_1
        ).first()
        self.assertIsNotNone(pp)
        if hasattr(pp, "quantité"):
            self.assertEqual(pp.quantité, 1)

    def test_ajouté_produit_déjà_dans_panier_incrémente_quantité(self):
        self.api_client.force_authenticate(user=self.user)
        nouvelle_quantité = 3

        resp1 = self.api_client.post(
            "/api/panier/produit/",
            {
                "produit": self.produit_1.id,
                "quantité": 1,
            },
            format="json",
        )
        self.assertIn(resp1.status_code, (200, 201, 204))
        resp2 = self.api_client.patch(
            f"/api/panier/produit/{self.produit_1.id}/",
            {
                "quantité": nouvelle_quantité,
            },
            format="json",
        )
        self.assertIn(resp2.status_code, (200, 201, 204))
        pp = m.ProduitPanier.objects.filter(
            panier=self.panier, produit=self.produit_1
        ).first()
        self.assertIsNotNone(pp)
        if hasattr(pp, "quantité"):
            self.assertGreaterEqual(pp.quantité, nouvelle_quantité)

    def test_ajouté_produit_requires_authentication(self):
        # sans authentication
        resp = self.api_client.post(
            "/api/panier/produit/",
            {
                "produit": self.produit_2.id,
                "quantité": 1,
            },
            format="json",
        )
        self.assertIn(resp.status_code, (401, 403))

    def test_ajouté_modifier_et_remove_produit_au_panier(self):
        self.api_client.force_authenticate(user=self.user)
        nouvelle_quantité = 3

        resp1 = self.api_client.post(
            "/api/panier/produit/",
            {
                "produit": self.produit_1.id,
                "quantité": 1,
            },
            format="json",
        )
        self.assertIn(resp1.status_code, (200, 201, 204))
        resp2 = self.api_client.patch(
            f"/api/panier/produit/{self.produit_1.id}/",
            {
                "quantité": nouvelle_quantité,
            },
            format="json",
        )
        self.assertIn(resp2.status_code, (200, 201, 204))
        pp = m.ProduitPanier.objects.filter(
            panier=self.panier, produit=self.produit_1
        ).first()
        self.assertIsNotNone(pp)
        if hasattr(pp, "quantité"):
            self.assertGreaterEqual(pp.quantité, nouvelle_quantité)

        resp3 = self.api_client.delete(
            f"/api/panier/produit/{self.produit_1.id}/",
            {},
            format="json",
        )
        self.assertIn(resp3.status_code, (200, 201, 204))

        still_exists = m.ProduitPanier.objects.filter(
            panier=self.panier, produit=self.produit_1
        ).exists()

        self.assertIs(still_exists, False)
