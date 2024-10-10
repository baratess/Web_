import { useEffect, useState } from "react";
import { message } from "antd";
import "./ShopPage.css";
import FishProductItem from "./CategoryPage/Fishing/FishProductItem";

const ShopPage = () => {
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

  return (
    <div className="fishpage-product-page">
      <aside className="fishpage-sidebar">
        <div className="fishpage-filter-section">
          <h3>TÜM KATEGORİLER</h3>
          <ul>
            <li>
              <input type="checkbox" id="elektronik" />{" "}
              <label htmlFor="elektronik">Balıkçılık</label>
            </li>
            <li>
              <input type="checkbox" id="moda" />{" "}
              <label htmlFor="moda">Kamp</label>
            </li>
            <li>
              <input type="checkbox" id="ev3" />{" "}
              <label htmlFor="ev3">Doğa Yürüyüşü</label>
            </li>
            <li>
              <input type="checkbox" id="ev" />{" "}
              <label htmlFor="ev">Futbol</label>
            </li>
            <li>
              <input type="checkbox" id="ev2" />{" "}
              <label htmlFor="ev2">Basketbol</label>
            </li>
          </ul>
        </div>
      </aside>

      <section className="fishpage-products">
        <div className="fishpage-container">
          <div className="fishpage-product-wrapper fishpage-product-carousel">
            {products.map((product) => {
              return (
                <FishProductItem productItem={product} key={product._id} />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
