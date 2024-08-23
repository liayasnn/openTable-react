import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/Context/AuthContext/AuthContext";
import { getOrdersByUserIdOrGuestId } from "../../hooks/Orders/OrderService";
import "./MyOrders.scss";

const MyOrders = () => {
  const { user, guestId } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userOrders = await getOrdersByUserIdOrGuestId(user?.id, guestId);
        setOrders(userOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    if (user || guestId) {
      fetchOrders();
    }
  }, [user, guestId]);

  if (!user && !guestId) {
    return (
      <p className="my-orders__message">
        You need to log in or continue as a guest to view your orders.
      </p>
    );
  }

  return (
    <div className="my-orders">
      <h2 className="my-orders__title">My Orders</h2>
      {orders.length > 0 ? (
        <ul className="my-orders__list">
          {orders.map((order) => (
            <li key={order.id} className="my-orders__list-item">
              <h3 className="my-orders__order-number">
                Order Number: {order.orderNumber}
              </h3>
              <p className="my-orders__status">Status: {order.status}</p>
              <p className="my-orders__total-items">
                Total Items: {order.items.length}
              </p>
              <ul className="my-orders__items">
                {order.items.map((item, index) => (
                  <li key={index} className="my-orders__items__item-detail">
                    {item.product.name} - Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p className="my-orders__empty">You have no orders yet.</p>
      )}
    </div>
  );
};

export default MyOrders;
