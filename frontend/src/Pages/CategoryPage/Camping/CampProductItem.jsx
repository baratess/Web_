import PropTypes from "prop-types";
import { useContext } from "react";
import { CartContext } from "../../../Context/CartProvider";
import { Link } from "react-router-dom";

const CampProductItem = ({ productItem }) => {
  const { cartItems, addToCart } = useContext(CartContext);

  const filteredCart = cartItems.find(
    (cartItem) => cartItem._id === productItem._id
  );

  const originalPrice = productItem.price.current;
  const discountPercentage = productItem.price.discount;

  const discountedPrice =
    originalPrice - (originalPrice * discountPercentage) / 100;

  return (
    <div className="product-item glide__slide glide__slide--active">
      <div className="product-image">
        <Link to={`/product/${productItem._id}`}>
          <img
            src={productItem.img[0]}
            alt={productItem.name}
            className="img1"
          />
        </Link>
      </div>
      <div className="product-info">
        <Link to={`/product/${productItem._id}`} className="product-title">
          {productItem.name}
        </Link>
        <div className="product-prices">
          <strong className="new-price">${discountedPrice.toFixed(2)}</strong>
          <span className="old-price">${originalPrice.toFixed(2)}</span>
        </div>
        <span className="product-discount">-{productItem.price.discount}%</span>
        <div className="product-links">
          <button
            className="add-to-cart"
            onClick={() =>
              addToCart({
                ...productItem,
                price: discountedPrice,
              })
            }
            disabled={filteredCart}
          >
            <i className="bi bi-basket-fill"></i>
          </button>

          <Link to={`product/${productItem._id}`} className="product-link">
            <i className="bi bi-eye-fill"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CampProductItem;

CampProductItem.propTypes = {
  productItem: PropTypes.object,
  setCartItems: PropTypes.func,
};
