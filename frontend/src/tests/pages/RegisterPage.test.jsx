import { it, describe, expect, beforeEach } from "vitest";
import { screen } from "@testing-library/react";

// Composantes et fonctions
import { renderProvider } from "../setup-tests";
import RegisterPage from "../../pages/RegisterPage";

// Constantes
import LOCALIZE from "../../ressources/text/localize";

describe("Tests de la page de création de compte", () => {
  // Afficher Register page
  beforeEach(() => {
    renderProvider(<RegisterPage />, { props: { isLoggedIn: false } });
  });

  it("Visibilité du titre", () => {
    const elementTitre = screen.getByText(LOCALIZE.registerPage.title);
    expect(elementTitre).toBeInTheDocument();
    expect(elementTitre).toBeVisible();
  });

  // Tester l'existence et la visbilité de quelques champs du formualaire
  it("Les champs du formulaire de création de compte devraient être affichés et visible", () => {
    const elementUsernameLabel = screen.getByPlaceholderText(
      LOCALIZE.registerPage.form.usernameLabel
    );
    const elementEmailPlaceholder = screen.getByPlaceholderText(
      LOCALIZE.registerPage.form.emailPlaceholder
    );
    const elementPasswordLabel = screen.getByLabelText(LOCALIZE.registerPage.form.passwordLabel);

    // Existe sur le DOM
    expect(elementUsernameLabel).toBeInTheDocument();
    expect(elementEmailPlaceholder).toBeInTheDocument();
    expect(elementPasswordLabel).toBeInTheDocument();

    // Est visible
    expect(elementUsernameLabel).toBeVisible();
    expect(elementEmailPlaceholder).toBeVisible();
    expect(elementPasswordLabel).toBeVisible();
  });
});
