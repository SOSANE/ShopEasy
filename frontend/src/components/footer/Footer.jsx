import { FaHome, FaUser, FaShoppingCart, FaBook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="fixed bottom-0 left-0 w-full bg-purple-100 py-3 flex justify-around text-center border-t border-gray-300 shadow-inner z-[9999]"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#E9D5FF",
        height: "70px",
      }}
    >
      <button className="flex flex-col items-center text-gray-800 hover:text-purple-700 transition">
        <FaHome className="text-xl" />
        <span className="text-sm">home</span>
      </button>
      <button className="flex flex-col items-center text-gray-800 hover:text-purple-700 transition">
        <FaUser className="text-xl" />
        <span className="text-sm">compte</span>
      </button>
      <button className="flex flex-col items-center text-gray-800 hover:text-purple-700 transition">
        <FaShoppingCart className="text-xl" />
        <span className="text-sm">panier</span>
      </button>
      <button className="flex flex-col items-center text-gray-800 hover:text-purple-700 transition">
        <FaBook className="text-xl" />
        <span className="text-sm">ressources</span>
      </button>
    </footer>
  );
}
