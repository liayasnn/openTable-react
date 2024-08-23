import axios from "axios";

const API_BASE_URL = "${API_BASE_URL}api/reviews";

// Get reviews by product ID
export const getReviewsByProductId = async (productId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error(
      `Failed to fetch reviews for product ID ${productId}:`,
      error
    );
    throw error;
  }
};

// Add review
export const addReview = async (userId, productId, reviewData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/${productId}`,
      reviewData,
      {
        params: {
          userId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to submit review:", error);
    throw error;
  }
};

//Delete review by ID
export const deleteReview = async (reviewId) => {
  try {
    await axios.delete(`${API_BASE_URL}/${reviewId}`);
  } catch (error) {
    console.error(`Failed to delete review with ID ${reviewId}:`, error);
    throw error;
  }
};
