# ShopEasy - Système de e-commerce simplifié

Ceci est le répertoire du projet de session INF1763 (Techniques et outils professionnels de développement logiciel) durant la session d'automne 2025. La remise du projet est prévu pour le 10 décembre 2025.

_[Suivre le Wiki](https://github.com/SOSANE/ShopEasy/wiki/)_

Suivre les guides suivants:

- [Wiki: Configurer mon environnement de développement](https://github.com/SOSANE/ShopEasy/wiki/Set-up)
- [Guide de contribution](CONTRIBUTING.md)
- [Guide de déploiement](DEPLOYMENT.md)
- [Guide d'utilisation de Docker](docs/Guide_Utilisation_Docker_Compose_INF1763.md)

Documentation supplémentaire:

- [Architecture du projet](docs/Architecture.md)
- [Endpoints du backend](docs/API.md)
- [Ressources supplémentaires](docs/Ressources.md)

## Tech Stack

On se met d'accord sur la tech stack suivante, risque à être modifié:

- Backend & API: Django 5.x (Python), Django Rest Framework (avec drf-spectacular)
- Cache: Redis
- Base de données: PostgreSQL +14
- Frontend: React/Redux +18 (Styling avec React Bootstrap, Tailwind CSS, Styled Components)
- Frontend testing: Vitest + React Testing Library
- Backend testing: Django's TestCase/DRF's APITestCase
- Outils CI/CD: Github Actions
- Containerisation: Docker
- Monitoring: Prometheus/Grafana
- Reverse proxy + web server: Nginx

## Exécuter le projet

```sh
git clone https://github.com/SOSANE/ShopEasy.git
```

```sh
cd ShopEasy
```

Créez un nouveau fichier pour les variables d'environement
```sh
cp .env.local.exemple .env.local
```

Changer les mots de passe de `.env.local`

```dotenv
DATABASE_NAME=SHOPEASY
DATABASE_USER=postgres
DATABASE_PASSWORD=<Insérez un mot de passe>
DATABASE_HOST=db
DATABASE_PORT=5432
...

MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=<Insérez un mot de passe>
MINIO_DEFAULT_BUCKETS=produit-media-bucket
```

Exécuter avec Docker:

```sh
docker compose up --build -d
```

Attendre que tous les containers ont finis de build. L'interface Swagger UI pour le backend est accessible sur: http://localhost:8000/
![swagger-ui-interface](/docs/images/swagger-ui-interface.png)

Le frontend est accessible avec http://localhost:5173/
![frontend-interface](/docs/images/frontend-interface.png)

### Créer un super-utilisateur (superuser)

```sh
docker exec -it shopeasy_backend bash
```

```sh
python manage.py createsuperuser
```

En accédant sur http://localhost:8000/api/admin, on peut se connecter sur le dashboard d'administrateur
![django-admin-login-page](/docs/images/django-admin-login-page.png)
![django-admin-interface](/docs/images/django-admin-interface.png)


## Membres de l'équipe 9
- Anta Mbaye Sene
- Nelie Mabelle Djieunang Noumbo
- Sosane Mahamoud Houssein
- Tresor Megane Tambat
- Zachary McSween Manickchand