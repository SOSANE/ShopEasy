import { Link, useLocation } from "react-router";
import { Search, User, ShoppingCart, Store } from "lucide-react";

// Fonctions
import { useCart } from "../../state/contexts/CartContext";
import { useAuth } from "../../state/contexts/AuthContext";
import { useLocalization } from "../../state/contexts/LocalizationContext";

// Constantes
import LOCALIZE from "../../ressources/text/localize";
import PATH from "../../ressources/routes/paths";

function Footer() {
  const location = useLocation();
  const { cart } = useCart();
  const { currentUser } = useAuth();
  const { language } = useLocalization();

  const getLinkClass = path => {
    const isActive = location.pathname === path;
    return `flex flex-col items-center justify-center gap-1 p-2 text-xs font-medium transition-colors ${
      isActive ? "text-stone-900!" : "text-stone-400! hover:text-stone-600!"
    }`;
  };

  return (
    <footer className="pb-safe fixed bottom-0 left-0 z-50 w-full border-t border-stone-200 bg-white/95 pt-2 backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-md items-center justify-around">
        <Link to={PATH.home} className={getLinkClass(PATH.home)}>
          <Store className="size-6" strokeWidth={location.pathname === PATH.home ? 2.5 : 2} />
          <span>{LOCALIZE.footer.home}</span>
        </Link>

        <Link to={PATH.search} className={getLinkClass(PATH.search)}>
          <Search className="size-6" strokeWidth={location.pathname === PATH.search ? 2.5 : 2} />
          <span>{LOCALIZE.footer.search}</span>
        </Link>

        <Link to={PATH.cart} className={`relative ${getLinkClass(PATH.cart)}`}>
          <ShoppingCart
            className="size-6"
            strokeWidth={location.pathname === PATH.cart ? 2.5 : 2}
          />
          <span>{LOCALIZE.footer.cart}</span>
          {cart.length > 0 && (
            <span className="absolute top-1 right-3 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
              {cart.length}
            </span>
          )}
        </Link>

        {currentUser ? (
          <Link to={PATH.profile} className={getLinkClass(PATH.profile)}>
            <User className="size-6" strokeWidth={location.pathname === PATH.profile ? 2.5 : 2} />
            <span>{LOCALIZE.footer.account}</span>
          </Link>
        ) : null}
      </div>
    </footer>
  );
}

export default Footer;
