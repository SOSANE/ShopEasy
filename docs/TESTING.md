# Testing

### Backend

Éxecuter des tests:

```sh
docker exec -it shopeasy_backend bash
```

```sh
python manage.py test tests
```

#### Guide: Création de tests backend

1. Naviguer sur [test_suite.py](/backend/tests/test_suite.py)
2. Trouver la section pertinente à votre tâche pour créer un test ou créer une nouvelle classe.
3. Sélectionner quelle type de test case nécessaire pour votre test:
    - `TestCase`: Tester les méthodes backend.
    - `APITestCase`: Tester les endpoints (fonctionne aussi pour tester les méthodes).
4. Utiliser ce format:
```python
from django.test import TestCase
from rest_framework.test import APITestCase
from tests.api.tests import run_test # Test importé
# ...

# Classe: Le nom de la partie qu'il faut tester + "Test"
class BackendTest(APITestCase or TestCase):
    # Le nom de la fonction a tester doit débuter par:
    # "test_" + nom de la fonctionnalité à tester
    def test_run_test(self):
        # La fonction importé qui va être exécuter dans le bloc de test. 
        # Elle doit être dans le format: "run_" + nom de la fonctionnalité à tester
        run_test(self)
```

### Frontend

Tests avec `Vitest` & `React Testing Library`.

```sh
docker exec -it shopeasy_frontend bash
```

```sh
npm run test
```

#### Guide: Création des tests frontend
1. Identifier quelles composantes à tester, si le fichier est une page, naviguer sur le dossier `tests/pages`. Si le fichier est une composantes, naviguer sur `tests/composantes`. 
2. Créer un fichier dans le format `nom_du_fichier_a_tester.test.jsx` (ex. pour tester `HomePage.jsx`, on créé `HomePage.test.jsx`).
3. Render la page ou la composante avec `renderProvider`.
4. Le test doit être dans le format suivant (exemple avec `HomePage.jsx`):
```jsx
import { it, describe, expect, beforeEach } from "vitest";
import { screen } from "@testing-library/react";

// Composantes et fonctions
import { renderProvider } from "../setup-tests";
import HomePage from "../../pages/HomePage";

// Constantes
import LOCALIZE from "../../ressources/text/localize";

// Nom du test avec describe
describe("Tests de la page d'acceuil", () => {
  // Afficher la page d'acceuil
  beforeEach(() => {
    renderProvider(<HomePage />, { props: { isLoggedIn: true } });
  });

  it("Premier test...", () => {
    // ...
  });
});
```
