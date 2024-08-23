import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import "./Navbar.scss";
import logo from "../../assets/images/logo.png";
import useWindowSize from "../../hooks/useWindowSize.jsx";
import closeMenu from "../../assets/svgs/close-menu.svg";
import openMenu from "../../assets/svgs/open-menu.svg";
import AccountIcon from "../../assets/svgs/AccountIcon.jsx";
import ShoppingCartSVG from "../../assets/svgs/ShoppingCartSVG.jsx";

import CartPopUp from "../CartPopUp/CartPopUp.jsx";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false); //State to show menu for mobile navigation bar
  const [showCart, setShowCart] = useState(false); // State to control cart popup visibility
  const windowIsDesktop = useWindowSize(1024);
  const location = useLocation(); //useLocation in order to fix bug where popup cart when clicked will take you to /home and show the cart instead of showing the popup cart in whatever endpoint you're currently in.
  const currentPath = location.pathname;

  useEffect(() => {
    if (windowIsDesktop) {
      setShowMenu(false);
    }
  }, [windowIsDesktop]);

  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  const handleCartClick = () => {
    setShowCart(!showCart); // Toggle cart popup
    console.log("Cart clicked!");
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/gallery", label: "Gallery" },
    { to: "/shopping", label: "Shopping" },
    { to: "/contact-us", label: "Contact Us" }, // Added Contact Us link
    { to: "/account", label: <AccountIcon /> },
    { to: currentPath, label: <ShoppingCartSVG onClick={handleCartClick} /> }, // Toggle cart on click
    { to: "/admin/login", label: "Admin" }, // Added Admin Login link
  ];

  const desktopNavLinks = links.filter((link) => link.to !== "");
  const desktopNav = (
    <nav className="navbar__nav">
      {desktopNavLinks.map((link, index) => (
        <NavLink key={index} className="navbar__nav-item" to={link.to}>
          {link.label}
        </NavLink>
      ))}
    </nav>
  );

  const mobileNav = (
    <nav className="navbar__nav">
      {links.map((link, index) => (
        <Link
          key={index}
          onClick={handleClick}
          className="navbar__nav-item"
          to={link.to}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  const menuIcon = showMenu ? closeMenu : openMenu;
  const navbarClass = showMenu ? "navbar navbar--active" : "navbar";

  return (
    <div className={navbarClass}>
      <div className="navbar__container">
        <Link to="/">
          <img
            src={logo}
            className="navbar__container-logo"
            alt="Open Table logo"
          />
        </Link>
        {windowIsDesktop ? (
          desktopNav
        ) : (
          <button
            onClick={handleClick}
            className="navbar__container-button"
            aria-label="menu-button"
          >
            <img
              src={menuIcon}
              className="navbar__container-button-image"
              alt="button"
            />
          </button>
        )}
      </div>
      {!windowIsDesktop && showMenu && mobileNav}
      {showCart && (
        <CartPopUp handleCartClick={handleCartClick} closeMenu={closeMenu} />
      )}
    </div>
  );
};

export default Navbar;
