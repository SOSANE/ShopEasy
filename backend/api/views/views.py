from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from api.filters import ProductFilter
from ..models.models import Produit
from api.serializers import ProduitSerializer


class ProduitSearchView(generics.ListAPIView):
    """
    Vue API permettant :
    - la recherche (titre, description)
    - le filtrage (prix_min, prix_max via ProductFilter)
    - le tri (par prix, titre, stock)
    """

    queryset = Produit.objects.all()
    serializer_class = ProduitSerializer

    # Filtres et recherche
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_class = ProductFilter

    # Recherche textuelle
    search_fields = ["titre", "description"]

    # Tri
    ordering_fields = ["prix", "titre", "stock"]
    ordering = ["titre"]
