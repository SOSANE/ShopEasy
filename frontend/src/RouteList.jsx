import { Route, Routes } from "react-router";

// Pages & fonctions
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Error404Page from "./pages/Error404Page";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./composantes/commons/PrivateRoute";
import { useAuth } from "./state/contexts/AuthContext";

// Constantes
import PATH from "./ressources/routes/paths";

function RouteList() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route path={PATH.home} element={<HomePage />} />
      <Route element={<PrivateRoute isAllowed={!isLoggedIn} redirect={PATH.home} />}>
        <Route path={PATH.login} element={<LoginPage />} />
        <Route path={PATH.signup} element={<RegisterPage />} />
      </Route>

      {/* Page non trouvée */}
      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
}

export default RouteList;
