import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { SearchProvider } from "./context/search";
import { CartProvider, cartProvider } from "./context/cart";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
);
