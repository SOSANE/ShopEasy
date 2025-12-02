import django_filters
from api.models.models import Produit


class ProductFilter(django_filters.FilterSet):
    """
    Permet de filtrer les produits selon :
    - un intervalle de prix (prix_min, prix_max)
    - une recherche partielle sur le titre
    """

    prix_min = django_filters.NumberFilter(field_name="prix", lookup_expr="gte")
    prix_max = django_filters.NumberFilter(field_name="prix", lookup_expr="lte")
    titre = django_filters.CharFilter(field_name="titre", lookup_expr="icontains")

    class Meta:
        model = Produit
        fields = ["titre"]
