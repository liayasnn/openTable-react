import React from "react";
import "./Section.scss";
const Section = ({ image, isLeft, icon, data }) => {
  const classNameBody = isLeft
    ? "section__body section__body--left"
    : "section__body";
  const classNameTitle = isLeft
    ? "section__title section__title--left"
    : "section__title";
  const classNameImage = isLeft
    ? "section__image section__image--left"
    : "section__image";
  return (
    <div className="section">
      <div className="section__container">
        <div className={classNameTitle}>
          <img src={icon} alt="title-icon" className="section__title-icon" />
          <h2 className="section__title-text">{data.title}</h2>
        </div>
        <div className={classNameBody}>
          <div className="section__content">
            <h3 className="section__content-subtitle">{data.subtitle}</h3>
            <p className="section__content-paragraph">{data.paragraph}</p>
          </div>

          {image && (
            <img
              src={image}
              alt="section-background"
              className={classNameImage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Section;
