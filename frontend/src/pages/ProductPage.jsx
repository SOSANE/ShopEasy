import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import products from "../ressources/products";
import { useCart } from "../state/contexts/CartContext";
import PageTemplate from "../composantes/PageTemplate";
import { useLocalization } from "../state/contexts/LocalizationContext";
import LOCALIZE from "../ressources/text/localize";

export default function ProductPage() {
  const language = useLocalization();
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find(p => p.id === parseInt(id));
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
      <div className="mx-auto mt-12 flex max-w-4xl flex-col items-center gap-10 rounded-xl bg-white p-10 shadow-lg md:flex-row">
        {/* Image produit */}
        <div className="flex w-full justify-center rounded-lg bg-[#f9f5ef] p-6 md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="h-80 object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Détails produit */}
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          <button
            onClick={() => navigate(-1)}
            className="self-start text-sm text-[#d9aa6e] hover:underline"
          >
            {LOCALIZE.productPage.backButton}
          </button>

          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="leading-relaxed text-gray-600">{product.description}</p>

          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold text-[#d9534f]">
              {product.price} {LOCALIZE.productPage.currencySymbol}
            </p>
            <span className="rounded-full bg-[#f1e1c3] px-3 py-1 text-sm text-[#705d3b]">
              {LOCALIZE.productPage.freeShipping}
            </span>
          </div>

          {/* Sélecteur de quantité */}
          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200! transition hover:bg-gray-300"
            >
              -
            </button>
            <span className="text-lg font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200! transition hover:bg-gray-300"
            >
              +
            </button>
          </div>

          {/* Boutons d’action */}
          <div className="mt-6 flex flex-col gap-4 md:flex-row">
            <button
              onClick={() => addToCart(product, quantity)}
              className="flex-1 rounded-lg bg-green-600 px-6 py-3 text-center font-semibold text-white shadow-md transition hover:scale-105 hover:bg-green-700"
            >
              🛒 {LOCALIZE.productPage.addToCart}
            </button>

            <button className="flex-1 rounded-lg bg-[#d9aa6e] px-6 py-3 text-center font-semibold text-white shadow-md transition hover:scale-105 hover:bg-[#b8864b]">
              ⚡ {LOCALIZE.productPage.buyNow}
            </button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
