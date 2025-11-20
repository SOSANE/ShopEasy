import { useRef } from "react";

import { useLocalization } from "../../state/contexts/LocalizationContext";
import LOCALIZE from "../../ressources/text/localize";

function ImageGrid({ productList }) {
  const scrollRef = useRef(null);
  const language = useLocalization();

  const scroll = direction => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full py-8">
      <div className="mb-4 flex items-center justify-between px-6">
        <h2 className="text-xl font-semibold text-black">{LOCALIZE.imageGrid.title}</h2>
      </div>

      <div
        ref={scrollRef}
        className="hide-scrollbar flex gap-4 overflow-x-scroll scroll-smooth px-6 pb-4"
      >
        {productList?.map(product => {
          return (
            <a
              key={product.id}
              href={`/product/${product.id}/`}
              className="flex w-[200px] shrink-0 flex-col rounded-lg bg-white shadow-md transition-transform duration-300 hover:scale-105"
            >
              <img
                src={product.images[0].lien}
                className="h-[200px] w-full rounded-t-lg object-cover"
              />
              <div className="p-3 text-left">
                <p className="text-sm font-medium text-gray-700">
                  {product?.titre || LOCALIZE.imageGrid.unknownProduct}
                </p>
                <p className="mt-1 font-semibold text-red-600">
                  {product?.prix} {LOCALIZE.currencySymbol}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default ImageGrid;
