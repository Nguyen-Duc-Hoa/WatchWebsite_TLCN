import React from "react";
import { Button } from "antd";
import "./GalleryCard.scss";

function Gallery({ heading, image, text, btnText, className }) {
  return (
    <div className={`gallery__card ${className}`}>
      <div className="gallery__text">
        <div>{heading}</div>
        <p>{text}</p>
        <Button type="primary" style={{ height: "50px" }}>
          {btnText}
        </Button>
      </div>
      <img src={image} alt="" />
    </div>
  );
}

export default Gallery;
