# Diagrammes et description de l'architecture

## Services
### Base de données
- `PostgreSQL` v14.19 comme base de donnée principale. Une description plus complète de la base de données se trouve dans [Database-diagrams.md](/db/Database-diagrams.md). Le service est disponible sur le port 5434 sur le hôte.

### Backend
- Django et Django Rest Framework avec documentation automatique des endpoints API avec `drf-spectacular` & `restframework`.
- Les tests sont fait à l'aide de `TestCase`(`Django`)/`APITestCase`(`djangorestframework`)
- Une description plus complète des endpoints API du projet se trouve dans [API.md](API.md).
- Le service est disponible sur le port 8000 sur le hôte.

### Frontend
- ReactJS est la framework utilisé pour l'interface de l'application. Le projet a été débuté à l'aide de vite.
- Les tests frontend sont fait avec `vitest` et `react-testing-library`.
- La stylisation de l'interface est fait avec `TailwindCSS` et le service utilise des composantes de `shadcn`.
- Le service (à l'aide du reverse proxy) est disponible sur le port 5173 sur le hôte.

### Nginx
- Nous utilisons un reverse proxy pour que les services de backend et frontend puissent communiquer entre eux. Lors du déploiement, Nginx servira de web server.

### MinIO
- C'est un service de stockage d'image pour stocker les images des produits. Le service est disponible sur les ports 9000 et 9001 sur l'hôte.

### Docker
- L'application est containerisé à l'aide de Docker.