export default function RoundItemList() {
  // Tableau d’images (tu peux remplacer les URL par tes vraies images)
  const items = [
    { id: 1, src: "https://via.placeholder.com/150", label: "Mode" },
    { id: 2, src: "https://via.placeholder.com/150", label: "Beauté" },
    { id: 3, src: "https://via.placeholder.com/150", label: "Maison" },
    { id: 4, src: "https://via.placeholder.com/150", label: "Jeux" },
    { id: 5, src: "https://via.placeholder.com/150", label: "Technologie" },
    { id: 6, src: "https://via.placeholder.com/150", label: "Jardin" },
    { id: 7, src: "https://via.placeholder.com/150", label: "Animaux" },
    { id: 8, src: "https://via.placeholder.com/150", label: "Livres" },
  ];

  return (
    <section className="bg-[#ffffff] py-10 w-full">
     

      {/* Grille responsive 2 rangées */}
      <div className="grid grid-cols-4 gap-6 justify-items-center px-6">
        {items.map((item) => (
          <a
            key={item.id}
            href="#"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gray-300 shadow-md hover:scale-105 transition-transform duration-300 flex items-center justify-center"
          >
            <img
              src={item.src}
              alt={item.label}
              className="object-cover w-full h-full"
            />
          </a>
        ))}
      </div>
    </section>
  );
}


