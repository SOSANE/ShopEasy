import { Link, useLocation } from "react-router";

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
        className={`rounded bg-white px-4 py-2 shadow-md hover:bg-gray-100 ${
          location.pathname === PATH.home ? "border border-black" : ""
        }`}
      >
        🏠 {LOCALIZE.footer.home}
      </Link>

      <Link
        to={PATH.search}
        className={`rounded bg-white px-4 py-2 shadow-md hover:bg-gray-100 ${
          location.pathname === PATH.search ? "border border-black" : ""
        }`}
      >
        🔍 {LOCALIZE.footer.search}
      </Link>

      <Link
        to={PATH.cart}
        className={`relative rounded bg-white px-4 py-2 shadow-md hover:bg-gray-100 ${
          location.pathname === PATH.cart ? "border border-black" : ""
        }`}
      >
        🛒 {LOCALIZE.footer.cart}
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 rounded-full bg-red-500 px-1.5 text-xs text-white">
            {cart.length}
          </span>
        )}
      </Link>

      <Link
        to={PATH.profile}
        className={`rounded bg-white px-4 py-2 shadow-md hover:bg-gray-100 ${
          location.pathname === PATH.profile ? "border border-black" : ""
        }`}
      >
        👤 {LOCALIZE.footer.account}
      </Link>
    </footer>
  );
}
export default Footer;
