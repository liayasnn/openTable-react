import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getUserById,
  updateUser,
} from "../../../hooks/UserService/UserService";
import "./EditCustomer.scss";
import AdminSidebar from "../../AdministratorSidebar/AdministratorSidebar";

const EditCustomer = () => {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const data = await getUserById(id);
        setCustomer(data);
      } catch (err) {
        setError("Failed to fetch customer data");
      }
    };
    fetchCustomer();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(id, customer);
      navigate("/admin/customers");
    } catch (err) {
      setError("Failed to update customer");
    }
  };

  return (
    <>
      <AdminSidebar />
      <div className="edit-customer">
        <h2 className="edit-customer__title">Edit Customer</h2>
        {error && <p className="edit-customer__error">{error}</p>}
        <form className="edit-customer__form" onSubmit={handleSubmit}>
          <div className="edit-customer__form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={customer.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="edit-customer__form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={customer.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="edit-customer__form-group">
            <label>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={customer.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <button className="edit-customer__form__submit-button" type="submit">
            Update Customer
          </button>
        </form>
      </div>
    </>
  );
};

export default EditCustomer;
