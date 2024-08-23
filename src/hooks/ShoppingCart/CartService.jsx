import axios from "axios";

const API_URL = "https://opentableapi-67f2ff1a9563.herokuapp.com/api/shopping-cart";

//get cart by user
export const fetchCart = async (userId, guestId) => {
  const params = {};
  if (userId) params.userId = userId;
  if (guestId) params.guestId = guestId;

  try {
    const response = await axios.get(API_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    throw error;
  }
};
//add item to user cart
export const addItemToCart = async (userId, guestId, productId, quantity) => {
  const params = { productId, quantity };
  if (userId) params.userId = userId;
  if (guestId) params.guestId = guestId;

  try {
    const response = await axios.post(`${API_URL}/items`, null, { params });
    return response.data;
  } catch (error) {
    console.error("Failed to add item to cart:", error);
    throw error;
  }
};

//Remove item from user cart
export const removeItemFromCart = async (userId, guestId, productId) => {
  const params = { productId };
  if (userId) params.userId = userId;
  if (guestId) params.guestId = guestId;

  try {
    await axios.delete(`${API_URL}/item`, { params });
  } catch (error) {
    console.error("Failed to remove item from cart:", error);
    throw error;
  }
};

//Clear user cart
export const clearCart = async (userId, guestId) => {
  const params = {};
  if (userId) params.userId = userId;
  if (guestId) params.guestId = guestId;

  try {
    await axios.delete(`${API_URL}/items`, { params });
  } catch (error) {
    console.error("Failed to clear cart:", error);
    throw error;
  }
};
