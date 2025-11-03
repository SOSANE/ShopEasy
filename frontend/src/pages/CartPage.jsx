import { useCart } from "../state/contexts/CartContext";
import PageTemplate from "../composantes/PageTemplate";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();

  if (cart.length === 0)
    return (
      <PageTemplate>
        <div className="mt-10 text-center">
          <h2 className="text-xl font-semibold">Votre panier est vide 🛒</h2>
          <a href="/" className="mt-3 inline-block text-blue-500 underline hover:text-blue-700">
            Retour à l'accueil
          </a>
        </div>
      </PageTemplate>
    );

  return (
    <PageTemplate>
      <div className="mx-auto mt-10 max-w-3xl rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-2xl font-semibold">🛍️ Votre panier</h1>
        {cart.map(item => (
          <div key={item.id} className="flex items-center justify-between border-b py-3">
            <div className="flex items-center gap-3">
              <img src={item.image} alt={item.name} className="h-20 w-20 rounded-md object-cover" />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">{item.price.toFixed(2)} $</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="rounded bg-gray-200 px-2 py-1"
              >
                −
              </button>
              <span className="w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="rounded bg-gray-200 px-2 py-1"
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
        <div className="mt-6 text-right">
          <p className="text-lg font-semibold">
            Total : <span className="text-green-600">{total.toFixed(2)} $</span>
          </p>
          <button className="mt-4 rounded-lg bg-green-600 px-6 py-2 text-white transition hover:bg-green-700">
            Passer la commande
          </button>
        </div>
      </div>
    </PageTemplate>
  );
}
