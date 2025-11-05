from ..models.models import Produit, Marchand, Utilisateur
from django.core.mail import send_mail
from ...config.settings.base import DEFAULT_FROM_EMAIL


def create_produit(
    utilisateur: Utilisateur, titre: str, description: str, prix: float
) -> Produit:
    utilisateur.is_authenticated, "L'Utilisateur doit être authentifier pour créer un produit."
    marchand = getattr(utilisateur, "marchand_profile", None)

    assert marchand is not None, "Seulement un Marchand peut créer un produit."

    produit = Produit.objects.create(
        marchand=marchand,
        titre=titre,
        description=description,
        prix=prix,
    )
    return produit


def delete_produit(utilisateur: Utilisateur, produit_id: int) -> bool:
    utilisateur.is_authenticated, "L'Utilisateur doit être authentifier pour créer un produit."
    marchand = getattr(utilisateur, "marchand_profile", None)

    assert marchand is not None, "Seulement un Marchand peut supprimer un produit."

    try:
        produit = Produit.objects.get(id=produit_id)
        produit.delete()
        return True
    except Produit.DoesNotExist:
        return False


def _augmente_stock(produit: Produit, quantité: int) -> None:
    produit.stock += quantité
    produit.save()


def _reduire_stock(produit: Produit, quantité: int) -> None:
    if produit.stock >= quantité:
        produit.stock -= quantité
        produit.save()
        if produit.stock == 0:
            # envoyer notification au marchand
            send_mail(
                "Stock épuisé pour le produit {}".format(produit.titre),
                "Votre produit '{}' est en rupture de stock.".format(produit.titre),
                DEFAULT_FROM_EMAIL,
                [produit.marchand.utilisateur.email],
                fail_silently=False,
            )
            pass
    else:
        raise ValueError("Stock insuffisant pour le produit {}".format(produit.titre))
