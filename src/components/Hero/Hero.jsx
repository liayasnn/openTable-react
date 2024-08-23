import React from "react";
import "./Hero.scss";
const Hero = ({ text }) => {
  return (
    <div className="hero">
      <h2 className="hero__content">{text.paragraph}</h2>
    </div>
  );
};
export default Hero;
