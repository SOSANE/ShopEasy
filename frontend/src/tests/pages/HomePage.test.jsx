import { it, describe, expect, beforeEach } from "vitest";
import { screen } from "@testing-library/react";

// Composantes et fonctions
import { renderProvider } from "../setup-tests";
import HomePage from "../../pages/HomePage";

// Constantes
import LOCALIZE from "../../ressources/text/localize";

describe("Tests de la page d'acceuil", () => {
  // Afficher la page d'acceuil
  beforeEach(() => {
    renderProvider(<HomePage />, { props: { isLoggedIn: true } });
  });

  it("Visibilité du texte", () => {
    const elementTitre = screen.getByText(`${LOCALIZE.homepage.welcome}`);
    expect(elementTitre).toBeInTheDocument();
    expect(elementTitre).toBeVisible();
  });
});
