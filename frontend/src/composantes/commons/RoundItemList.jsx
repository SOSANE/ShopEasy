import { useLocalization } from "../../state/contexts/LocalizationContext";
import LOCALIZE from "../../ressources/text/localize";

function RoundItemList({ productList }) {
  const language = useLocalization();

  return (
    // Grille responsive 2 rangées
    <div className="grid grid-cols-2 justify-items-center gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {productList?.map(product => (
        <a
          key={product.id}
          href={`/product/${product.id}`} // redirection dynamique
          className="group flex flex-col items-center gap-3 text-center"
        >
          <div className="relative size-32 overflow-hidden rounded-full border-2 border-transparent shadow-md transition-all duration-300 group-hover:border-stone-900 group-hover:shadow-lg md:size-40">
            <img
              src={product.images[0].lien}
              alt={product.titre}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <div className="px-2">
            <p className="line-clamp-1 text-sm font-medium text-stone-900 group-hover:underline">
              {product.titre}
            </p>
            <p className="text-xs font-semibold text-stone-500">
              {product.prix} {LOCALIZE.currencySymbol}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}

export default RoundItemList;
