import React from "react";
import ImageGallery from "../ImageGallery/ImageGallery";
import "./Item.scss";
const Item = ({ title, subtitle, image1, image2, imageGallery }) => {
  return (
    <section className="item">
      <h2 className="item__title">{title}</h2>
      {subtitle && <h3 className="item__subtitle">{subtitle}</h3>}
      {image1 && <img src={image1} alt="food-group" className="item__image" />}
      {imageGallery && <ImageGallery />}
      {image2 && (
        <img src={image2} alt="background-cilinder" className="item__image2" />
      )}
    </section>
  );
};

export default Item;
