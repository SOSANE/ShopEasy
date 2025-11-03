import { useCart } from "../state/contexts/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#d9aa6e]">
        <h2 className="text-xl font-bold mb-2">Votre panier est vide 🛒</h2>
        <Link to="/" className="text-black hover:underline">Retour à l'accueil</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-4">🛍 Votre panier</h2>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between items-center border-b py-3">
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-500">Qté : {item.quantity}</p>
            <p className="text-sm text-gray-700">
              Prix unitaire : {item.price} $
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className="font-semibold">{(item.price * item.quantity).toFixed(2)} $</p>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 hover:text-red-800"
            >
              ✖
            </button>
          </div>
        </div>
      ))}

      <div className="mt-6 text-right font-bold text-lg">
        Total : {totalPrice.toFixed(2)} $
      </div>

      <div className="mt-4 flex justify-between">
        <button onClick={clearCart} className="text-red-600 hover:underline">
          Vider le panier
        </button>
        <Link to="/" className="text-blue-600 hover:underline">
          Continuer mes achats
        </Link>
      </div>
    </div>
  );
}
