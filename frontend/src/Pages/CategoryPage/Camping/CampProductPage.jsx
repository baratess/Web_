import { useEffect, useState } from "react";
import { message } from "antd";
import "./CampProductPage.css";
import CampProductItem from "./CampProductItem";

const CampProductPage = () => {
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
  console.log(products);

  return (
    <div className="fishpage-product-page">
      {/* Sol taraftaki filtre ve arama bölümü */}
      <aside className="fishpage-sidebar">
        <div className="fishpage-filter-section">
          <h3>TÜM KATEGORİLER</h3>
          <ul>
            <li>
              <input type="checkbox" id="elektronik" />{" "}
              <label htmlFor="elektronik">Koşu Malzemeleri</label>
            </li>
            <li>
              <input type="checkbox" id="moda" />{" "}
              <label htmlFor="moda">Koşu Çantaları</label>
            </li>
            <li>
              <input type="checkbox" id="ev3" />{" "}
              <label htmlFor="ev3">Çadır</label>
            </li>
            <li>
              <input type="checkbox" id="ev" />{" "}
              <label htmlFor="ev">Işıklandırma</label>
            </li>
          </ul>
        </div>
      </aside>

      <section className="fishpage-products">
        <div className="fishpage-container">
          <div className="fishpage-product-wrapper fishpage-product-carousel">
            {products.map((product) => {
              if (product.category.includes("66dc1378e8bc2d4ad1040c32"))
                return (
                  <CampProductItem productItem={product} key={product._id} />
                );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CampProductPage;
