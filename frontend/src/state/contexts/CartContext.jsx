import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
  const saved = localStorage.getItem("cart");
  return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Ajouter un produit (avec gestion de quantité)
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        // si le produit existe déjà, on incrémente sa quantité
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + quantity }
            : p
        );
      } else {
        // sinon, on l’ajoute avec quantity = 1
        return [...prev, { ...product, quantity }];
      }
    });
  };

  // ✅ Retirer un produit
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // ✅ Vider le panier
  const clearCart = () => setCart([]);

  // ✅ Calcul du total
  const totalPrice = cart.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
