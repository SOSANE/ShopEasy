// Importations nécessaires
import { useParams, Link } from "react-router-dom"; // ✅ corrige l'import
import PageTemplate from "../composantes/PageTemplate";
import products from "../ressources/products";
import { useLocalization } from "../state/contexts/LocalizationContext";
import LOCALIZE from "../ressources/text/localize";

export default function CategoryPage() {
  const  language  = useLocalization(); // ✅ pour accéder à la langue
  const { categoryName } = useParams();

  // On filtre les produits de cette catégorie
  const filteredProducts = products.filter(
    (p) => p.category && p.category.toLowerCase() === categoryName.toLowerCase()
  );
  
  // Si aucun produit trouvé
  if (filteredProducts.length === 0) {
    return (
      <PageTemplate>
        <div className="flex min-h-screen flex-col items-center justify-center text-center">
          <h2 className="mb-4 text-2xl font-semibold text-gray-700">
            {LOCALIZE.categoryPage.noProductFound} "{categoryName}"
          </h2>
          <Link
            to="/"
            className="rounded-md bg-black px-6 py-2 text-white transition hover:bg-gray-800"
          >
            {LOCALIZE.categoryPage.backToHome}
          </Link>
        </div>
      </PageTemplate>
    );
  }

  // Sinon, affichage normal
  return (
    <PageTemplate>
      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-6xl">
          {/* Titre de la catégorie */}
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800 capitalize">
              {LOCALIZE.categoryPage.title} : {categoryName}
            </h1>
            <Link
              to="/"
              className="rounded-md bg-white px-6 py-2 text-black transition hover:bg-gray-900 hover:text-white"
            >
              ⬅ {LOCALIZE.categoryPage.backToHome}
            </Link>
          </div>

          {/* Grille des produits */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="rounded-lg bg-white shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-56 w-full rounded-t-lg object-contain p-4"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                    {product.description}
                  </p>
                  <p className="mt-3 font-bold text-red-600">
                    {product.price.toFixed(2)}{" "}
                    {LOCALIZE.categoryPage.currencySymbol}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
