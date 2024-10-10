import PropTypes from "prop-types";

const SliderItem = ({ imageSrc }) => {
  return (
    <div className="slider-item fade">
      <div className="slider-image">
        <img src={imageSrc} className="img-fluid" alt="" />
      </div>
      <div className="container">
        <p className="slider-title">Sonbahar İndirimleri ile</p>
        {/* <h2 className="slider-heading">Sonbahar İndirimleri ile</h2> */}
        <h2 className="slider-heading">Büyük Tasarruf Et</h2>
        <a href="#" className="btn btn-lg btn-primary">
          Hemen Başlayın
        </a>
      </div>
    </div>
  );
};

export default SliderItem;

SliderItem.propTypes = {
  imageSrc: PropTypes.string,
};
