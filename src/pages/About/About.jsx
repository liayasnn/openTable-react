import React from "react";
import Landing from "../../components/Landing/Landing";
import Section from "../../components/Section/Section";
import sectionImage1 from "../../assets/images/background.png";
import sectionImage2 from "../../assets/images/memory.png";
import sectionImage3 from "../../assets/images/workshop.png";
import sectionImage4 from "../../assets/images/opentable.png";
import sectionImage5 from "../../assets/images/credit-img.png";
import icon1 from "../../assets/images/background-title-icon.png";
import icon2 from "../../assets/images/appoarch-title-icon.png";
import icon3 from "../../assets/images/achieve-title-icon.png";
import icon4 from "../../assets/images/reflection-title-icon.png";
import icon5 from "../../assets/images/credit-title-icon.png";
import dataAbout from "../../assets/data/about/aboutData.json";
import Hero from "../../components/Hero/Hero";
import heroData from "../../assets/data/about/heroData.json";
const About = () => {
  return (
    <>
      <Landing />
      <Hero text={heroData[0]} />
      <Section
        isLeft={false}
        image={sectionImage1}
        icon={icon1}
        data={dataAbout[0]}
      />
      <Section
        isLeft={true}
        image={sectionImage2}
        icon={icon2}
        data={dataAbout[1]}
      />
      <Section
        isLeft={false}
        image={sectionImage3}
        icon={icon3}
        data={dataAbout[2]}
      />
      <Section
        isLeft={true}
        image={sectionImage4}
        icon={icon4}
        data={dataAbout[3]}
      />
      <Section
        isLeft={false}
        image={sectionImage5}
        icon={icon5}
        data={dataAbout[4]}
      />
    </>
  );
};

export default About;
