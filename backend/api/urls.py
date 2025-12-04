from .views.views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"panier/produit", ProduitPanierViewSet, basename="produit_panier")
router.register(r"panier", PanierViewSet, basename="panier")
router.register(r"commande", CommandeViewSet, basename="commande")
router.register(r"produit", ProduitViewSet, basename="produit")
router.register(r"categorie", CategorieViewSet, basename="categorie")
urlpatterns = router.urls
from api.views.produit import ProduitSearchView

urlpatterns = [
    path("produits/search/", ProduitSearchView.as_view(), name="produit-search"),
]
