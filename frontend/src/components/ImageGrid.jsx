import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ImageGrid() {
  const scrollRef = useRef(null);

  const images = [
    { src: "https://via.placeholder.com/200x200/000000/FFFFFF?text=Image+1", title: "Produit 1", price: "19,99 $" },
    { src: "https://via.placeholder.com/200x200/000000/FFFFFF?text=Image+2", title: "Produit 2", price: "29,99 $" },
    { src: "https://via.placeholder.com/200x200/000000/FFFFFF?text=Image+3", title: "Produit 3", price: "39,99 $" },
    { src: "https://via.placeholder.com/200x200/000000/FFFFFF?text=Image+4", title: "Produit 4", price: "49,99 $" },
    { src: "https://via.placeholder.com/200x200/000000/FFFFFF?text=Image+5", title: "Produit 5", price: "59,99 $" },
    { src: "https://via.placeholder.com/200x200/000000/FFFFFF?text=Image+6", title: "Produit 6", price: "69,99 $" },
    { src: "https://via.placeholder.com/200x200/000000/FFFFFF?text=Image+7", title: "Produit 7", price: "79,99 $" },
  ];

  // Fonction pour défiler vers la gauche ou la droite
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className=" py-8 w-full">
      {/* Titre de la section */}
      <div className="flex items-center justify-between px-6 mb-4">
        <h2 className="text-black text-xl font-semibold">Offres spéciales </h2>
        
      </div>

      {/* Conteneur scrollable horizontal */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-scroll scroll-smooth px-6 pb-4 hide-scrollbar"
      >
        {images.map((item, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 bg-white rounded-lg shadow-md w-[200px] flex flex-col hover:scale-105 transition-transform duration-300"
          >
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-[200px] object-cover rounded-t-lg"
            />
            <div className="p-3 text-left">
              <p className="text-sm font-medium text-gray-700">{item.title}</p>
              <p className="text-red-600 font-semibold mt-1">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
