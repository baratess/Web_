import "./Breadcrumb.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { message } from "antd";

const Breadcrumb = ({ singleProduct }) => {
  const [products, setProducts] = useState("null");
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

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

  return (
    <div className="single-topbar">
      <nav className="breadcrumb">
        <ul>
          <li>
            <a href="/">ANASAYFA</a>
          </li>
          <li>
            <a href="/shop">TÜM ÜRÜNLER</a>
          </li>
          <li>
            <a href="#">{products.name}</a>
          </li>
          <li>{singleProduct.name}</li>
        </ul>
      </nav>
    </div>
  );
};

export default Breadcrumb;

Breadcrumb.propTypes = {
  singleProduct: PropTypes.object,
};
