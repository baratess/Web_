import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import CartProvider from "./Context/CartProvider.jsx";
import { Layout } from "./Layouts/Layout.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import ScrollToTop from "./Components/ScrollToTop.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ScrollToTop />
    <CartProvider>
      <Layout>
        <App />
      </Layout>
    </CartProvider>
  </BrowserRouter>
);
