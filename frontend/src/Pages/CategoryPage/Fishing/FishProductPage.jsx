import { useEffect, useState } from "react";
import { message } from "antd";
import "./FishProductPage.css";
import FishProductItem from "./FishProductItem";

const FishProductPage = () => {
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
              <label htmlFor="elektronik">Misinalar</label>
            </li>
            <li>
              <input type="checkbox" id="moda" />{" "}
              <label htmlFor="moda">Balık Oltaları</label>
            </li>
            <li>
              <input type="checkbox" id="ev3" />{" "}
              <label htmlFor="ev3">Olta Makaraları</label>
            </li>
            <li>
              <input type="checkbox" id="ev" />{" "}
              <label htmlFor="ev">Balık Yemleri</label>
            </li>
            <li>
              <input type="checkbox" id="ev2" />{" "}
              <label htmlFor="ev2">Balık Çantaları</label>
            </li>
          </ul>
        </div>
      </aside>

      <section className="fishpage-products">
        <div className="fishpage-container">
          <div className="fishpage-product-wrapper fishpage-product-carousel">
            {products.map((product) => {
              if (product.category.includes("66c862bf6a57cf086cd0d579"))
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

export default FishProductPage;
