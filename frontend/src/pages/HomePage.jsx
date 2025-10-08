import Header from "../components/header/Header";
import SearchBar from "../components/SearchBar";
import CategoryFilters from "../components/CategoryFilters";
import ImageGrid from "../components/ImageGrid";
import RoundItemList from "../components/RoundItemList";
import Footer from "../components/footer/Footer";
import { useLocalization } from "../state/contexts/LocalizationContext";
import PageTemplate from "../components/PageTemplate";
// Constants
import LOCALIZE from "../ressources/text/localize";

export default function HomePage() {
  const categories = [
    "électronique",
    "école",
    "vêtement",
    "chaussures",
    "sac",
    "maquillage",
    "bijoux",
  ];
  const language = useLocalization();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* ==== PARTIE SUPÉRIEURE : MARRON ==== */}
      <section className="bg-[#d9aa6e] pb-10">
        <div className="w-full max-w-screen-xl mx-auto px-4 flex flex-col gap-6 pt-6">
          <SearchBar />
          <CategoryFilters categories={categories} />
          <ImageGrid />
          
        </div>
      </section>

      {/* PARTIE INFÉRIEURE  */}
      <section className="bg-[#ffffff] flex-1">
        <div className="w-full max-w-screen-xl mx-auto px-4 mt-8">
          <RoundItemList />
        </div>
      </section>

      <Footer />
    </div>
  );
}