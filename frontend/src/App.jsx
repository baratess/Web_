import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ShopPage from "./Pages/ShopPage";
import BlogPage from "./Pages/BlogPage";
import ContactPage from "./Pages/ContactPage";
import CartPage from "./Pages/CartPage";
import AuthPage from "./Pages/AuthPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import BlogDetailsPage from "./Pages/BlogDetailsPage";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/blog-details/:id" element={<BlogDetailsPage />} />
    </Routes>
  );
}

export default App;
