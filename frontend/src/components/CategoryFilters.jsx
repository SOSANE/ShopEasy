export default function CategoryFilters({ categories }) {
  return (
    <div className="w-full flex flex-wrap justify-evenly items-center gap-4 mt-6 px-4">
      {categories.map((cat, idx) => (
        <button
          key={idx}
          className="bg-white text-gray-800 px-6 py-2 rounded-full shadow-md hover:bg-gray-200 transition">
            
          {cat}
        </button>
      ))}
    </div>
  );
}
