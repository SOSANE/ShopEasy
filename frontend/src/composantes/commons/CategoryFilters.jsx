import { Link } from "react-router";

function CategoryFilters({ categories }) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {categories?.map(cat => (
        <Link
          key={cat.id}
          to={`/category/${cat.id}/`}
          className="rounded-full bg-[#ffffff] px-6 py-2 text-white shadow-md transition hover:bg-[#000000]"
        >
          {cat.title}
        </Link>
      ))}
    </div>
  );
}
export default CategoryFilters;
