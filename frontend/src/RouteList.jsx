import { Route, Routes } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

// Constants
import PATH from "./ressources/routes/paths";

function RouteList() {
  return (
    <Routes>
      <Route path={PATH.home} element={<HomePage />} />
      <Route path={PATH.login} element={<LoginPage />} />
    </Routes>
  );
}

export default RouteList;
