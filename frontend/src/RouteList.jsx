import { Route, Routes } from "react-router";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Error404Page from "./pages/Error404Page";
import ProductDetailsPage from "./pages/merchant/ProductDetailsPage";
import CreateProductPage from "./pages/merchant/CreateProductPage";
import EditProductPage from "./pages/merchant/EditProductPage";


// Constants
import PATH from "./ressources/routes/paths";

function RouteList() {
  return (
    <Routes>
      <Route path={PATH.home} element={<HomePage />} />
      <Route path={PATH.login} element={<LoginPage />} />

      {/* TODO: Englober dans une route privée */}
      <Route path={PATH.createProduct} element={<CreateProductPage />} /> 
      <Route path={PATH.editProduct} element={<EditProductPage />} />
      <Route path={PATH.productDetails} element={<ProductDetailsPage />} />

      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
}

export default RouteList;
