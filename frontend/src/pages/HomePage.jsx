// Components & fonction
import PageTemplate from "../components/PageTemplate";
import { useLocalization } from "../state/contexts/LocalizationContext";

// Constants
import LOCALIZE from "../ressources/text/localize";

function HomePage() {
  const language = useLocalization();

  return (
    <PageTemplate title={LOCALIZE.homepage.title}>
      
      {/* Section Hero - Bannière principale */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-12 rounded-lg mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Bienvenue sur ShopEasy
        </h1>
        <p className="text-xl mb-6">
          Vos achats en ligne, simplifiés
        </p>
        <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
          Découvrir nos produits
        </button>
      </div>

      {/* Section Catégories */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Nos Catégories
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Carte 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="text-5xl mb-4 text-center">👕</div>
            <h3 className="text-xl font-bold text-center mb-2">Vêtements</h3>
            <p className="text-gray-600 text-center">
              Découvrez notre collection de mode
            </p>
          </div>

          {/* Carte 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="text-5xl mb-4 text-center">📱</div>
            <h3 className="text-xl font-bold text-center mb-2">Électronique</h3>
            <p className="text-gray-600 text-center">
              Les dernières technologies
            </p>
          </div>

          {/* Carte 3 */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="text-5xl mb-4 text-center">🏠</div>
            <h3 className="text-xl font-bold text-center mb-2">Maison</h3>
            <p className="text-gray-600 text-center">
              Tout pour votre intérieur
            </p>
          </div>
        </div>
      </div>

      {/* Section Pourquoi nous choisir */}
      <div className="bg-gray-100 p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Pourquoi choisir ShopEasy ?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Avantage 1 */}
          <div className="text-center">
            <div className="text-4xl mb-3">🚚</div>
            <h3 className="font-bold text-lg mb-2">Livraison rapide</h3>
            <p className="text-gray-600">
              Recevez vos commandes en 48h
            </p>
          </div>

          {/* Avantage 2 */}
          <div className="text-center">
            <div className="text-4xl mb-3">💳</div>
            <h3 className="font-bold text-lg mb-2">Paiement sécurisé</h3>
            <p className="text-gray-600">
              Vos transactions sont protégées
            </p>
          </div>

          {/* Avantage 3 */}
          <div className="text-center">
            <div className="text-4xl mb-3">⭐</div>
            <h3 className="font-bold text-lg mb-2">Qualité garantie</h3>
            <p className="text-gray-600">
              Produits testés et approuvés
            </p>
          </div>
        </div>
      </div>

    </PageTemplate>
  );
}

export default HomePage;