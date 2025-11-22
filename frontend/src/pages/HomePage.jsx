import { useEffect, useState } from "react";

// Composantes & fonctions
import SearchBar from "../composantes/commons/SearchBar";
import CategoryFilters from "../composantes/commons/CategoryFilters";
import ImageGrid from "../composantes/commons/ImageGrid";
import RoundItemList from "../composantes/commons/RoundItemList";
import PageTemplate from "../composantes/PageTemplate";
import { useLocalization } from "../state/contexts/LocalizationContext";
import { useAuth } from "../state/contexts/AuthContext";
import { getAllProducts } from "../api/produits";
import { getAllCategories } from "../api/categorie";

// Constantes
import LOCALIZE from "../ressources/text/localize";

function HomePage({ productList, categoryList }) {
  const language = useLocalization();
  const { currentUser } = useAuth();

  return (
    <PageTemplate>
      <div className="flex min-h-screen flex-col">
        {currentUser && (
          <p>
            {LOCALIZE.homepage.text2} {currentUser.username}
          </p>
        )}

        {/* ==== PARTIE SUPÉRIEURE ==== */}
        <section className="bg-[#c0bdbd1e] pb-10">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pt-6">
            <SearchBar />
            <CategoryFilters categories={categoryList} />
            <ImageGrid productList={productList} />
          </div>
        </section>

        {/* ==== PARTIE INFÉRIEURE ==== */}
        <section className="flex-1 bg-[#ff0707bd] py-2">
          <h2 className="text-xl font-semibold text-black">{LOCALIZE.homepage.allProducts}</h2>

          <div className="mx-auto mt-8 w-full max-w-7xl px-8">
            <RoundItemList productList={productList} />
          </div>
        </section>
      </div>
    </PageTemplate>
  );
}

export default HomePage;
