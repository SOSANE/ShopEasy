from django.db.models.signals import post_save
from django.dispatch import receiver
from .models.models import Utilisateur, Client, Marchand


@receiver(post_save, sender=Utilisateur)
def create_client_side_effect(sender, instance, created, **kwargs):
    if created:
        if instance.is_staff:
            m = Marchand.objects.create(utilisateur=instance)
            print(m.utilisateur_id)
        else:
            c = Client.objects.create(utilisateur=instance)
            print(c.utilisateur_id)
