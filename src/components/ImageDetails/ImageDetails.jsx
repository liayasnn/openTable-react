import React from "react";
import "./ImageDetails.scss";

const ImageDetails = ({ image, text }) => {
  return (
    <div className="details-images">
      <img src={image} alt="" className="details-images__image" />
      <h2 className="details-images__title">{text}</h2>
    </div>
  );
};

export default ImageDetails;
