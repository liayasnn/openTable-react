import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdministratorSidebar.scss";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/admin/login");
  };

  return (
    <div className="admin-sidebar">
      <h3 className="admin-sidebar__title">Admin Panel</h3>
      <ul className="admin-sidebar__nav">
        <li className="admin-sidebar__nav-item">
          <Link to="/admin/customers">Manage Customers</Link>
        </li>
        <li className="admin-sidebar__nav-item">
          <Link to="/admin/products">Manage Products</Link>
        </li>
        <li className="admin-sidebar__nav-item">
          <Link to="/admin/orders">Manage Orders</Link>
        </li>
        <li className="admin-sidebar__nav-item">
          <Link to="/admin/reviews">Manage Reviews</Link>
        </li>
        <li className="admin-sidebar__nav-item admin-sidebar__nav-item--logout">
          <button
            onClick={handleLogout}
            className="admin-sidebar__logout-button"
          >
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
