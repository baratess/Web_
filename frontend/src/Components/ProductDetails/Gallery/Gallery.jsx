import { useState } from "react";
import ProductsData from "../../../data.json";
import Slider from "react-slick";
import PropTypes from "prop-types";
import "./Gallery.css";

function PrevBtn({ onClick }) {
  return (
    <button
      className="glide__arrow glide__arrow--left"
      data-glide-dir="<"
      onClick={onClick}
      style={{
        zIndex: "2",
      }}
    >
      <i className="bi bi-chevron-left"></i>
    </button>
  );
}

function NextBtn({ onClick }) {
  return (
    <button
      className="glide__arrow glide__arrow--right"
      data-glide-dir=">"
      onClick={onClick}
      style={{
        zIndex: "2",
      }}
    >
      <i className="bi bi-chevron-right"></i>
    </button>
  );
}

NextBtn.propTypes = {
  onClick: PropTypes.func,
};

PrevBtn.propTypes = {
  onClick: PropTypes.func,
};

const Gallery = () => {
  const [activeImg, setActiveImg] = useState(ProductsData[0].img.thumbs[0]);

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
  };

  return (
    <div className="product-gallery">
      <div className="single-image-wrapper">
        <img src={`/${activeImg}`} id="single-image" alt="" />
      </div>
      <div className="product-thumb">
        <Slider {...sliderSettings}>
          {ProductsData[0].img.thumbs.map((itemImg, index) => (
            <div
              className="glide__slide"
              key={index}
              onClick={() => setActiveImg(itemImg)}
            >
              <img
                src={`/${itemImg}`}
                alt=""
                className={`img-fluid ${itemImg === activeImg ? "active" : ""}`}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Gallery;
