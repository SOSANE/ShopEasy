import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocalization } from "../../state/contexts/LocalizationContext";
import LOCALIZE from "../../ressources/text/localize";

function ImageGrid({ productList }) {
  const scrollRef = useRef(null);
  const language = useLocalization();

  const scroll = direction => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-stone-900">{LOCALIZE.imageGrid.title}</h2>

        <div className="hidden gap-2 text-black! md:flex">
          <button
            onClick={() => scroll("left")}
            className="flex size-8 items-center justify-center! rounded-full! border! border-stone-200! bg-white! shadow-sm! transition-colors! hover:bg-stone-100!"
          >
            <ChevronLeft className="size-4 shrink-0" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="flex size-8 items-center justify-center! rounded-full! border! border-stone-200! bg-white! shadow-sm! transition-colors! hover:bg-stone-100!"
          >
            <ChevronRight className="size-4 shrink-0" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="hide-scrollbar -mx-4 flex gap-6 overflow-x-auto scroll-smooth px-4 pb-8 md:mx-0 md:px-0"
      >
        {productList?.map(product => (
          <a
            key={product.id}
            href={`/product/${product.id}/`}
            className="group relative flex w-[220px] shrink-0 flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="relative aspect-square overflow-hidden bg-stone-100">
              <img
                src={product.images[0].lien}
                alt={product.titre}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <p className="line-clamp-2 text-sm font-medium text-stone-900 group-hover:text-blue-600">
                {product?.titre || LOCALIZE.imageGrid.unknownProduct}
              </p>
              <p className="mt-auto pt-2 text-lg font-bold text-stone-900">
                {product?.prix} {LOCALIZE.currencySymbol}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default ImageGrid;
