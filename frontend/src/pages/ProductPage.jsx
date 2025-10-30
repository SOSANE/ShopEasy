import { useParams } from "react-router";
import products from "../ressources/products";

export default function ProductPage() {
  const { id } = useParams();
 
  const product = products.find((p) => p.id === parseInt(id));
  
  return (
    
    <div className="max-w-3xl mx-auto mt-10 bg-white rounded-lg shadow-lg p-8">
      <div className="flex justify-start mb-6">
          <a
            href="/"
            className="bg-amber-100[#d9aa6e] text-white px-4 py-2 rounded hover:bg-gray-600 transition">
            
            ⬅ 
          </a>
      </div>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h1 className="text-3xl font-bold mt-6">{product.name}</h1>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-2xl font-semibold text-red-600 mt-4">
        {product.price} $
      </p>

      <button className="mt-6 bg-green-600 text- px-6 py-2 rounded-lg hover:bg-green-700 transition">
        🛒 Ajouter au panier
      </button>

      

    </div>
  );
}
