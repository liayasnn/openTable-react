import React, { useState, useEffect } from "react";
import {
  getAllOrdersForAdmin,
  updateOrderStatus,
  updateOrderAddress,
  deleteOrder,
} from "../../../hooks/Orders/OrderService";
import "./ManageOrders.scss";
import AdminSidebar from "../../AdministratorSidebar/AdministratorSidebar";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [currentOrderNumber, setCurrentOrderNumber] = useState(null);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    postcode: "",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrdersForAdmin();
        setOrders(data);
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId, status) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, status);
      setOrders(
        orders.map((order) =>
          order.id === orderId
            ? { ...order, status: updatedOrder.status }
            : order
        )
      );
    } catch (err) {
      setError("Failed to update order status");
    }
  };

  const openAddressModal = (orderId) => {
    setCurrentOrderNumber(orderId);
    setShowAddressModal(true);
  };

  const closeAddressModal = () => {
    setShowAddressModal(false);
    setCurrentOrderNumber(null);
    setNewAddress({ street: "", city: "", state: "", postcode: "" });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const handleSubmitAddress = async () => {
    try {
      const updatedOrder = await updateOrderAddress(
        currentOrderNumber,
        newAddress
      );
      setOrders(
        orders.map((order) =>
          order.id === currentOrderNumber
            ? { ...order, shippingAddress: updatedOrder.shippingAddress }
            : order
        )
      );
      closeAddressModal();
    } catch (err) {
      setError("Failed to update address");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (err) {
      setError("Failed to delete order");
    }
  };

  return (
    <>
      <AdminSidebar />
      <div className="manage-orders">
        <h2 className="manage-orders__title">Manage Orders</h2>
        {loading ? (
          <p className="manage-orders__loading">Loading...</p>
        ) : error ? (
          <p className="manage-orders__error">{error}</p>
        ) : (
          <>
            <table className="manage-orders__orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Order Number</th>
                  <th>Customer ID</th>
                  <th>Guest ID</th>
                  <th>Total Items</th>
                  <th>Total Price</th>
                  <th>Shipping Address</th>
                  <th>Payment ID</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const totalItems = order.items.reduce(
                    (acc, item) => acc + item.quantity,
                    0
                  );
                  const totalPrice = order.items.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  );
                  return (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.orderNumber}</td>
                      <td>{order.user ? order.user.id : "N/A"}</td>
                      <td>{order.guestId}</td>
                      <td>{totalItems}</td>
                      <td>£{totalPrice.toFixed(2)}</td>
                      <td>
                        {order.shippingAddress
                          ? `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.postcode}`
                          : "N/A"}
                      </td>
                      <td>{order.paymentId}</td>
                      <td>{order.status}</td>
                      <td className="manage-orders__actions">
                        <select
                          onChange={(e) =>
                            handleUpdateStatus(order.id, e.target.value)
                          }
                          value={order.status}
                        >
                          <option value="PENDING">Pending</option>
                          <option value="SHIPPED">Shipped</option>
                          <option value="DELIVERED">Delivered</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                        <button onClick={() => openAddressModal(order.id)}>
                          Update Address
                        </button>
                        <button onClick={() => handleDeleteOrder(order.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {showAddressModal && (
              <div className="manage-orders__address-modal">
                <h3>Update Shipping Address</h3>
                <input
                  type="text"
                  name="street"
                  value={newAddress.street}
                  onChange={handleAddressChange}
                  placeholder="Street"
                />
                <input
                  type="text"
                  name="city"
                  value={newAddress.city}
                  onChange={handleAddressChange}
                  placeholder="City"
                />
                <input
                  type="text"
                  name="state"
                  value={newAddress.state}
                  onChange={handleAddressChange}
                  placeholder="County/State"
                />
                <input
                  type="text"
                  name="postcode"
                  value={newAddress.postcode}
                  onChange={handleAddressChange}
                  placeholder="Postcode"
                />
                <button onClick={handleSubmitAddress}>Submit</button>
                <button onClick={closeAddressModal}>Cancel</button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ManageOrders;
