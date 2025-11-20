import { Link, useLocation } from "react-router";
import { Search, User, ShoppingCart, Store } from "lucide-react";
// Fonctions
import { useCart } from "../../state/contexts/CartContext";
import { useLocalization } from "../../state/contexts/LocalizationContext";

// Constantes
import LOCALIZE from "../../ressources/text/localize";
import PATH from "../../ressources/routes/paths";

function Footer() {
  const location = useLocation();
  const { cart } = useCart();
  const { language } = useLocalization();

  return (
    <footer className="fixed bottom-0 left-0 z-50 flex w-full justify-around bg-purple-100 py-3 shadow-inner">
      <Link
        to={PATH.home}
        className={`flex items-center rounded bg-white px-4 py-2 shadow-md hover:bg-gray-100 ${
          location.pathname === PATH.home ? "border border-black" : ""
        }`}
      >
        <Store /> <p className="ml-2">{LOCALIZE.footer.home}</p>
      </Link>

      <Link
        to={PATH.search}
        className={`flex items-center rounded bg-white px-4 py-2 shadow-md hover:bg-gray-100 ${
          location.pathname === PATH.search ? "border border-black" : ""
        }`}
      >
        <Search /> <p className="ml-2">{LOCALIZE.footer.search}</p>
      </Link>

      <Link
        to={PATH.cart}
        className={`relative flex items-center rounded bg-white px-4 py-2 shadow-md hover:bg-gray-100 ${
          location.pathname === PATH.cart ? "border border-black" : ""
        }`}
      >
        <ShoppingCart /> <p className="ml-2">{LOCALIZE.footer.cart}</p>
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 rounded-full bg-red-500 px-1.5 text-xs text-white">
            {cart.length}
          </span>
        )}
      </Link>

      <Link
        to={PATH.profile}
        className={`flex items-center rounded bg-white px-4 py-2 shadow-md hover:bg-gray-100 ${
          location.pathname === PATH.profile ? "border border-black" : ""
        }`}
      >
        <User /> <p className="ml-2">{LOCALIZE.footer.account}</p>
      </Link>
    </footer>
  );
}
export default Footer;
