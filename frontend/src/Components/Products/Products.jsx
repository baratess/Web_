import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import Slider from "react-slick";
import PropTypes from "prop-types";
import "./Products.css";
import { message } from "antd";

function NextBtn({ onClick }) {
  return (
    <button className="glide__arrow glide__arrow--right" onClick={onClick}>
      <i className="bi bi-chevron-right"></i>
    </button>
  );
}

NextBtn.propTypes = {
  onClick: PropTypes.func,
};

function PrevBtn({ onClick }) {
  return (
    <button className="glide__arrow glide__arrow--left" onClick={onClick}>
      <i className="bi bi-chevron-left"></i>
    </button>
  );
}

PrevBtn.propTypes = {
  onClick: PropTypes.func,
};

const Products = () => {
  const [products, setProducts] = useState([]);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/products`);

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
    fetchProducts();
  }, [apiUrl]);

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    autoplay: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="products">
      <div className="container">
        <div className="section-title">
          <h2 style={{ marginTop: "40px" }}>Balıkçılık Ürünleri</h2>
        </div>
        <div className="product-wrapper product-carousel">
          <Slider {...sliderSettings}>
            {products.map((product) => {
              if (product.category === "66c862bf6a57cf086cd0d579") {
                return <ProductItem productItem={product} key={product._id} />;
              }
            })}
          </Slider>
        </div>
        <div className="section-title">
          <h2 style={{ marginTop: "40px" }}>Kampçılık Ürünleri</h2>
        </div>
        <div
          className="product-wrapper product-carousel"
          style={{ marginTop: "50px" }}
        >
          <Slider {...sliderSettings}>
            {products.map((product) => {
              if (product.category === "66dc1378e8bc2d4ad1040c32") {
                return <ProductItem productItem={product} key={product._id} />;
              }
            })}
          </Slider>
        </div>
        <div className="section-title">
          <h2 style={{ marginTop: "40px" }}>Doğa Spor Ürünleri</h2>
        </div>
        <div
          className="product-wrapper product-carousel"
          style={{ marginTop: "50px" }}
        >
          <Slider {...sliderSettings}>
            {products.map((product) => {
              if (product.category === "66e067d91aa4fcfcbaf922d7") {
                return <ProductItem productItem={product} key={product._id} />;
              }
            })}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Products;
