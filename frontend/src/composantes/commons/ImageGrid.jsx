import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import products from "../../ressources/products";
export default function ImageGrid() {
  const scrollRef = useRef(null);

  const specialOffers = [
    {
      id: 1,
      img: "/image/casque.PNG",
      productId: 3,
    },
    {
      id: 2,
      img: "/image/bague.PNG",
      productId: 1,
    },
    {
      id: 3,
      img: "/image/sac.PNG",
      productId: 2,
    },
    {
      id: 4,
      img: "/image/lunette.PNG",
      productId: 7,
    },
      {
      id: 5,
      img: "/image/chaussure3.PNG",
      productId: 10,
    },
    {
      id: 6,
      img: "/image/sac_diamant.PNG",
      productId: 15,
    },
    {
      id: 7,
      img: "/image/ensemble_diamant.PNG",
      productId: 20,
    },
    {
      id: 8,
      img: "/image/rouge a levre.PNG",
      productId: 31,
    },
    {
      id: 9,
      img: "/image/ensemble.PNG",
      productId: 26,
    },
    {
      id: 10,
      img: "/image/sac_en_cuir.PNG",
      productId: 16,
    },

  ];

  const scroll = direction => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full py-8">
      <div className="mb-4 flex items-center justify-between px-6">
        <h2 className="text-xl font-semibold text-black">Offres spéciales</h2>
        
      </div>

      <div
        ref={scrollRef}
        className="hide-scrollbar flex gap-4 overflow-x-scroll scroll-smooth px-6 pb-4"
      >
        {specialOffers.map(offer => {
          const product = products.find(p => p.id === offer.productId);

          return (
            <a
              key={offer.id}
              href={`/product/${offer.productId}`}
              className="flex w-[200px] flex-shrink-0 flex-col rounded-lg bg-white shadow-md transition-transform duration-300 hover:scale-105"
            >
              <img src={offer.img} className="h-[200px] w-full rounded-t-lg object-cover" />
              <div className="p-3 text-left">
                <p className="text-sm font-medium text-gray-700">
                  {product?.name || "Produit inconnu"}
                </p>
                <p className="mt-1 font-semibold text-red-600">{product?.price?.toFixed(2)} $</p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
