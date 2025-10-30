import products from "../ressources/products";

export default function RoundItemList() {
 

  return (
    <section className="bg-[#ffffff] py-10 w-full">
     

      {/* Grille responsive 2 rangées */}
      <div className="grid grid-cols-4 gap-6 justify-items-center px-6">
        {products.map((product) => (
          <a
            key={product.id}
            href={`/product/${product.id}`} // ✅ redirection dynamique
            className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gray-300 shadow-md hover:scale-105 transition-transform duration-300 flex items-center justify-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </a>
        ))}
      </div>
    </section>
  );
}


