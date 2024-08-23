import React, { createContext, useContext, useState, useEffect } from "react";
import {
  fetchCart,
  addItemToCart,
  removeItemFromCart,
  clearCart,
} from "./CartService";
import { useAuth } from "../Context/AuthContext/AuthContext";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const { user, guestId } = useAuth();
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    loadCart();
  }, [user, guestId]);

  const loadCart = async () => {
    try {
      const fetchedCart = await fetchCart(user?.id, guestId);
      setCart(fetchedCart.items || []);
      calculateTotals(fetchedCart.items || []);
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const updatedCart = await addItemToCart(
        user?.id,
        guestId,
        productId,
        quantity
      );
      setCart(updatedCart.items);
      calculateTotals(updatedCart.items);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await removeItemFromCart(user?.id, guestId, productId);
      loadCart();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const clearShoppingCart = async () => {
    try {
      await clearCart(user?.id, guestId);
      setCart([]);
      setTotalAmount(0);
      setTotalItems(0);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const calculateTotals = (items) => {
    const totalAmount = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    setTotalAmount(totalAmount);
    setTotalItems(totalItems);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalAmount,
        totalItems,
        updateQuantity,
        removeFromCart,
        clearShoppingCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
