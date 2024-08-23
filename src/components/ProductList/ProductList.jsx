import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllProducts } from "../../hooks/Products/ProductService";
import "./ProductList.scss";
import { useCart } from "../../hooks/ShoppingCart/CartContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productGroups, setProductGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("All");
  const { updateQuantity } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        setProducts(products);
        setFilteredProducts(products);

        const groups = [
          "All",
          ...new Set(products.map((product) => product.productGroup)),
        ];
        setProductGroups(groups);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      await updateQuantity(product.id, 1);
      alert("Product added to cart");
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      alert("Failed to add product to cart");
    }
    console.log();
  };

  const handleGroupChange = (group) => {
    setSelectedGroup(group);
    if (group === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.productGroup === group
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="product-list">
      <div className="product-list__filter">
        <label htmlFor="group-filter">Filter by Group:</label>
        <select
          id="group-filter"
          value={selectedGroup}
          onChange={(e) => handleGroupChange(e.target.value)}
        >
          {productGroups.map((group, index) => (
            <option key={index} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>

      <div className="product-list__items">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <Link to={`/shopping/${product.id}`}>
              <img
                className="product-card__image"
                src={product.imageurl}
                alt={product.name}
              />
            </Link>
            <h3 className="product-card__title">{product.name}</h3>
            <p className="product-card__price">£{product.price}</p>
            <div className="product-card__buttons">
              <button
                className="product-card__buttons--buy"
                onClick={() => handleAddToCart(product)}
              >
                Buy Now
              </button>
              <button
                className="product-card__buttons--view"
                onClick={() => navigate(`/shopping/${product.id}`)}
              >
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
