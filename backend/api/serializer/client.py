from rest_framework import serializers
from ..models.models import Client, Utilisateur


class ClientSerializer(serializers.ModelSerializer):
    utilisateur = serializers.PrimaryKeyRelatedField(queryset=Utilisateur.objects.all())

    class Meta:
        model = Client
        fields = ["utilisateur"]
