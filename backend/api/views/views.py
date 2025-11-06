from ..logic import commande, panier, produit
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from ..models.models import Produit
from ..serializer.produit import ProduitSerializer


class DashboardViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for the merchant dashboard.
    """

    def list(self, request):
        # Logic to gather dashboard data
        data = {
            "total_sales": 1000,
            "total_orders": 150,
            "top_products": [
                {"id": 1, "name": "Product A", "sales": 300},
                {"id": 2, "name": "Product B", "sales": 200},
            ],
        }
        return Response(data)


class PanierViewSet(viewsets.ViewSet):
    def retrieve(self, request, pk=None):
        if request.user.is_authenticated:
            cart_data = panier.view_cart(request.user)
            return Response(cart_data)
        return Response({"produits_panier": [], "prix_total": 0.0})

    def update(self, request, product_id):
        if request.user.is_authenticated:
            panier.add_to_cart(request.user, product_id)
            return Response({"status": "product added to cart"})
        return Response({"status": "user not authenticated"}, status=401)

    def destroy(self, request, item_id):
        if request.user.is_authenticated:
            panier.remove_from_cart(request.user, item_id)
            return Response({"status": "product removed from cart"})
        return Response({"status": "user not authenticated"}, status=401)


class CommandeViewSet(viewsets.ViewSet):
    def list(self, request):
        if request.user.is_authenticated:
            orders_data = commande.view_orders(request.user)
            return Response(orders_data)
        return Response({})

    def create(self, request):
        if request.user.is_authenticated:
            commande.check_out_cart(request.user)
            return Response({"status": "checkout successful"})
        return Response({"status": "user not authenticated"}, status=401)


class ProduitViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """

    queryset = Produit.objects.all()
    serializer_class = ProduitSerializer
