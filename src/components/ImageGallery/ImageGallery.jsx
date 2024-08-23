import React, { useState } from "react";
import ImageDetails from "../ImageDetails/ImageDetails";
import egg from "../../assets/images/egg.png";
import "./ImageGallery.scss";
import airplane from "../../assets/images/airplane.png";
import watermelon from "../../assets/images/watermelon.png";
import salo from "../../assets/images/salo.png";
import borsch from "../../assets/images/borsch.png";
import pancake from "../../assets/images/pancake.png";

const images = [
  {
    id: 1,
    src: egg,
    text: "I really like eating pomegranates, but I also find them really annoying to eat because they’re so much trouble. When my dad is home, he peels the pomegranate and puts the seeds in a bowl for me. I’ve been waiting for him to come back home. ",
  },
  {
    id: 2,
    src: airplane,
    text: "I hope this paper airplane can fly far, far away— all the way to Beijing, to Shanghai, and carry my words to them ",
  },
  {
    id: 3,
    src: watermelon,
    text: "We have a watermelon field on our farm, and my parents say that the watermelons are always the sweetest when it’s time for them to come home and see me",
  },
  {
    id: 4,
    src: salo,
    text: "Braised pork belly is my mom's specialty, but it always tastes different when my grandma makes it. Next time my mom comes back, I’ll eat it slowly, savoring the flavor so I can remember it",
  },
  {
    id: 5,
    src: borsch,
    text: "I drew a big chicken drumstick, but it's a very special one. My mom stuffs the drumstick with cooked sticky rice, and it tastes even better than the ones in restaurants. I miss my mom",
  },
  {
    id: 6,
    src: pancake,
    text: "During the Mid-Autumn Festival, my parents come home, and we make mooncakes together. It takes us the whole day to finish making them, but I really enjoy the time spent with my mom and dad. ",
  },
];

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const showDetails = (image) => {
    setSelectedImage(image);
  };

  const hideDetails = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="image-gallery">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.src}
            alt=""
            onClick={() => showDetails(image)}
            className="gallery-image"
          />
        ))}
      </div>

      {selectedImage && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-button" onClick={hideDetails}>
              Close
            </button>
            <ImageDetails image={selectedImage.src} text={selectedImage.text} />
          </div>
        </div>
      )}
    </>
  );
};
export default ImageGallery;
