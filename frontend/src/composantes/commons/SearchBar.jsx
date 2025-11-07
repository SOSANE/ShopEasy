import { FaSearch } from "react-icons/fa";
import { useLocalization } from "../../state/contexts/LocalizationContext";
import LOCALIZE from "../../ressources/text/localize";

export default function SearchBar() {
  const { language } = useLocalization();

  return (
    <div className="w-full flex flex-col items-center gap-4 mt-6">
      {/* Barre de recherche centrée */}
      <div className="flex items-center gap-3 bg-white shadow-md rounded-full px-4 py-1 w-[70%] max-w-3xl">
        <input
          type="text"
          placeholder={LOCALIZE.searchBar.placeholder}
          className="flex-grow px-4 py-2 outline-none bg-transparent"
        />
        <FaSearch className="text-gray-500" />
      </div>
    </div>
  );
}
