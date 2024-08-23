import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../hooks/Products/ProductService";
import { useCart } from "../../hooks/ShoppingCart/CartContext";
import { useAuth } from "../../hooks/Context/AuthContext/AuthContext";
import {
  addReview,
  getReviewsByProductId,
} from "../../hooks/ReviewService/ReviewService";
import "./ProductPage.scss";
import ArrowLeft from "../../assets/svgs/ArrowLeft";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { updateQuantity, guestId } = useCart();
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({
    rating: 1,
    comment: "",
    guestName: user ? user.name : "",
    isAnonymous: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductById(productId);
        setProduct(product);
      } catch (error) {
        console.error(`Failed to load product with id ${productId}:`, error);
      }
    };

    const fetchReviews = async () => {
      try {
        const productReviews = await getReviewsByProductId(productId);
        setReviews(productReviews);
      } catch (error) {
        console.error(
          `Failed to load reviews for product id ${productId}:`,
          error
        );
      }
    };

    fetchProduct();
    fetchReviews();
  }, [productId]);

  console.log(guestId);
  console.log(user);
  const handleAddToCart = async () => {
    try {
      await updateQuantity(product.id, quantity);
      alert("Product added to cart");
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      alert("Failed to add product to cart");
    }
  };

  const handleReviewSubmit = async () => {
    try {
      const finalReviewForm = {
        ...reviewForm,
        guestName: reviewForm.isAnonymous ? "Anonymous" : reviewForm.guestName,
      };

      await addReview(user ? user.id : guestId, productId, finalReviewForm);
      alert("Review submitted!");
      setReviewForm({
        rating: 1,
        comment: "",
        guestName: user ? user.name : "",
        isAnonymous: false,
      });
      const productReviews = await getReviewsByProductId(productId);
      setReviews(productReviews);
    } catch (error) {
      console.error("Failed to submit review:", error);
      alert("Failed to submit review");
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  const renderDescriptionTable = () => {
    return (
      <table className="product-page__description-table">
        <tbody>
          {Object.entries(product.description).map(([key, value]) => (
            <tr key={key} className="product-page__description-table__row">
              <td className="product-page__description-table__cell">
                <strong>{key}</strong>
              </td>
              <td className="product-page__description-table__cell">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <div className="return-container">
        <ArrowLeft className="return-container__icon" />
        <button
          onClick={() => navigate(`/shopping`)}
          className="return-container__button"
        >
          Return
        </button>
      </div>
      <div className="product-page">
        <h2 className="product-page__title">{product.name}</h2>
        <p className="product-page__price">£{product.price}</p>
        <img
          className="product-page__image"
          src={product.imageurl}
          alt={product.name}
        />
        {renderDescriptionTable()}
        <div className="product-page__buttons">
          <button
            className="product-page__buttons-decrease"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            -
          </button>
          <span className="product-page__buttons-quantity">{quantity}</span>
          <button
            className="product-page__buttons-increase"
            onClick={() => setQuantity((q) => q + 1)}
          >
            +
          </button>
        </div>
        <button className="product-page__button-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>

        <div className="product-page__reviews">
          <h3>Customer Reviews</h3>
          <div className="product-page__reviews-scrollable">
            <ul>
              {reviews.map((review) => (
                <li key={review.id}>
                  <strong>
                    {review.isAnonymous
                      ? "Anonymous"
                      : review.guestName || "Anonymous"}
                  </strong>
                  <span>{"⭐".repeat(review.rating)}</span>
                  <p>{review.comment}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="product-page__leave-review">
          <h3>Leave a Review</h3>
          {!user && (
            <div className="product-page__leave-review-form__guest-name">
              <label>Your Name</label>
              <input
                type="text"
                value={reviewForm.guestName}
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, guestName: e.target.value })
                }
              />
            </div>
          )}
          <div className="product-page__leave-review-form__rating">
            <label>Rating</label>
            <select
              value={reviewForm.rating}
              onChange={(e) =>
                setReviewForm({
                  ...reviewForm,
                  rating: parseInt(e.target.value),
                })
              }
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star} Star{star > 1 && "s"}
                </option>
              ))}
            </select>
          </div>
          <div className="product-page__leave-review-form__comment">
            <label>Comment</label>
            <textarea
              value={reviewForm.comment}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, comment: e.target.value })
              }
            />
          </div>
          {!user && (
            <div className="product-page__leave-review-form__anonymous">
              <label>
                <input
                  type="checkbox"
                  checked={reviewForm.isAnonymous}
                  onChange={(e) =>
                    setReviewForm({
                      ...reviewForm,
                      isAnonymous: e.target.checked,
                    })
                  }
                />
                Leave review anonymously
              </label>
            </div>
          )}
          <button
            className="product-page__leave-review-form__submit"
            onClick={handleReviewSubmit}
          >
            Submit Review
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
