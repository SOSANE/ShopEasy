import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import products from "../ressources/products";
import { useCart } from "../state/contexts/CartContext";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);

  if (!product) return <p>Produit introuvable.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white rounded-lg shadow-lg p-8">
      <button
        onClick={() => navigate(-1)}
        className="bg-[#d9aa6e] text-white px-4 py-2 rounded hover:bg-gray-600 transition"
      >
        ⬅ Retour
      </button>

      <img src={product.image} alt={product.name} className="w-full h-80 object-contain rounded-lg" />
      <h1 className="text-3xl font-bold mt-6">{product.name}</h1>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-2xl font-semibold text-red-600 mt-4">{product.price} $</p>
      
      {/* Sélecteur de quantité */}
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          -
        </button>
        <span className="font-medium">{quantity}</span>
        
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          +
        </button>
        
      </div>
      
      {/* Ajouter au panier */}
      <button
        onClick={() => addToCart(product, quantity)}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
      >
        🛒 Ajouter {quantity} au panier
      </button>
      
      <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
          Passer la commande
        </button>
    </div>
  );
}
