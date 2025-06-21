import { useState, useContext, createContext, useEffect } from "react";

// created a shared global context for cart data using createContext()
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Initializes the cart from localStorage when the app loads.
  useEffect(() => {
    let existingCartItem = localStorage.getItem("cart");
    if (existingCartItem) setCart(JSON.parse(existingCartItem));
  }, []);

  // Wraps your entire app with <CartProvider> to make [cart, setCart] available globally.
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };