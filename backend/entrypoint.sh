#!/bin/bash

# Créer fichiers de migrations
python manage.py makemigrations

# Migrer application
python manage.py migrate

# Application accessible sur http://localhost:8000
python manage.py runserver 0.0.0.0:8000