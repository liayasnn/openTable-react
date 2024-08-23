import React, { useState } from "react";
import {
  getReviewsByProductId,
  deleteReview,
} from "../../../hooks/ReviewService/ReviewService";
import "./ManageReviews.scss";
import AdminSidebar from "../../AdministratorSidebar/AdministratorSidebar";

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");

  const fetchReviews = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getReviewsByProductId(selectedProductId);
      setReviews(data);
    } catch (err) {
      setError("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteReview(id);
      setReviews(reviews.filter((review) => review.id !== id));
    } catch (err) {
      setError("Failed to delete review");
    }
  };

  return (
    <>
      <AdminSidebar />
      <div className="manage-reviews">
        <h2 className="manage-reviews__title">Manage Reviews</h2>

        <div className="manage-reviews__product-filter">
          <label htmlFor="productId">Filter by Product ID:</label>
          <input
            type="text"
            id="productId"
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            placeholder="Enter Product ID"
          />
          <button onClick={fetchReviews}>Fetch Reviews</button>
        </div>

        {loading ? (
          <p className="manage-reviews__loading">Loading...</p>
        ) : error ? (
          <p className="manage-reviews__error">{error}</p>
        ) : (
          <>
            {reviews.length > 0 ? (
              <table className="manage-reviews__reviews-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Product ID</th>
                    <th>User ID</th>
                    <th>Rating</th>
                    <th>Comment</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr key={review.id}>
                      <td>{review.id}</td>
                      <td>{review.product?.id || "N/A"}</td>
                      <td>{review.user?.id || "Guest"}</td>
                      <td>{review.rating}</td>
                      <td>{review.comment}</td>
                      <td className="manage-reviews__actions">
                        <button onClick={() => handleDelete(review.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="manage-reviews__no-reviews">
                No reviews found for this product
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ManageReviews;
