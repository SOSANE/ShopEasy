from ..models.models import Panier, ProduitPanier, Commande, ItemCommande, Utilisateur
from .produit import _reduire_stock
from .paiement import SystèmePaiement
from .panier import _prix_total_panier


def check_out_cart(utilisateur: Utilisateur) -> None:
    assert (
        utilisateur.is_authenticated
    ), "L'Utilisateur doit être authentifier pour faire une commande."

    panier = Panier.objects.get(client=utilisateur.client)
    produits_panier = ProduitPanier.objects.filter(panier=panier)

    if not SystèmePaiement().traiter_paiement(
        utilisateur, _prix_total_panier(produits_panier)
    ):
        raise ValueError("Le paiement a échoué.")

    # Logic to process the checkout
    commande = Commande.objects.create(client=utilisateur.client)
    for item in produits_panier:
        ItemCommande.objects.create(
            commande=commande,
            produit=item.produit,
            quantité=item.quantité,
        )
        _reduire_stock(item.produit, item.quantité)

    panier.produits.clear()


def view_orders(utilisateur: Utilisateur) -> dict:
    assert (
        utilisateur.is_authenticated
    ), "L'Utilisateur doit être authentifier pour voir ses commandes."

    commandes = Commande.objects.filter(client=utilisateur.client).order_by(
        "-timestamp"
    )
    commandes_items = {}
    for commande in commandes:
        items = ItemCommande.objects.filter(commande=commande)
        commandes_items[commande.id] = items
    return commandes_items
