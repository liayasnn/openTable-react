import React from "react";
import "./Landing.scss";
import background from "../../assets/images/foodpattern.png";

const Landing = () => {
  return (
    <div className="landing">
      <div className="landing__background">
        <img
          src={background}
          alt="background-image"
          className="landing__background-image"
        />
      </div>

      <h2 className="landing__title landing__title--text1">About</h2>
      <h2 className="landing__title landing__title--text2">The</h2>
      <h2 className="landing__title landing__title--text3">OpenTable</h2>
    </div>
  );
};

export default Landing;
