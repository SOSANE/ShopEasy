import { BrowserRouter } from "react-router";
import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

import { AuthContext } from "../state/contexts/AuthContext";
import { LocalizationProvider } from "../state/contexts/LocalizationProvider";
import { CartProvider } from "../state/contexts/CartContext";

// Utilisateur spécifique aux tests
const testUser = { username: "test-username", email: "test@email.com" };

// Composante Provider pour les tests qui simule /frontend/src/state/contexts/Provider.jsx
export function Provider({
  children,
  isLoggedIn = false,
  currentUser = null,
  setCurrentUser = vi.fn(),
}) {
  // Possibilité d'utiliser un utilisateur juste pour les tests
  const user = isLoggedIn ? currentUser || testUser : null;

  return (
    <BrowserRouter>
      <CartProvider>
        <LocalizationProvider>
          <AuthContext
            value={{
              currentUser: user,
              setCurrentUser: setCurrentUser,
              isLoggedIn: isLoggedIn,
            }}
          >
            {children}
          </AuthContext>
        </LocalizationProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
