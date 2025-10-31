import Header from "../composantes/header/Header";
import SearchBar from "../composantes/commons/SearchBar";
import CategoryFilters from "../composantes/commons/CategoryFilters";
import ImageGrid from "../composantes/commons/ImageGrid";
import RoundItemList from "../composantes/commons/RoundItemList";
import Footer from "../composantes/footer/Footer";
// Composantes & fonctions
import PageTemplate from "../composantes/PageTemplate";
import { useLocalization } from "../state/contexts/LocalizationContext";
import { useAuth } from "../state/contexts/AuthContext";

// Constantes
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
  const { currentUser } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      {currentUser && (
        <p>
          {LOCALIZE.homepage.text2} {currentUser.username}
        </p>
      )}
      <Header />
      {/* ==== PARTIE SUPÉRIEURE : MARRON ==== */}
      <section className="bg-[#d9aa6e] pb-10">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-6 px-4 pt-6">
          <SearchBar />
          <CategoryFilters categories={categories} />
          <ImageGrid />
        </div>
      </section>

      {/* PARTIE INFÉRIEURE  */}
      <section className="flex-1 bg-[#ffffff]">
        <div className="mx-auto mt-8 w-full max-w-screen-xl px-4">
          <RoundItemList />
        </div>
      </section>

      <Footer />
    </div>
  );
}
