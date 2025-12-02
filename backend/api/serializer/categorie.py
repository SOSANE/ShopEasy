from rest_framework import serializers
from ..models.models import Catégorie


class CategorieSerializer(serializers.ModelSerializer):
    parent = serializers.PrimaryKeyRelatedField(
        queryset=Catégorie.objects.all(), many=False
    )
    class Meta:
        model = Catégorie
        fields = ["id", "title", "description", "parent"]