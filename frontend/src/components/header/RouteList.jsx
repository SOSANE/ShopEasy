import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

export default function RouteList() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
       {/* <Route path="/login" element={<LoginPage />} /> */}
    </Routes>
  );
}
