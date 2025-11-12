from rest_framework import serializers
from ..models.models import ProduitPanier


class ProduitPanierSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProduitPanier
        fields = ["produit", "quantité"]
        extra_kwargs = {
            "produit": {"required": False, "allow_null": True},
        }
