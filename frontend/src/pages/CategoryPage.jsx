import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft } from "lucide-react";

// Composantes et fonctions
import PageTemplate from "../composantes/PageTemplate";
import { useLocalization } from "../state/contexts/LocalizationContext";
import { getCategoryById } from "../api/categorie";

// Constantes
import LOCALIZE from "../ressources/text/localize";
import PATH from "../ressources/routes/paths";

function CategoryPage({ products }) {
  const language = useLocalization();
  const { id } = useParams();
  const [category, setCategory] = useState();

  // NOTE: on peux modifier cette fonction pour filtrer aussi les categories parents
  function filterByCategory(product) {
    for (let i = 0; i < product.catégories.length; i++) {
      if (product.catégories[i] == id) {
        return true;
      }
    }

    return false;
  }

  // On filtre les produits de cette catégorie
  const filteredProducts = products.filter(filterByCategory);

  useEffect(() => {
    async function fetchCategory(id) {
      const data = await getCategoryById(id);
      setCategory(data);
    }

    fetchCategory(id);
  }, [id]);

  if (filteredProducts.length === 0) {
    return (
      <PageTemplate>
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <h2 className="mb-6 text-2xl font-semibold text-stone-600">
            {LOCALIZE.categoryPage.noProductFound} "{category?.title}"
          </h2>
          <Link
            to={PATH.home}
            className="group flex items-center gap-2 rounded-full border border-stone-200 bg-white px-6 py-2 text-stone-900! transition hover:bg-stone-50"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {LOCALIZE.categoryPage.backToHome}
          </Link>
        </div>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate>
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Titre de la catégorie */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <span className="text-sm font-medium tracking-wider text-stone-500 uppercase">
              {LOCALIZE.categoryPage.collection}
            </span>
            <h1 className="text-3xl font-bold text-stone-900 capitalize md:text-4xl">
              {category?.title}
            </h1>
          </div>
          <Link
            to={PATH.home}
            className="hidden items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-50 md:flex"
          >
            <ArrowLeft className="h-4 w-4" />
            {LOCALIZE.categoryPage.backToHome}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map(product => (
            <Link
              key={product.id}
              to={`/product/${product.id}/`}
              className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100 p-4">
                <img
                  src={product.images[0].lien}
                  alt={product.titre}
                  className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h2 className="text-lg font-semibold text-stone-900 group-hover:text-blue-600">
                  {product.titre}
                </h2>
                <p className="mt-1 line-clamp-2 text-sm text-stone-500">{product.description}</p>
                <div className="mt-auto pt-4">
                  <p className="text-xl font-bold text-stone-900">
                    {product.prix} {LOCALIZE.currencySymbol}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageTemplate>
  );
}

export default CategoryPage;
