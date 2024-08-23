import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductById,
  updateProduct,
} from "../../../hooks/Products/ProductService";
import "./EditProduct.scss";
import AdminSidebar from "../../AdministratorSidebar/AdministratorSidebar";

const EditProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    productGroup: "",
    imageurl: "",
    description: [], // Initialize description as an array of key-value pairs
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);

        // Convert the description object back to an array of key-value pairs
        const descriptionArray = Object.entries(data.description).map(
          ([key, value]) => ({
            key,
            value,
          })
        );

        setProduct({ ...data, description: descriptionArray });
      } catch (err) {
        setError("Failed to fetch product data");
      }
    };
    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleDescriptionChange = (index, keyOrValue, newValue) => {
    const newDescription = [...product.description];
    newDescription[index] = {
      ...newDescription[index],
      [keyOrValue]: newValue,
    };
    setProduct({ ...product, description: newDescription });
  };

  const addDescriptionField = () => {
    setProduct({
      ...product,
      description: [...product.description, { key: "", value: "" }],
    });
  };

  const removeDescriptionField = (index) => {
    const newDescription = product.description.filter((_, i) => i !== index);
    setProduct({ ...product, description: newDescription });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const descriptionObject = product.description.reduce((acc, curr) => {
      const { key, value } = curr;
      if (key) {
        acc[key] = value;
      }
      return acc;
    }, {});

    const finalProduct = { ...product, description: descriptionObject };

    try {
      await updateProduct(id, finalProduct);
      navigate("/admin/products");
    } catch (err) {
      setError("Failed to update product");
    }
  };

  return (
    <>
      <AdminSidebar />
      <div className="edit-product">
        <h2 className="edit-product__title">Edit Product</h2>
        {error && <p className="edit-product__error">{error}</p>}
        <form className="edit-product__form" onSubmit={handleSubmit}>
          <div className="edit-product__form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="edit-product__form-group">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="edit-product__form-group">
            <label>Stock:</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="edit-product__form-group">
            <label>Product Group:</label>
            <input
              type="text"
              name="productGroup"
              value={product.productGroup}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="edit-product__form-group">
            <label>Image URL:</label>
            <input
              type="text"
              name="imageurl"
              value={product.imageurl}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="edit-product__form-group">
            <h3>Description</h3>
            {product.description.map((desc, index) => (
              <div
                key={index}
                className="edit-product__form-group--description"
              >
                <input
                  type="text"
                  placeholder="Key"
                  value={desc.key}
                  onChange={(e) =>
                    handleDescriptionChange(index, "key", e.target.value)
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={desc.value}
                  onChange={(e) =>
                    handleDescriptionChange(index, "value", e.target.value)
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => removeDescriptionField(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="edit-product__form__add-description-button"
              onClick={addDescriptionField}
            >
              Add Description Field
            </button>
          </div>
          <button className="edit-product__form__submit-button" type="submit">
            Update Product
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProduct;
