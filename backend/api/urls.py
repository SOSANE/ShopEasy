from django.urls import path
from .views.views import *

urlpatterns = [
    path("cart/", cart_view, name="view_cart"),
    path("cart/add/<int:product_id>/", add_product_to_cart, name="add_to_cart"),
    path(
        "cart/remove/<int:item_id>/", remove_product_from_cart, name="remove_from_cart"
    ),
    path("checkout/", checkout_cart, name="checkout"),
    path("orders/", orders_view, name="view_orders"),
]
