import { Navigate, Outlet } from "react-router";

export function PrivateRoute({ redirect, isAllowed }) {
  return isAllowed ? <Outlet /> : <Navigate to={redirect} />;
}

export default PrivateRoute;
