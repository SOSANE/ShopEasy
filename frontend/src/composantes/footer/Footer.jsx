import { FaHome, FaUser, FaShoppingCart, FaBook } from "react-icons/fa";
// Composantes & fonctions
import { useLocalization } from "../../state/contexts/LocalizationContext";
import { Link } from "react-router";

// Constantes
import LOCALIZE from "../../ressources/text/localize";
import PATH from "../../ressources/routes/paths";

export function Footer() {
  const language = useLocalization();

  return (
    <footer
      className="fixed bottom-0 left-0 z-[9999] flex w-full justify-around border-t border-gray-300 bg-purple-100 py-3 text-center shadow-inner"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#E9D5FF",
        height: "70px",
      }}
    >
      <button className="flex flex-col items-center text-gray-800 transition hover:text-purple-700">
        <FaHome className="text-xl" />
        <span className="text-sm">home</span>
      </button>
      <button className="flex flex-col items-center text-gray-800 transition hover:text-purple-700">
        <FaUser className="text-xl" />
        <span className="text-sm">compte</span>
      </button>
      <button className="flex flex-col items-center text-gray-800 transition hover:text-purple-700">
        <FaShoppingCart className="text-xl" />
        <span className="text-sm">panier</span>
      </button>
      <button className="flex flex-col items-center text-gray-800 transition hover:text-purple-700">
        <FaBook className="text-xl" />
        <span className="text-sm">ressources</span>
      </button>
    </footer>
  );
}

export default Footer;
