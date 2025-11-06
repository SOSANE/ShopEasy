from rest_framework import serializers


class ProduitSerializer(serializers.Serializer):
    marchand_id = serializers.IntegerField()
    titre = serializers.CharField(max_length=255)
    description = serializers.CharField()
    prix = serializers.DecimalField(max_digits=10, decimal_places=2)
    stock = serializers.IntegerField()
    catégories = serializers.ListField(child=serializers.IntegerField())
