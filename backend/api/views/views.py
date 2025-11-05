from django.http import JsonResponse, HttpRequest, HttpResponse
from ..logic import commande, panier, produit


async def cart_view(request: HttpRequest):
    if request.user.is_authenticated and request.method == "GET":
        return JsonResponse(panier.view_cart(request.user))
    return HttpResponse(status=200)


async def add_product_to_cart(request: HttpRequest, product_id):
    if request.user.is_authenticated and request.method == "POST":
        panier.add_to_cart(request.user, product_id)
    return HttpResponse(status=200)


async def remove_product_from_cart(request: HttpRequest, item_id):
    if request.user.is_authenticated and request.method == "POST":
        panier.remove_from_cart(request.user, item_id)
    return HttpResponse(status=200)


async def checkout_cart(request: HttpRequest):
    if request.user.is_authenticated and request.method == "POST":
        commande.check_out_cart(request.user)
    return HttpResponse(status=200)


async def orders_view(request: HttpRequest):
    if request.user.is_authenticated and request.method == "GET":
        return JsonResponse(commande.view_orders(request.user))
    return HttpResponse(status=200)
