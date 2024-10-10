import PropTypes from "prop-types";
import "./Info.css";
import { message } from "antd";
import { useContext, useRef, useState, useEffect } from "react";
import { CartContext } from "../../../Context/CartProvider";

const Info = ({ singleProduct }) => {
  const [products, setProducts] = useState("null");
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const quantityRef = useRef();

  const { addToCart, cartItems } = useContext(CartContext);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const originalPrice = singleProduct.price.current;
  const discountPercentage = singleProduct.price.discount;

  const discountedPrice =
    originalPrice - (originalPrice * discountPercentage) / 100;

  const filteredCart = cartItems.find(
    (cartItem) => cartItem._id === singleProduct._id
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/categories/${singleProduct.category}`
        );

        if (response.ok) {
          const data = await response.json();

          setProducts(data);
        } else {
          message.error("Veri getirme başarısız.");
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      }
    };
    fetchCategories();
  }, [apiUrl, singleProduct]);

  // console.log(singleProduct);

  return (
    <div className="product-info">
      <h1 className="product-title">{singleProduct.name}</h1>
      <div className="product-price">
        <s className="old-price">${originalPrice}</s>
        <strong className="new-price">${discountedPrice.toFixed(2)}</strong>
      </div>
      <div
        className="product-description"
        dangerouslySetInnerHTML={{ __html: singleProduct.description }}
      ></div>
      <form className="variations-form">
        <div className="variations">
          <div className="colors">
            <div className="colors-label">
              <span>Color</span>
            </div>
            <div className="colors-wrapper">
              {singleProduct.colors.map((color, index) => (
                <div
                  className="color-wrapper"
                  key={index}
                  onClick={() => setSelectedColor(color)}
                >
                  <label
                    style={{
                      backgroundColor: `#${color}`,
                      border:
                        selectedColor === color ? "4px solid white" : "none",
                    }}
                  >
                    <input
                      type="radio"
                      name="product-color"
                      value={color}
                      checked={selectedColor === color}
                      onChange={() => setSelectedColor(color)}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="values">
            <div className="values-label">
              <span>Size</span>
            </div>
            <div className="values-list">
              {singleProduct.sizes.map((size, index) => (
                <span
                  key={index}
                  className={selectedSize === size ? "active" : ""}
                  onClick={() => setSelectedSize(size)}
                >
                  {size.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
          <div className="cart-button">
            <input
              type="number"
              defaultValue="1"
              min="1"
              id="quantity"
              ref={quantityRef}
            />
            <button
              className="btn btn-lg btn-primary"
              id="add-to-cart"
              type="button"
              disabled={filteredCart}
              onClick={() =>
                addToCart({
                  ...singleProduct,
                  price: discountedPrice,
                  quantity: parseInt(quantityRef.current.value),
                  color: selectedColor,
                  size: selectedSize,
                })
              }
            >
              Add to cart
            </button>
          </div>
          <div className="product-extra-buttons">
            {/* Diğer butonları buraya koyarsın */}
          </div>
        </div>
      </form>
      <div className="divider"></div>
      <div className="product-meta">
        {/* stok tutmak için bunu kullan */}
        {/* <div className="product-sku">
          <span>SKU:</span>
          <strong> BE45VGRT</strong>
        </div> */}

        <div className="product-categories">
          <span>KATEGORİLER:</span>
          {products && products.name ? (
            <strong>
              <a href="#"> {products.name.toUpperCase()}</a>
            </strong>
          ) : (
            <strong>Yükleniyor...</strong>
          )}
        </div>

        <div className="product-tags">
          <span>BAŞLIKLAR:</span>
          {singleProduct &&
          singleProduct.subCategory &&
          singleProduct.subCategory.length > 0 ? (
            <div className="subcategories-list">
              <strong>
                {singleProduct.subCategory.map((subcategory, index) => (
                  <span key={index} className="subcategory-item">
                    {" "}
                    {subcategory.toUpperCase()}
                    {index < singleProduct.subCategory.length - 1 && ","}
                  </span>
                ))}
              </strong>
            </div>
          ) : (
            <strong> ŞU AN ALT BAŞLIK BULUNMAMAKTA</strong>
          )}
        </div>
      </div>
    </div>
  );
};

export default Info;

Info.propTypes = {
  singleProduct: PropTypes.object,
};
