from ..models.models import Produit, Panier, ProduitPanier, Utilisateur


def _prix_total_panier(produits_panier: list[ProduitPanier]) -> float:
    prix_total = sum(item.produit.prix * item.quantité for item in produits_panier)
    return prix_total


def view_cart(utilisateur: Utilisateur) -> dict:
    if not utilisateur.is_authenticated:
        return {"produits_panier": [], "prix_total": 0.0}

    panier = Panier.objects.get(client=utilisateur.client)
    produits_panier = ProduitPanier.objects.filter(panier=panier)
    prix_total = _prix_total_panier(produits_panier)
    return {"produits_panier": produits_panier, "prix_total": prix_total}


def add_to_cart(utilisateur: Utilisateur, product_id: int) -> None:
    assert (
        utilisateur.is_authenticated
    ), "L'Utilisateur doit être authentifier pour ajouter un produit au panier."

    product = Produit.objects.get(id=product_id)
    cart_item, created = ProduitPanier.objects.get_or_create(
        product=product, user=utilisateur
    )
    cart_item.quantity += 1
    cart_item.save()


def remove_from_cart(utilisateur: Utilisateur, item_id: int) -> None:
    assert (
        utilisateur.is_authenticated
    ), "L'Utilisateur doit être authentifier pour supprimer un produit du panier."

    cart_item = ProduitPanier.objects.get(id=item_id)
    cart_item.delete()
