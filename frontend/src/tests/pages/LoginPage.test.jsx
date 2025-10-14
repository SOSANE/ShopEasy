import { it, describe, expect, beforeEach } from "vitest";
import { screen } from "@testing-library/react";

// Composantes et fonctions
import { renderProvider } from "../setup-tests";
import LoginPage from "../../pages/LoginPage";

// Constantes
import LOCALIZE from "../../ressources/text/localize";

describe("Tests de la page de connexion", () => {
  // Afficher Login page
  beforeEach(() => {
    renderProvider(<LoginPage />, { props: { isLoggedIn: false } });
  });

  it("Visibilité du titre", () => {
    const elementTitre = screen.getByText(LOCALIZE.loginpage.title);
    expect(elementTitre).toBeInTheDocument();
    expect(elementTitre).toBeVisible();
  });

  // Tester l'existence et la visbilité de quelques champs du formualaire
  it("Les champs du formulaire de connexion devraient être affichés et visible", () => {
    const elementUsernameLabel = screen.getByPlaceholderText(LOCALIZE.loginpage.form.usernameLabel);
    const elementPasswordLabel = screen.getByPlaceholderText(LOCALIZE.loginpage.form.passwordLabel);

    // Existe sur le DOM
    expect(elementUsernameLabel).toBeInTheDocument();
    expect(elementPasswordLabel).toBeInTheDocument();

    // Est visible
    expect(elementUsernameLabel).toBeVisible();
    expect(elementPasswordLabel).toBeVisible();
  });
});
