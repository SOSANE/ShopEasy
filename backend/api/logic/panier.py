from ..models.models import Produit, Panier, ProduitPanier, Utilisateur
from .produit import augmente_stock, reduire_stock


def _prix_total_panier(produits_panier: list[ProduitPanier]) -> float:
    prix_total = sum(item.produit.prix * item.quantité for item in produits_panier)
    return prix_total


def _ajouté_quantité_produit_panier(cart_item: ProduitPanier, quantité: int):
    if cart_item.quantité > quantité:  # Le client veut une moindre quantité
        augmente_stock(cart_item.produit, quantité - cart_item.quantité)
    elif cart_item.quantité < quantité:  # Le client veut plus de produit
        reduire_stock(cart_item.produit, cart_item.quantité - quantité)
    else:
        # Equivalent a: `if cart_item.quantité == quantité`
        return

    cart_item.quantité = quantité


def view_cart(utilisateur: Utilisateur) -> dict:
    if not utilisateur.is_authenticated:
        return {"produits_panier": [], "prix_total": 0.0}

    client = getattr(utilisateur, "client_profile", None)
    assert (
        client is not None
    ), "Seulement un Clien peut ajouté un produit a sont panier."

    panier, _ = Panier.objects.get_or_create(client=utilisateur.client)
    produits_panier = ProduitPanier.objects.filter(panier=panier)
    prix_total = _prix_total_panier(produits_panier)
    return {"produits_panier": produits_panier, "prix_total": prix_total}


def add_to_cart(utilisateur: Utilisateur, produit: Produit, quantité: int) -> None:
    assert (
        utilisateur.is_authenticated
    ), "L'Utilisateur doit être authentifier pour ajouter un produit au panier."

    client = getattr(utilisateur, "client_profile", None)
    assert (
        client is not None
    ), "Seulement un Clien peut ajouté un produit a sont panier."

    panier, _ = Panier.objects.get_or_create(client=client)
    cart_item, _ = ProduitPanier.objects.get_or_create(produit=produit, panier=panier)
    _ajouté_quantité_produit_panier(cart_item, quantité)
    cart_item.save()


def remove_from_cart(utilisateur: Utilisateur, produit_id: int) -> None:
    assert (
        utilisateur.is_authenticated
    ), "L'Utilisateur doit être authentifier pour supprimer un produit du panier."

    produit = Produit.objects.get(id=produit_id)
    cart_item = ProduitPanier.objects.get(produit=produit)
    cart_item.delete()


def update_cart_item(utilisateur: Utilisateur, produit_id: int, quantité: int) -> None:
    assert (
        utilisateur.is_authenticated
    ), "L'Utilisateur doit être authentifier pour modifier un produit du panier."
    assert quantité >= 0, "La quantité doit être positive ou nulle."

    client = getattr(utilisateur, "client_profile", None)
    assert (
        client is not None
    ), "Seulement un Clien peut ajouté un produit a sont panier."

    produit = Produit.objects.get(id=produit_id)
    cart_item = ProduitPanier.objects.get(produit=produit)

    # Vérifier que l'élément appartient bien au panier de l'utilisateur
    if cart_item.panier.client != client:
        raise PermissionError("Cet élément du panier n'appartient pas à l'utilisateur.")

    if quantité == 0:
        cart_item.delete()
        return

    cart_item.quantité = quantité
    cart_item.save()
