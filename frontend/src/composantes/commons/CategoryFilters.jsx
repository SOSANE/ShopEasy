import { Link } from "react-router";

export default function CategoryFilters({ categories }) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {categories.map((cat, idx) => (
        <Link
          key={idx}
          to={`/category/${cat.toLowerCase()}`}
          className="rounded-full bg-[#ffffff] px-6 py-2 text-white shadow-md transition hover:bg-[#b5895b]"
        >
          {cat}
        </Link>
      ))}
    </div>
  );
}
