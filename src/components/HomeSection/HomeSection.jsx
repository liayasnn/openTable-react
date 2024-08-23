import React, { useState, useEffect, useRef } from "react";
import "./HomeSection.scss";
import Item from "../Item/Item";
import table from "../../assets/images/table.png";
import foodPattern from "../../assets/images/foodpattern.png";
import foodGroup from "../../assets/images/foodgroup.png";
import groupPic from "../../assets/images/gpic1.png";
const HomeSection = () => {
  const sectionsRef = useRef([]);
  const [visibleItem, setVisibleItem] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItem(sectionsRef.current.indexOf(entry.target));
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  return (
    <div className="homeSection">
      <div
        className={`itemSection ${visibleItem === 0 ? "" : "hidden"}`}
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <Item
          title="Food as memory, memory as food"
          subtitle="Where every purchase paints a better future"
          image1={foodPattern}
          image2={table}
        />
      </div>
      <div
        className={`itemSection ${visibleItem === 1 ? "" : "hidden"}`}
        ref={(el) => (sectionsRef.current[1] = el)}
      >
        <Item
          title="We bring future on the table through painting"
          image1={foodGroup}
          image2={table}
        />
      </div>
      <div
        className={`itemSection ${visibleItem === 2 ? "" : "hidden"}`}
        ref={(el) => (sectionsRef.current[2] = el)}
      >
        <Item
          title="And shed light on children's challenges through insight"
          image1={groupPic}
          image2={table}
        />
      </div>
      <div
        className={`itemSection ${visibleItem === 3 ? "" : "hidden"}`}
        ref={(el) => (sectionsRef.current[3] = el)}
      >
        <Item
          title="By triggering memories with food we showcase the resilience of left-behind children, from the children's perspective."
          imageGallery={true}
          image2={table}
        />
      </div>
    </div>
  );
};

export default HomeSection;
