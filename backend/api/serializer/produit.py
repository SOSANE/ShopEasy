from rest_framework import serializers
from ..models.models import Produit, Image, Catégorie


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ["id", "lien"]


class ProduitSerializer(serializers.ModelSerializer):
    # READ-ONLY: For displaying existing images
    images = ImageSerializer(many=True, read_only=True)

    # WRITE-ONLY: For uploading new images
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(allow_empty_file=False),
        write_only=True,
        required=True,
    )

    catégories = serializers.PrimaryKeyRelatedField(
        queryset=Catégorie.objects.all(), many=True
    )

    class Meta:
        model = Produit
        fields = [
            "id",
            "marchand",
            "titre",
            "description",
            "prix",
            "stock",
            "catégories",
            "images",  # Pour lire
            "uploaded_images",  # Pour écrire
        ]

    def validate_uploaded_images(self, value):
        if not value:
            raise serializers.ValidationError("At least one image is required.")
        return value

    def create(self, validated_data):
        # Pop related data before creating the Produit
        uploaded_images = validated_data.pop("uploaded_images")
        catégories_data = validated_data.pop("catégories")

        # Create the Produit instance
        produit = Produit.objects.create(**validated_data)

        # Set the ManyToMany categories
        produit.catégories.set(catégories_data)

        # Create ProduitImage instances for each uploaded image
        try:
            for image_data in uploaded_images:
                Image.objects.create(produit=produit, image=image_data)
        except:
            print("MinIO upload failed")

        return produit

    def update(self, instance, validated_data):
        # Pop related data
        uploaded_images = validated_data.pop("uploaded_images", None)
        catégories_data = validated_data.pop("catégories", None)

        # Update standard fields
        instance.titre = validated_data.get("titre", instance.titre)
        instance.description = validated_data.get("description", instance.description)
        instance.prix = validated_data.get("prix", instance.prix)
        instance.stock = validated_data.get("stock", instance.stock)
        instance.marchand = validated_data.get("marchand", instance.marchand)
        instance.save()

        # Update categories if provided
        if catégories_data is not None:
            instance.catégories.set(catégories_data)

        # Handle image updates: This example REPLACES all images
        if uploaded_images is not None:
            # Delete old images
            instance.images.all().delete()
            # Create new images
            for image_data in uploaded_images:
                Image.objects.create(produit=instance, image=image_data)

        return instance
