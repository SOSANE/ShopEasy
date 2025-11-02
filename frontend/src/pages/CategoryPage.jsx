// Importations nécessaires
import { useParams, Link } from "react-router";
import products from "../ressources/products";

export default function CategoryPage() {
  // On récupère le nom de la catégorie depuis l’URL
  const { categoryName } = useParams();

  // On filtre les produits de cette catégorie
  const filteredProducts = products.filter(
    (p) => p.category && p.category.toLowerCase() === categoryName.toLowerCase()
  );

  // Si aucun produit trouvé
  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Aucun produit trouvé pour la catégorie "{categoryName}"
        </h2>
        <Link
          to="/"
          className="bg-[#d9aa6e] text-white px-6 py-2 rounded-md hover:bg-[#b5895b] transition"
        >
          Retour à l’accueil
        </Link>
      </div>
    );
  }

  // Sinon, affichage normal
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Titre de la catégorie */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold capitalize text-gray-800">
            Catégorie : {categoryName}
          </h1>
          <Link
            to="/"
            className="bg-[#d9aa6e] text-white px-6 py-2 rounded-md hover:bg-[#b5895b] transition"
          >
            ⬅ Retour à l’accueil
          </Link>
        </div>

        {/* Grille des produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-transform hover:-translate-y-1"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-contain rounded-t-lg p-4"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-red-600 font-bold mt-3">
                  {product.price.toFixed(2)} $
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
