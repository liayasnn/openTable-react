import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/ShoppingCart/CartContext";
import "./ShoppingCart.scss";

const ShoppingCart = ({ handleCartClick }) => {
  const {
    cart,
    totalAmount,
    totalItems,
    updateQuantity,
    removeFromCart,
    clearShoppingCart,
  } = useCart();

  return (
    <div className="shopping-cart">
      {cart.length > 0 ? (
        <div>
          {cart.map((item) => (
            <div className="shopping-cart__item" key={item.product.id}>
              <img
                src={item.product.imageurl}
                alt={item.product.name}
                className="shopping-cart__item-image"
              />
              <div className="shopping-cart__item-details">
                <h3 className="shopping-cart__item-name">
                  {item.product.name}
                </h3>
                <p className="shopping-cart__item-price">
                  £{item.product.price}
                </p>
                <div className="shopping-cart__item-quantity">
                  <button
                    className="shopping-cart__item-button buttonInteract"
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1} // Disable if quantity is 1
                  >
                    -
                  </button>
                  <span className="shopping-cart__item-quantity-value">
                    {item.quantity}
                  </span>
                  <button
                    className="shopping-cart__item-button buttonInteract"
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  className="shopping-cart__item-remove buttonInteract"
                  onClick={() => removeFromCart(item.product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="shopping-cart__summary">
            <p>Total Items: {totalItems}</p>
            <p>Total Amount: £{totalAmount.toFixed(2)}</p>
          </div>
          <div className="shopping-cart__checkout">
            <Link to="/checkout">
              <button
                className="shopping-cart__checkout-button"
                onClick={handleCartClick}
              >
                Checkout
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <p className="shopping-cart__empty">Your cart is empty</p>
      )}
      <button
        onClick={clearShoppingCart}
        className="shopping-cart__clear-button"
      >
        Clear Cart
      </button>
    </div>
  );
};

export default ShoppingCart;
