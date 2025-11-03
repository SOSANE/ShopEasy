// Importations nécessaires
import { useParams, Link } from "react-router";
import PageTemplate from "../composantes/PageTemplate";
import products from "../ressources/products";

export default function CategoryPage() {
  // On récupère le nom de la catégorie depuis l’URL
  const { categoryName } = useParams();

  // On filtre les produits de cette catégorie
  const filteredProducts = products.filter(
    p => p.category && p.category.toLowerCase() === categoryName.toLowerCase()
  );

  // Si aucun produit trouvé
  if (filteredProducts.length === 0) {
    return (
      <PageTemplate>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <h2 className="mb-4 text-2xl font-semibold text-gray-700">
            Aucun produit trouvé pour la catégorie "{categoryName}"
          </h2>
          <Link
            to="/"
            className="rounded-md bg-[#d9aa6e] px-6 py-2 text-white transition hover:bg-[#b5895b]"
          >
            Retour à l’accueil
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
              Catégorie : {categoryName}
            </h1>
            <Link
              to="/"
              className="rounded-md bg-[#d9aa6e] px-6 py-2 text-white transition hover:bg-[#b5895b]"
            >
              ⬅ Retour à l’accueil
            </Link>
          </div>

          {/* Grille des produits */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {filteredProducts.map(product => (
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
                  <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-600">{product.description}</p>
                  <p className="mt-3 font-bold text-red-600">{product.price.toFixed(2)} $</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
