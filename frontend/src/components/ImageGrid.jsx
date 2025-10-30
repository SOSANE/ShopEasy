import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import products from "../ressources/products";

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

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-8 w-full">
      <div className="flex items-center justify-between px-6 mb-4">
        <h2 className="text-black text-xl font-semibold">Offres spéciales</h2>
        <div className="flex gap-3">
          <button onClick={() => scroll("left")}><FaChevronLeft /></button>
          <button onClick={() => scroll("right")}><FaChevronRight /></button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-scroll scroll-smooth px-6 pb-4 hide-scrollbar"
      >
        {specialOffers.map((offer) => {
          const product = products.find((p) => p.id === offer.productId);

          return (
            <a
              key={offer.id}
              href={`/product/${offer.productId}`} 
              className="flex-shrink-0 bg-white rounded-lg shadow-md w-[200px] flex flex-col hover:scale-105 transition-transform duration-300">
              
              <img
                src={offer.img} 
                className="w-full h-[200px] object-cover rounded-t-lg"/>
              <div className="p-3 text-left">
                <p className="text-sm font-medium text-gray-700">
                  {product?.name || "Produit inconnu"}
                </p>
                <p className="text-red-600 font-semibold mt-1">
                  {product?.price?.toFixed(2)} $
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
