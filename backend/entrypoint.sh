#!/bin/bash

# Créer fichiers de migrations
python manage.py makemigrations

# Migrer application
python manage.py migrate

# Créer un superuser avec les variables d'environnement
# https://vuyisile.com/how-to-automate-creating-a-django-super-user/
python manage.py createsuperuser --no-input

# Loader les données
# https://docs.djangoproject.com/en/5.2/topics/db/fixtures/#fixtures-explanation
python manage.py loaddata data.json

# Application accessible sur http://localhost:8000
python manage.py runserver 0.0.0.0:8000