import { useCart } from "../state/contexts/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity,clearCart, total } = useCart();

  if (cart.length === 0)
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold">Votre panier est vide 🛒</h2>
        <a
          href="/"
          className="text-blue-500 underline mt-3 inline-block hover:text-blue-700"
        >
          Retour à l'accueil
        </a>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-semibold mb-4">🛍️ Votre panier</h1>
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center border-b py-3"
        >
          <div className="flex items-center gap-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">{item.price.toFixed(2)} $</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              −
            </button>
            <span className="w-6 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              +
            </button>
            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-4 text-red-600 hover:underline"
            >
              Supprimer
            </button>
          </div>
        </div>
      ))}
        <div className="mt-4 flex justify-between">
        <button onClick={clearCart} className="text-red-600 hover:underline">
          Vider le panier
        </button>
        
      </div>
      <div className="text-right mt-6">
        <p className="text-lg font-semibold">
          Total : <span className="text-green-600">{total.toFixed(2)} $</span>
        </p>
        <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
          Passer la commande
        </button>
      </div>
    </div>
  );
}
