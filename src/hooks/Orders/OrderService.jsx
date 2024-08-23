import axios from "axios";


const API_URL = 'https://opentableapi-67f2ff1a9563.herokuapp.com/api/orders';
//place order after checkout
export const placeOrder = async ({
  userId,
  guestId,
  email,
  paymentId,
  address,
  paypalResponseJson,
}) => {
  try {
    const response = await axios.post(API_URL, {
      userId,
      guestId,
      email,
      paymentId,
      address,
      paypalResponseJson,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to place order:", error);
    throw error;
  }
};

//get orders by user or guest
export const getOrdersByUserIdOrGuestId = async (userId, guestId) => {
  const params = {};
  if (userId) params.userId = userId;
  if (guestId) params.guestId = guestId;

  try {
    const response = await axios.get(API_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }
};

//get all orders
export const getAllOrdersForAdmin = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch admin orders:", error);
    throw error;
  }
};

//Admin:update status for orders
export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await axios.put(`${API_URL}/${orderId}`, null, {
      params: { status },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update order status:", error);
    throw error;
  }
};

//Admin:update address for orders
export const updateOrderAddress = async (orderId, newAddress) => {
  try {
    const response = await axios.put(
      `${API_URL}/admin/${orderId}/address`,
      newAddress
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update order address:", error);
    throw error;
  }
};

//Admin:delete orders
export const deleteOrder = async (orderId) => {
  try {
    await axios.delete(`${API_URL}/admin/${orderId}`);
  } catch (error) {
    console.error("Failed to delete order:", error);
    throw error;
  }
};
