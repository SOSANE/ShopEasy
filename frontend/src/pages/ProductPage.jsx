import { useParams, useNavigate } from "react-router-dom"; // ✅ corrige import
import { useState } from "react";
import products from "../ressources/products";
import { useCart } from "../state/contexts/CartContext";
import PageTemplate from "../composantes/PageTemplate";
import { useLocalization } from "../state/contexts/LocalizationContext";
import LOCALIZE from "../ressources/text/localize";

export default function ProductPage() {
  const language = useLocalization(); // ✅ on récupère les textes selon la langue
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);

  if (!product)
    return (
      <PageTemplate>
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-lg text-gray-600">{LOCALIZE.productPage.notFound}</p>
        </div>
      </PageTemplate>
    );

  return (
    <PageTemplate>
      <div className="mx-auto mt-12 max-w-4xl rounded-xl bg-white p-10 shadow-lg flex flex-col md:flex-row gap-10 items-center">
        {/* Image produit */}
        <div className="w-full md:w-1/2 flex justify-center bg-[#f9f5ef] rounded-lg p-6">
          <img
            src={product.image}
            alt={product.name}
            className="object-contain h-80 hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Détails produit */}
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <button
            onClick={() => navigate(-1)}
            className="text-[#d9aa6e] text-sm self-start hover:underline"
          >
            {LOCALIZE.productPage.backButton}
          </button>

          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-[#d9534f]">
              {product.price} {LOCALIZE.productPage.currencySymbol}
            </p>
            <span className="bg-[#f1e1c3] text-[#705d3b] text-sm px-3 py-1 rounded-full">
              {LOCALIZE.productPage.freeShipping}
            </span>
          </div>

          {/* Sélecteur de quantité */}
          <div className="flex items-center gap-3 mt-3">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
            >
              -
            </button>
            <span className="text-lg font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
            >
              +
            </button>
          </div>

          {/* Boutons d’action */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <button
              onClick={() => addToCart(product, quantity)}
              className="flex-1 rounded-lg bg-green-600 text-white px-6 py-3 text-center font-semibold shadow-md hover:bg-green-700 hover:scale-105 transition"
            >
              🛒 {LOCALIZE.productPage.addToCart}
            </button>

            <button
              className="flex-1 rounded-lg bg-[#d9aa6e] text-white px-6 py-3 text-center font-semibold shadow-md hover:bg-[#b8864b] hover:scale-105 transition"
            >
              ⚡ {LOCALIZE.productPage.buyNow}
            </button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
