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

function HomePage({ productList, categoryList }) {
  console.log("PRODUCT LIST =", productList);
  const language = useLocalization();
  const { currentUser } = useAuth();

  return (
    <PageTemplate>
      <div className="flex min-h-screen flex-col bg-stone-50 pb-24">
        {/* ==== PARTIE SUPÉRIEURE ==== */}
        <section className="w-full bg-white pt-6 pb-8 shadow-sm">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4">
            <div className="flex flex-col gap-2 text-center md:text-left">
              {currentUser && (
                <h3 className="text-lg font-medium text-stone-600">
                  {LOCALIZE.homepage.text2}{" "}
                  <span className="font-bold text-stone-900">{currentUser.username}</span>
                </h3>
              )}
              <h1 className="text-3xl font-bold tracking-tight text-stone-900 md:text-4xl">
                {LOCALIZE.homepage.welcome}
              </h1>
            </div>
            <SearchBar />
            <div className="mt-2">
              <CategoryFilters categories={categoryList} />
            </div>
          </div>
        </section>

        {/* ==== PARTIE INFÉRIEURE ==== */}
        <div className="mx-auto w-full max-w-7xl space-y-12 px-4 py-8">
          <ImageGrid productList={productList} />

          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <h2 className="text-2xl font-bold text-stone-900">{LOCALIZE.homepage.allProducts}</h2>
            </div>
            <RoundItemList productList={productList} />
          </section>
        </div>
      </div>
    </PageTemplate>
  );
}

export default HomePage;
