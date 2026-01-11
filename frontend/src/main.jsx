import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./state/contexts/Provider.jsx";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./state/contexts/CartProvider.jsx";

createRoot(document.getElementById("root")).render(
  <Provider>
    <StrictMode>
      <CartProvider>
        <App />
      </CartProvider>
    </StrictMode>
  </Provider>
);
