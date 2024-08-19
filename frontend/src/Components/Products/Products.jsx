import { useState } from "react";
import ProductItem from "./ProductItem";
import ProductsData from "../../data.json";
import Slider from "react-slick";
import "./Products.css";

const Products = () => {
  const [product] = useState(ProductsData);

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplaySpeed: 2500,
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
          <h2>Featured Products</h2>
          <p>Summer Collection New Morden Design</p>
        </div>
        <div className="product-wrapper product-carousel">
          <Slider {...sliderSettings}>
            {product.map((product) => (
              <ProductItem product={product} key={product.id} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Products;
