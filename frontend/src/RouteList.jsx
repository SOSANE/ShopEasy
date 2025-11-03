import { Route, Routes } from "react-router-dom";

// Pages & fonctions
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Error404Page from "./pages/Error404Page";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./composantes/commons/PrivateRoute";
import { useAuth } from "./state/contexts/AuthContext";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
// Constantes
import PATH from "./ressources/routes/paths";

function RouteList() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route path={PATH.home} element={<HomePage />} />
      <Route element={<PrivateRoute isAllowed={!isLoggedIn()} redirect={PATH.home} />}>
        <Route path={PATH.login} element={<LoginPage />} />
        <Route path={PATH.signup} element={<RegisterPage />} />
        <Route path={PATH.category} element={<CategoryPage />} />
        <Route path={PATH.cart} element={<CartPage />} />
      </Route>
      <Route path={PATH.product} element={<ProductPage />} />
      {/* Page non trouvée */}
      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
}

export default RouteList;
