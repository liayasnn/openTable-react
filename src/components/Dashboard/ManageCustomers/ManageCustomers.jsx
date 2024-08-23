import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getAllUsers,
  deleteUser,
} from "../../../hooks/UserService/UserService";
import "./ManageCustomers.scss";
import AdminSidebar from "../../AdministratorSidebar/AdministratorSidebar";

const ManageCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getAllUsers();
        setCustomers(data);
      } catch (err) {
        setError("Failed to fetch customers");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setCustomers(customers.filter((customer) => customer.id !== id));
    } catch (err) {
      setError("Failed to delete customer");
    }
  };

  return (
    <>
      <AdminSidebar />
      <div className="manage-customers">
        <h2 className="manage-customers__title">Manage Customers</h2>
        <Link
          to="/admin/customers/new"
          className="manage-customers__add-button"
        >
          Add New Customer
        </Link>
        {loading ? (
          <p className="manage-customers__loading">Loading...</p>
        ) : error ? (
          <p className="manage-customers__error">{error}</p>
        ) : (
          <>
            <table className="manage-customers__table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phoneNumber}</td>
                    <td className="manage-customers__actions">
                      <Link to={`/admin/customers/edit/${customer.id}`}>
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(customer.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default ManageCustomers;
