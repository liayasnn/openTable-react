import React, { useState } from "react";
import { useCart } from "../../hooks/ShoppingCart/CartContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/Context/AuthContext/AuthContext";
import { placeOrder } from "../../hooks/Orders/OrderService";
import "./Checkout.scss";

const Checkout = () => {
  const { cart, totalAmount, totalItems, clearShoppingCart } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [guestEmail, setGuestEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isGuestEmailSubmitted, setIsGuestEmailSubmitted] = useState(false);

  // Retrieve or generate guestId
  const guestId = (() => {
    const storedGuestId = localStorage.getItem("guestId");
    if (storedGuestId) {
      return storedGuestId;
    }
    const newGuestId = `guest_${Date.now()}`;
    localStorage.setItem("guestId", newGuestId);
    return newGuestId;
  })();

  const handleGuestEmailSubmit = (e) => {
    e.preventDefault();

    if (!guestEmail) {
      setEmailError("Please provide an email address.");
      return;
    }

    setIsGuestEmailSubmitted(true);
    setEmailError("");
  };

  const handleApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();

      const paymentId = details.id;
      const paypalResponseJson = JSON.stringify(details);

      if (!user && !guestEmail) {
        setEmailError("Please provide an email address.");
        return;
      }

      await placeOrder({
        userId: user ? user.id : null,
        guestId: user ? null : guestId,
        email: user ? user.email : guestEmail,
        paymentId,
        address: {
          street: details.purchase_units[0].shipping.address.address_line_1,
          city: details.purchase_units[0].shipping.address.admin_area_2,
          state: details.purchase_units[0].shipping.address.admin_area_1,
          postcode: details.purchase_units[0].shipping.address.postal_code,
          country: details.purchase_units[0].shipping.address.country_code,
        },
        paypalResponseJson,
      });

      clearShoppingCart();
      alert("Transaction completed by " + details.payer.name.given_name);
      navigate("/");
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order");
    }
  };

  return (
    <div className="checkout">
      <h2 className="checkout__title">Checkout</h2>

      <div className="checkout__cart-summary">
        <h3 className="checkout__cart-title">Your Cart</h3>
        <ul className="checkout__cart-items">
          {cart.map((item) => (
            <li className="checkout__cart-item" key={item.product.id}>
              {item.product.name} - £{item.product.price} x {item.quantity}
            </li>
          ))}
        </ul>
        <p className="checkout__total-items">Total Items: {totalItems}</p>
        <p className="checkout__total-amount">
          Total Amount: £{totalAmount.toFixed(2)}
        </p>
      </div>

      {!user && !isGuestEmailSubmitted && (
        <form
          className="checkout__guest-email"
          onSubmit={handleGuestEmailSubmit}
        >
          <label htmlFor="guestEmail">
            Enter your email to receive order confirmation:
          </label>
          <input
            type="email"
            id="guestEmail"
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            placeholder="guest@example.com"
            required
          />
          {emailError && <p className="checkout__error">{emailError}</p>}
          <button type="submit">Submit Email</button>
        </form>
      )}

      {(user || isGuestEmailSubmitted) && (
        <div className="checkout__paypal-buttons">
          <PayPalScriptProvider
            options={{
              "client-id":
                "AYLp4lmnX5vb9h0ahgguIy1pyYxtkAqRGxlI4JgLlIN_-6a45tvzsiMZ18pAZKjgnjeZ-hu1qAvZqvJ0",
              currency: "GBP",
              locale: "en_GB",
            }}
          >
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: totalAmount.toFixed(2),
                      },
                    },
                  ],
                });
              }}
              onApprove={handleApprove}
              onError={(error) => {
                console.error("PayPal Checkout Error:", error);
                alert(
                  "Something went wrong with the payment process. Please try again."
                );
              }}
            />
          </PayPalScriptProvider>
        </div>
      )}
    </div>
  );
};

export default Checkout;
