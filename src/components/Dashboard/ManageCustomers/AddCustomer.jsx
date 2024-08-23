import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../hooks/UserService/UserService";
import "./AddCustomer.scss";
import AdminSidebar from "../../AdministratorSidebar/AdministratorSidebar";

const AddCustomer = () => {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(customer);
      navigate("/admin/customers");
    } catch (err) {
      setError("Failed to add customer");
    }
  };

  return (
    <>
      <AdminSidebar />
      <div className="add-customer">
        <h2 className="add-customer__title">Add New Customer</h2>
        {error && <p className="add-customer__error">{error}</p>}
        <form className="add-customer__form" onSubmit={handleSubmit}>
          <div className="add-customer__form-group">
            <label className="add-customer__label">Name:</label>
            <input
              type="text"
              name="name"
              value={customer.name}
              onChange={handleInputChange}
              required
              className="add-customer__input"
            />
          </div>
          <div className="add-customer__form-group">
            <label className="add-customer__label">Email:</label>
            <input
              type="email"
              name="email"
              value={customer.email}
              onChange={handleInputChange}
              required
              className="add-customer__input"
            />
          </div>
          <div className="add-customer__form-group">
            <label className="add-customer__label">Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={customer.phoneNumber}
              onChange={handleInputChange}
              required
              className="add-customer__input"
            />
          </div>
          <button type="submit" className="add-customer__submit-button">
            Add Customer
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCustomer;
