import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getAllProducts,
  deleteProduct,
} from "../../../hooks/Products/ProductService";
import "./ManageProducts.scss";
import AdminSidebar from "../../AdministratorSidebar/AdministratorSidebar";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      setError("Failed to delete product");
    }
  };

  return (
    <>
      <AdminSidebar />
      <div className="manage-products">
        <h2 className="manage-products__title">Manage Products</h2>
        {loading ? (
          <p className="manage-products__loading">Loading...</p>
        ) : error ? (
          <p className="manage-products__error">{error}</p>
        ) : (
          <>
            <Link
              to="/admin/products/new"
              className="manage-products__add-product-button"
            >
              Add New Product
            </Link>
            <table className="manage-products__products-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Product Group</th>
                  <th>Image URL</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>
                      {typeof product.description === "object"
                        ? JSON.stringify(product.description, null, 2) // Pretty-print JSON
                        : product.description}
                    </td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>{product.productGroup}</td>
                    <td>
                      <a
                        href={product.imageurl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {product.imageurl}
                      </a>
                    </td>
                    <td className="manage-products__actions">
                      <Link to={`/admin/products/edit/${product.id}`}>
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(product.id)}>
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

export default ManageProducts;
