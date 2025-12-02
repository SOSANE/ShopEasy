from ..logic import commande, panier, produit
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from ..models.models import Produit, ProduitPanier
from ..serializer.produit import ProduitSerializer
from ..serializer.produit_panier import ProduitPanierSerializer
from rest_framework import serializers


class ProduitViewSet(viewsets.ModelViewSet):
    queryset = Produit.objects.all()
    serializer_class = ProduitSerializer


class PanierViewSet(viewsets.ViewSet):
    def list(self, request):
        if not request.user.is_authenticated:
            return Response({"produits_panier": [], "prix_total": 0.0})
        cart_data = panier.view_cart(request.user)
        return Response(cart_data)


class ProduitPanierViewSet(viewsets.ViewSet):
    serializer_class = ProduitPanierSerializer

    # Les PK utilisé sont les id de produit et non produitpanier

    def create(self, request):
        if not request.user.is_authenticated:
            return Response({"status": "user not authenticated"}, status=403)

        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid() and "produit" not in serializer.validated_data:
            return Response({"status": "serializer error"})

        produit = serializer.validated_data["produit"]
        quantité = serializer.validated_data["quantité"]

        panier.add_to_cart(request.user, produit, quantité)
        return Response({"status": "product added to cart"})

    def partial_update(self, request, pk=None):
        if not request.user.is_authenticated:
            return Response({"status": "user not authenticated"}, status=403)

        if pk is None:
            return Response({"status": "missing id"}, status=401)

        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            return Response({"status": "serializer error"}, status=401)

        quantité = serializer.validated_data["quantité"]

        panier.update_cart_item(request.user, pk, quantité)
        return Response({"status": "product quantity updated"})

    def destroy(self, request, pk=None):
        if not request.user.is_authenticated and pk is not None:
            return Response({"status": "user not authenticated"}, status=401)
        panier.remove_from_cart(request.user, pk)
        return Response({"status": "product removed from cart"})


class CommandeViewSet(viewsets.ViewSet):
    serializer_class = serializers.Serializer

    def list(self, request):
        if not request.user.is_authenticated:
            return Response({})

        orders_data = commande.view_orders(request.user)
        return Response(orders_data)

    def create(self, request):
        if not request.user.is_authenticated:
            return Response({"status": "user not authenticated"}, status=401)
        commande.check_out_cart(request.user)
        return Response({"status": "checkout successful"})


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
