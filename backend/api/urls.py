# from django.urls import path
# from .views.views import *

# urlpatterns = [
#     path("cart/", cart_view, name="view_cart"),
#     path("cart/add/<int:product_id>/", add_product_to_cart, name="add_to_cart"),
#     path(
#         "cart/remove/<int:item_id>/", remove_product_from_cart, name="remove_from_cart"
#     ),
#     path("checkout/", checkout_cart, name="checkout"),
#     path("orders/", orders_view, name="view_orders"),
# ]

from .views.views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"panier", PanierViewSet, basename="panier")
router.register(r"commande", CommandeViewSet, basename="commande")
router.register(r"produit", ProduitViewSet, basename="produit")
urlpatterns = router.urls
