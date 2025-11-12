from .views.views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"panier/produit", ProduitPanierViewSet, basename="produit_panier")
router.register(r"panier", PanierViewSet, basename="panier")
router.register(r"commande", CommandeViewSet, basename="commande")
router.register(r"produit", ProduitViewSet, basename="produit")
urlpatterns = router.urls
