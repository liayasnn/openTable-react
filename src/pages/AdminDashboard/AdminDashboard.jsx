import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.scss";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2 className="admin-dashboard__title">Administrator Dashboard</h2>
      <ul className="admin-dashboard__list">
        <li className="admin-dashboard__list__item">
          <Link
            to="/admin/customers"
            className="admin-dashboard__list__item__link"
          >
            Manage Customers
          </Link>
        </li>
        <li className="admin-dashboard__list__item">
          <Link
            to="/admin/products"
            className="admin-dashboard__list__item__link"
          >
            Manage Products
          </Link>
        </li>
        <li className="admin-dashboard__list__item">
          <Link
            to="/admin/orders"
            className="admin-dashboard__list__item__link"
          >
            Manage Orders
          </Link>
        </li>
        <li className="admin-dashboard__list__item">
          <Link
            to="/admin/reviews"
            className="admin-dashboard__list__item__link"
          >
            Manage Reviews
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
