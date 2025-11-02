// src/composantes/commons/CategoryFilters.jsx
import { Link } from "react-router-dom";

export default function CategoryFilters({ categories }) {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {categories.map((cat, idx) => (
        <Link
          key={idx}
          to={`/category/${cat.toLowerCase()}`} // route dynamique
          className="bg-[#ffffff] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#b5895b] transition"
        >
          {cat}
        </Link>
      ))}
    </div>
  );
}
