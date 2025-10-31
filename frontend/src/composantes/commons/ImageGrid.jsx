import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import products from "../../ressources/products";

export default function ImageGrid() {
  const scrollRef = useRef(null);

  const specialOffers = [
    {
      id: 1,
      img: "https://via.placeholder.com/200x200/000000/FFFFFF?text=Promo+Montre",
      productId: 3,
    },
    {
      id: 2,
      img: "https://via.placeholder.com/200x200/111111/FFFFFF?text=Promo+Casque",
      productId: 1,
    },
    {
      id: 3,
      img: "https://via.placeholder.com/200x200/222222/FFFFFF?text=Promo+Sac",
      productId: 5,
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
        <div className="flex gap-3">
          <button onClick={() => scroll("left")}>
            <FaChevronLeft />
          </button>
          <button onClick={() => scroll("right")}>
            <FaChevronRight />
          </button>
        </div>
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
