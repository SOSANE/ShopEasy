import { useEffect, useState } from "react";

// Fonctions
import { CartContext } from "./CartContext";

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sauvegarde dans localStorage dès que le panier change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Calcul automatique du total
  const total = cart.reduce((sum, p) => sum + p.prix * p.quantity, 0);

  // Ajouter un produit
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id);
      let updated;

      if (exists) {
        updated = prev.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p
        );
      } else {
        updated = [...prev, { ...product, quantity }];
      }

      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  // Modifier la quantité
  const updateQuantity = (id, newQuantity) => {
    setCart(prev => {
      const updated = prev.map(p =>
        p.id === id ? { ...p, quantity: Math.max(1, newQuantity) } : p
      );

      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  // Supprimer un produit
  const removeFromCart = id => {
    setCart(prev => {
      const updated = prev.filter(p => p.id !== id);
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  // Vider le panier
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext
      value={{
        cart,
        total,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext>
  );
}
