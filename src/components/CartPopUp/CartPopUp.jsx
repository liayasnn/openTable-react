import React from "react";
import ShoppingCart from "../ShoppingCart/ShoppingCart.jsx";
import "./CartPopUp.scss";
const CartPopUp = ({ handleCartClick, closeMenu }) => {
  return (
    <div className="cart-popup">
      <div className="cart-popup__backdrop"></div>
      <img
        className="cart-popup__close"
        src={closeMenu}
        alt="close-menu-button"
        onClick={handleCartClick}
      />

      <ShoppingCart handleCartClick={handleCartClick} />
    </div>
  );
};

export default CartPopUp;
