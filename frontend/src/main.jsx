import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./state/contexts/Provider.jsx";
import { CartProvider } from "./state/contexts/CartContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <Provider>
    <CartProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </CartProvider>
  </Provider>
);
