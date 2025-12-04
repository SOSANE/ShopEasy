from rest_framework.test import APITestCase, APIClient
from unittest.mock import patch

from api.logic.commande import check_out_cart, view_orders
from api.models import models as m


class CommandeTest(APITestCase):
    def setUp(self):
        self.api_client = APIClient()

        self.user = m.Utilisateur.objects.create_user(
            username="client", password="pw", is_staff=False
        )
        self.client_profile = m.Client.objects.get(utilisateur=self.user)

        self.marchand_user = m.Utilisateur.objects.create_user(
            username="marchand",
            password="pw",
            email="marchard@localhost",
            is_staff=True,
        )
        self.marchand = m.Marchand.objects.get(utilisateur=self.marchand_user)

        self.produit = m.Produit.objects.create(
            marchand=self.marchand,
            titre="Test produit",
            description="desc",
            prix=10.00,
            stock=5,
        )

        self.panier = m.Panier.objects.create(client=self.client_profile)
        m.ProduitPanier.objects.create(
            panier=self.panier, produit=self.produit, quantité=2
        )

    def test_check_out_cart_success_creates_commande_and_clears_cart(self):
        check_out_cart(self.user)

        # Commande créée
        commandes = m.Commande.objects.filter(client=self.client_profile)
        self.assertTrue(commandes.exists())
        commande = commandes.first()

        # item créé avec la quantité correcte et le prix stocké
        items = m.ItemCommande.objects.filter(commande=commande)
        self.assertEqual(items.count(), 1)
        item = items.first()
        self.assertEqual(item.quantité, 2)
        self.assertEqual(item.prix, self.produit.prix)

        # réduction de stock de 2, donc stock final doit être 3
        produit = m.Produit.objects.get(id=self.produit.id)
        self.assertEqual(produit.stock, 3)

        # panier cleared
        self.assertFalse(m.ProduitPanier.objects.filter(panier=self.panier).exists())

    def test_check_out_empty_cart_failure_raises(self):
        check_out_cart(self.user)

        # s'assurer qu'il n'y a pas d'items dans le panier
        self.assertFalse(m.ProduitPanier.objects.filter(panier=self.panier).exists())
        with self.assertRaises(ValueError):
            check_out_cart(self.user)

    def test_view_orders_returns_items(self):
        # créer une commande et un item
        commande = m.Commande.objects.create(client=self.client_profile)
        m.ItemCommande.objects.create(
            commande=commande, produit=self.produit, quantité=1, prix=self.produit.prix
        )

        commandes_items = view_orders(self.user)
        self.assertIn(commande.id, commandes_items)
        qs = commandes_items[commande.id]
        self.assertEqual(qs.count(), 1)

    @patch("api.logic.produit._notification_email_rupture_de_stock")
    def test_notification_email_pour_rupture_de_stock(self, mock_notification):
        autre_produit = m.Produit.objects.create(
            marchand=self.marchand,
            titre="Test produit 2",
            description="desc",
            prix=10.00,
            stock=5,
        )
        m.ProduitPanier.objects.create(
            panier=self.panier, produit=autre_produit, quantité=5
        )
        check_out_cart(self.user)

        mock_notification.assert_called_once_with(autre_produit)
