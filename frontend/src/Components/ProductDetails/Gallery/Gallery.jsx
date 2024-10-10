import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "./Gallery.css";

function PrevBtn({ onClick }) {
  return (
    <button className="slick-prev" onClick={onClick}>
      <i className="bi bi-chevron-left"></i>
    </button>
  );
}

function NextBtn({ onClick }) {
  return (
    <button className="slick-next" onClick={onClick}>
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

const Gallery = ({ singleProduct }) => {
  const [activeImg, setActiveImg] = useState({
    img: "",
    imgIndex: 0,
  });

  useEffect(() => {
    if (singleProduct.img && singleProduct.img.length > 0) {
      setActiveImg({ img: singleProduct.img[0], imgIndex: 0 });
    }
  }, [singleProduct.img]);
  // console.log(singleProduct);

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
  };

  const hasImages = singleProduct.img && singleProduct.img.length > 0;

  return (
    <div className="product-gallery">
      {hasImages ? (
        <>
          <div className="single-image-wrapper">
            <img src={activeImg.img} id="single-image" alt="Active" />
          </div>
          <div className="product-thumb">
            <Slider {...sliderSettings}>
              {singleProduct.img.map((itemImg, index) => (
                <div
                  key={index}
                  className={`gallery-thumb ${
                    activeImg.imgIndex === index ? "active" : ""
                  }`}
                  onClick={() =>
                    setActiveImg({ img: itemImg, imgIndex: index })
                  }
                >
                  <img
                    src={itemImg}
                    alt={`Thumbnail ${index}`}
                    className="img-fluid"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </>
      ) : (
        <div className="no-images">
          <p>No images available</p>
        </div>
      )}
    </div>
  );
};

Gallery.propTypes = {
  singleProduct: PropTypes.shape({
    img: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Gallery;
