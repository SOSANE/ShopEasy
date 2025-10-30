import { Route, Routes } from "react-router";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Error404Page from "./pages/Error404Page";
import ProductPage from "./pages/ProductPage";
// Constants
import PATH from "./ressources/routes/paths";

function RouteList() {
  return (
    <Routes>
      <Route path={PATH.home} element={<HomePage />} />
      <Route path={PATH.login} element={<LoginPage />} />
      <Route path={PATH.product} element={<ProductPage />} />
      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
}

export default RouteList;
