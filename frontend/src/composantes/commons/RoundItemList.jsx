import products from "../../ressources/products";

export default function RoundItemList() {
  return (
    <section className="w-full bg-[#ffffff] py-10">
      {/* Grille responsive 2 rangées */}
      <div className="grid grid-cols-4 justify-items-center gap-6 px-6">
        {products.map(product => (
          <a
            key={product.id}
            href={`/product/${product.id}`} // redirection dynamique
            className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-gray-300 shadow-md transition-transform duration-300 hover:scale-105 md:h-40 md:w-40"
          >
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </a>
        ))}
      </div>
    </section>
  );
}
