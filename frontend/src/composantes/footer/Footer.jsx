import { Link, useLocation } from "react-router";
import { useCart } from "../../state/contexts/CartContext";
import { useLocalization } from "../../state/contexts/LocalizationContext";
import LOCALIZE from "../../ressources/text/localize";

export default function Footer() {
  const location = useLocation();
  const { cart } = useCart();
  const { language } = useLocalization();

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-purple-100 py-3 flex justify-around shadow-inner z-50">
      <Link
        to="/"
        className={`bg-white px-4 py-2 rounded shadow-md hover:bg-gray-100 ${
          location.pathname === "/" ? "border border-black" : ""
        }`}
      >
        🏠 {LOCALIZE.footer.home}
      </Link>

      <Link
        to="/account"
        className={`bg-white px-4 py-2 rounded shadow-md hover:bg-gray-100 ${
          location.pathname === "/account" ? "border border-black" : ""
        }`}
      >
        🔍 {LOCALIZE.footer.search}
      </Link>

      <Link
        to="/cart"
        className={`bg-white px-4 py-2 rounded shadow-md hover:bg-gray-100 relative ${
          location.pathname === "/cart" ? "border border-black" : ""
        }`}
      >
        🛒 {LOCALIZE.footer.cart}
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
            {cart.length}
          </span>
        )}
      </Link>

      <Link
        to="/resources"
        className={`bg-white px-4 py-2 rounded shadow-md hover:bg-gray-100 ${
          location.pathname === "/resources" ? "border border-black" : ""
        }`}
      >
        👤 {LOCALIZE.footer.account}
      </Link>
    </footer>
  );
}
