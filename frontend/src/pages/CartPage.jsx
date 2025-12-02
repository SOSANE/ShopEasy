// Pages et fonctions
import PageTemplate from "../composantes/PageTemplate";
import { useCart } from "../state/contexts/CartContext";
import { useLocalization } from "../state/contexts/LocalizationContext";
import { Trash2, ArrowRight, Minus, Plus, ShoppingBag } from "lucide-react";

// Constantes
import LOCALIZE from "../ressources/text/localize";
import PATH from "../ressources/routes/paths";
import { Link } from "react-router";

function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const language = useLocalization();

  if (cart.length === 0)
    return (
      <PageTemplate>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-stone-100">
            <ShoppingBag className="h-10 w-10 text-stone-400" />
          </div>
          <h2 className="text-2xl font-semibold text-stone-900">{LOCALIZE.cartPage.empty}</h2>
          <p className="mt-2 text-stone-500">{LOCALIZE.cartPage.emptytext}</p>
          <Link
            to={PATH.home}
            className="mt-8 rounded-full bg-stone-900 px-8 py-3 text-sm font-medium text-white! transition-transform hover:scale-105 hover:bg-stone-800"
          >
            {LOCALIZE.cartPage.backHome}
          </Link>
        </div>
      </PageTemplate>
    );

  return (
    <PageTemplate>
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <h1 className="text-2xl font-bold text-stone-900">{LOCALIZE.cartPage.title}</h1>
          <button
            onClick={clearCart}
            className="text-xs font-medium text-stone-50 hover:text-stone-200 hover:underline"
          >
            {LOCALIZE.cartPage.clear}
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          {cart.map(item => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                <img
                  src={item.images[0].lien}
                  alt={item.name}
                  className="h-full w-full object-cover mix-blend-multiply"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between sm:flex-row sm:items-center">
                <div className="flex flex-col">
                  <span className="text-lg font-medium text-stone-900">{item.name}</span>
                  <span className="text-sm font-semibold text-stone-500">
                    {item.prix} {LOCALIZE.currencySymbol}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between gap-6 sm:mt-0">
                  <div className="flex items-center gap-3 rounded-full bg-stone-100 px-3 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex h-6 w-6 items-center justify-center rounded-full! bg-white! shadow-sm hover:bg-stone-50!"
                    >
                      <Minus className="h-3 w-3 shrink-0" />
                    </button>
                    <span className="w-4 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-6 w-6 items-center justify-center rounded-full! bg-white! shadow-sm hover:bg-stone-50!"
                    >
                      <Plus className="h-3 w-3 shrink-0" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="group rounded-full p-2 text-stone-400 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between text-lg font-medium">
            <span className="text-stone-600">{LOCALIZE.cartPage.total}</span>
            <span className="text-2xl font-bold text-stone-900">
              {total.toFixed(2)} {LOCALIZE.currencySymbol}
            </span>
          </div>
          <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-stone-900 py-4 font-semibold text-white transition-all hover:bg-stone-800 hover:shadow-lg active:scale-[0.99]">
            {LOCALIZE.cartPage.checkout} <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </PageTemplate>
  );
}

export default CartPage;
