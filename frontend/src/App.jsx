import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ShopPage from "./Pages/ShopPage";
import BlogPage from "./Pages/BlogPage";
import ContactPage from "./Pages/ContactPage";
import CartPage from "./Pages/CartPage";
import AuthPage from "./Pages/AuthPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import BlogDetailsPage from "./Pages/BlogDetailsPage";
import { AuthProvider } from "./Components/Auth/AuthContext";
import AdminUserPage from "./Pages/Admin/AdminUserPage";
import AdminCategoryPage from "./Pages/Admin/Categories/AdminCategoryPage";
import "./App.css";
import AdminUpdateCategoryPage from "./Pages/Admin/Categories/AdminUpdateCategoryPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/blog-details/:id" element={<BlogDetailsPage />} />
        <Route path="/admin/*">
          <Route path="users" element={<AdminUserPage />} />
          <Route path="categories" element={<AdminCategoryPage />} />
          <Route
            path="categories/update/:id"
            element={<AdminUpdateCategoryPage />}
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
