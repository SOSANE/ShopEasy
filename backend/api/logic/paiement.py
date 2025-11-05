from ..models.models import Utilisateur


class SystèmePaiement:
    def traiter_paiement(self, utilisateur: Utilisateur, montant: int) -> bool:
        assert (
            utilisateur.is_authenticated
        ), "L'Utilisateur doit être authentifier pour faire un paiement."

        # Logique fictive de traitement du paiement
        return True
