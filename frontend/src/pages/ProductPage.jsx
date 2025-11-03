import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import products from "../ressources/products";
import { useCart } from "../state/contexts/CartContext";
import PageTemplate from "../composantes/PageTemplate";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find(p => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);

  if (!product) return <p>Produit introuvable.</p>;

  return (
    <PageTemplate>
      <div className="mx-auto mt-10 max-w-3xl rounded-lg bg-white p-8 shadow-lg">
        <button
          onClick={() => navigate(-1)}
          className="rounded bg-[#d9aa6e] px-4 py-2 text-white transition hover:bg-gray-600"
        >
          ⬅ Retour
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="h-80 w-full rounded-lg object-contain"
        />
        <h1 className="mt-6 text-3xl font-bold">{product.name}</h1>
        <p className="mt-2 text-gray-600">{product.description}</p>
        <p className="mt-4 text-2xl font-semibold text-red-600">{product.price} $</p>

        {/* Sélecteur de quantité */}
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="rounded bg-gray-200 px-3 py-1"
          >
            -
          </button>
          <span className="font-medium">{quantity}</span>

          <button onClick={() => setQuantity(q => q + 1)} className="rounded bg-gray-200 px-3 py-1">
            +
          </button>
        </div>

        {/* Ajouter au panier */}
        <button
          onClick={() => addToCart(product, quantity)}
          className="mt-6 rounded-lg bg-green-600 px-6 py-2 text-white transition hover:bg-green-700"
        >
          🛒 Ajouter {quantity} au panier
        </button>

        <button className="mt-4 rounded-lg bg-green-600 px-6 py-2 text-white transition hover:bg-green-700">
          Passer la commande
        </button>
      </div>
    </PageTemplate>
  );
}
