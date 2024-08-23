import React from "react";
import "./GalleryColumns.scss";
import gallery1 from "../../assets/images/gallery/gallery1.jpg";
import gallery2 from "../../assets/images/gallery/gallery2.jpg";
import gallery3 from "../../assets/images/gallery/gallery3.jpg";
import gallery4 from "../../assets/images/gallery/gallery4.jpg";
import gallery5 from "../../assets/images/gallery/gallery5.jpg";
import gallery6 from "../../assets/images/gallery/gallery6.jpg";
import gallery7 from "../../assets/images/gallery/gallery7.jpg";
import gallery8 from "../../assets/images/gallery/gallery8.jpg";
import gallery9 from "../../assets/images/gallery/gallery9.jpg";
import gallery10 from "../../assets/images/gallery/gallery10.jpg";
import gallery11 from "../../assets/images/gallery/gallery11.jpg";

const images = [
  { id: 1, src: gallery1 },
  { id: 2, src: gallery2 },
  { id: 3, src: gallery3 },
  { id: 4, src: gallery4 },
  { id: 5, src: gallery5 },
  { id: 6, src: gallery6 },
  { id: 7, src: gallery7 },
  { id: 8, src: gallery8 },
  { id: 9, src: gallery9 },
  { id: 10, src: gallery10 },
  { id: 11, src: gallery11 },
];

const ImageGallery = () => {
  const duplicatedImages = [...images, ...images]; // Duplicate the images for continuous scroll

  return (
    <div className="gallery-container">
      <div className="column left-column">
        {duplicatedImages.map((image, index) => (
          <img
            key={`left-${index}`}
            src={image.src}
            alt=""
            className="gallery-image"
          />
        ))}
      </div>
      <div className="column right-column">
        {duplicatedImages.reverse().map((image, index) => (
          <img
            key={`right-${index}`}
            src={image.src}
            alt=""
            className="gallery-image"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
