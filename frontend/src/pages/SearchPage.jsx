import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import PageTemplate from "../composantes/PageTemplate";
import { searchProducts } from "../api/produits";

export default function SearchPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  useEffect(() => {
    setLoading(true);
    searchProducts(query).then(data => {
      setResults(data);
      setLoading(false);
    });
  }, [query]);

  return (
    <PageTemplate>
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">
          Résultats pour : "{query}"
        </h1>

        {loading && <p className="text-stone-500">Recherche en cours...</p>}

        {!loading && results.length === 0 && (
          <p className="text-stone-500">Aucun produit trouvé.</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map(prod => (
            <div key={prod.id} className="bg-white shadow rounded-lg p-3">
              <img
                src={prod.images?.[0]?.lien ?? ""}
                alt={prod.titre}
                className="w-full h-40 object-cover rounded"
              />

              <h2 className="font-semibold mt-2">{prod.titre}</h2>
              <p className="text-stone-600">{prod.prix} $</p>
            </div>
          ))}
        </div>
      </div>
    </PageTemplate>
  );
}
