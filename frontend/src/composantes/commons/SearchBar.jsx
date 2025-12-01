import { Search } from "lucide-react";
import { useLocalization } from "../../state/contexts/LocalizationContext";
import LOCALIZE from "../../ressources/text/localize";

export default function SearchBar() {
  const { language } = useLocalization();

  return (
    <div className="relative w-full max-w-2xl">
      {/* Barre de recherche */}
      <div className="relative flex items-center">
        <Search className="absolute left-4 h-5 w-5 text-stone-400" />
        <input
          type="text"
          placeholder={LOCALIZE.searchBar.placeholder}
          className="h-12 w-full rounded-full border border-stone-200 bg-stone-100 pr-4 pl-12 text-base transition-all outline-none placeholder:text-stone-500 focus:border-stone-400 focus:bg-white focus:ring-2 focus:ring-stone-200 focus:ring-offset-2"
        />
        <button className="absolute right-2 rounded-full! bg-stone-900! px-4 py-1.5 text-sm! font-medium! text-white! transition-colors! hover:bg-stone-800!">
          {LOCALIZE.searchBar.searchButton}
        </button>
      </div>
    </div>
  );
}
