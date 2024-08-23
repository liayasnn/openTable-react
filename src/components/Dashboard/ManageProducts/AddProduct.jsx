import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../../hooks/Products/ProductService";
import "./AddProduct.scss";
import AdminSidebar from "../../AdministratorSidebar/AdministratorSidebar";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    productGroup: "",
    imageurl: "",
    description: [],
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

    // Transform description array into a JSON object
    const descriptionObject = product.description.reduce((acc, curr) => {
      const { key, value } = curr;
      if (key) {
        acc[key] = value;
      }
      return acc;
    }, {});

    const finalProduct = { ...product, description: descriptionObject };

    try {
      await createProduct(finalProduct);
      navigate("/admin/products");
    } catch (err) {
      setError("Failed to add product");
    }
  };

  return (
    <>
      <AdminSidebar />
      <div className="add-product">
        <h2 className="add-product__title">Add New Product</h2>
        {error && <p className="add-product__error">{error}</p>}
        <form className="add-product__form" onSubmit={handleSubmit}>
          <div className="add-product__form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="add-product__form-group">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="add-product__form-group">
            <label>Stock:</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="add-product__form-group">
            <label>Product Group:</label>
            <input
              type="text"
              name="productGroup"
              value={product.productGroup}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="add-product__form-group">
            <label>Image URL:</label>
            <input
              type="text"
              name="imageurl"
              value={product.imageurl}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="add-product__form-group">
            <h3>Description</h3>
            {product.description.map((desc, index) => (
              <div key={index} className="add-product__form-group--description">
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
              className="add-product__form__add-description-button"
              onClick={addDescriptionField}
            >
              Add Description Field
            </button>
          </div>
          <button className="add-product__form__submit-button" type="submit">
            Add Product
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
