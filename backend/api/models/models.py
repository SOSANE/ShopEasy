from django.db import models
from django.contrib.auth.models import AbstractUser
from minio_storage.storage import MinioMediaStorage


class Utilisateur(AbstractUser):
    # https://docs.djangoproject.com/en/5.2/ref/contrib/auth/
    pass


class Client(models.Model):
    utilisateur = models.OneToOneField(
        Utilisateur,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name="client_profile",
    )


class Marchand(models.Model):
    utilisateur = models.OneToOneField(
        Utilisateur,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name="marchand_profile",
    )


class Adresse(models.Model):
    client = models.ForeignKey(
        Client, on_delete=models.CASCADE, related_name="adresses"
    )
    rue = models.CharField(max_length=255)
    num_appartement = models.IntegerField(blank=True, null=True)
    ville = models.CharField(max_length=100)
    pays = models.CharField(max_length=100)
    code_postal = models.CharField(max_length=6)


class Catégorie(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    parent = models.ForeignKey(
        "self",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="sous_catégories",
    )

    class Meta:
        verbose_name_plural = "Catégories"


class Produit(models.Model):
    marchand = models.ForeignKey(
        Marchand, on_delete=models.CASCADE, related_name="produits"
    )
    titre = models.CharField(max_length=255)
    description = models.TextField()
    prix = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    catégories = models.ManyToManyField(Catégorie, related_name="produits")


class Image(models.Model):
    produit = models.ForeignKey(
        Produit, on_delete=models.CASCADE, related_name="images"
    )
    lien = models.ImageField(upload_to="media/", storage=MinioMediaStorage)


class Panier(models.Model):
    client = models.OneToOneField(
        Client, on_delete=models.CASCADE, related_name="panier"
    )
    produits = models.ManyToManyField(Produit, through="ProduitPanier")


class ProduitPanier(models.Model):
    panier = models.ForeignKey(Panier, on_delete=models.CASCADE)
    produit = models.ForeignKey(Produit, on_delete=models.CASCADE)
    quantité = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ("panier", "produit")


class Commande(models.Model):
    client = models.ForeignKey(
        Client, on_delete=models.CASCADE, related_name="commandes"
    )
    timestamp = models.DateTimeField(auto_now_add=True)


class ItemCommande(models.Model):
    commande = models.ForeignKey(
        Commande, on_delete=models.CASCADE, related_name="items"
    )
    produit = models.ForeignKey(Produit, on_delete=models.CASCADE)
    quantité = models.PositiveIntegerField()
    prix = models.DecimalField(max_digits=10, decimal_places=2)  # Prix du temp d'achat

    class Meta:
        unique_together = ("commande", "produit")
