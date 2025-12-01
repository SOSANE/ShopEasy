import { Route, Routes } from "react-router";
import { useEffect, useState } from "react";

// Pages & fonctions
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Error404Page from "./pages/Error404Page";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./composantes/commons/PrivateRoute";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import { getAllProducts } from "./api/produits";
import { getAllCategories } from "./api/categorie";
import { useAuth } from "./state/contexts/AuthContext";

// Constantes
import PATH from "./ressources/routes/paths";

function RouteList() {
  const { isLoggedIn } = useAuth();
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const products = await getAllProducts();
      const categories = await getAllCategories();
      setProductList(products);
      setCategoryList(categories);
    }

    fetchData();
  }, []);

  return (
    <Routes>
      <Route
        path={PATH.home}
        element={<HomePage productList={productList} categoryList={categoryList} />}
      />
      <Route element={<PrivateRoute isAllowed={!isLoggedIn()} redirect={PATH.home} />}>
        <Route path={PATH.login} element={<LoginPage />} />
        <Route path={PATH.signup} element={<RegisterPage />} />
        <Route path={PATH.category} element={<CategoryPage products={productList} />} />
        <Route path={PATH.cart} element={<CartPage />} />
      </Route>

      <Route element={<PrivateRoute isAllowed={isLoggedIn()} redirect={PATH.home} />}>
        <Route path={PATH.profile} element={<ProfilePage />} />
      </Route>
      <Route path={PATH.product} element={<ProductPage />} />
      {/* Page non trouvée */}
      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
}

export default RouteList;
