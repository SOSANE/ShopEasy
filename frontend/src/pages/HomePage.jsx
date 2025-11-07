// Composantes & fonctions
import SearchBar from "../composantes/commons/SearchBar";
import CategoryFilters from "../composantes/commons/CategoryFilters";
import ImageGrid from "../composantes/commons/ImageGrid";
import RoundItemList from "../composantes/commons/RoundItemList";
import PageTemplate from "../composantes/PageTemplate";
import { useLocalization } from "../state/contexts/LocalizationContext";
import { useAuth } from "../state/contexts/AuthContext";


// Constantes
import LOCALIZE from "../ressources/text/localize";

export default function HomePage() {
  const language = useLocalization(); // ✅ récupération depuis le context
  const { currentUser } = useAuth();

  // ✅ on prend les catégories traduites
  const categories = LOCALIZE.homepage.categories;

  return (
    <PageTemplate title={LOCALIZE.homepage.title}>
      <div className="flex min-h-screen flex-col">
        {currentUser && (
          <p>
            {LOCALIZE.homepage.text2} {currentUser.username}
          </p>
        )}

        {/* ==== PARTIE SUPÉRIEURE ==== */}
        <section className="bg-[#c0bdbd1e] pb-10">
          <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-6 px-4 pt-6">
            <SearchBar />
            <CategoryFilters categories={categories} />
            <ImageGrid />
          </div>
        </section>

        {/* ==== PARTIE INFÉRIEURE ==== */}
        <section className="flex-1 bg-[#ff0707bd] py-2">
          <h2 className="text-xl font-semibold text-black">
            {LOCALIZE.homepage.allProducts}
          </h2>

          <div className="mx-auto mt-8 w-full max-w-screen-xl px-8">
            <RoundItemList />
          </div>
        </section>
      </div>
    </PageTemplate>
  );
}
