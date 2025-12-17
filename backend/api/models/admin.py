from django.contrib import admin
from .models import (
    Utilisateur,
    Client,
    Marchand,
    Adresse,
    Catégorie,
    Produit,
    Panier,
    ProduitPanier,
    Image,
)

admin.site.register(Utilisateur)
admin.site.register(Client)
admin.site.register(Marchand)
admin.site.register(Adresse)
admin.site.register(Catégorie)
admin.site.register(Produit)
admin.site.register(Panier)
admin.site.register(ProduitPanier)
admin.site.register(Image)
