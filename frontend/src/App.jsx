import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ShopPage from "./Pages/ShopPage";
// import BlogPage from "./Pages/BlogPage";
import ContactPage from "./Pages/ContactPage";
import CartPage from "./Pages/CartPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import BlogDetailsPage from "./Pages/BlogDetailsPage";

import AdminUserPage from "./Pages/Admin/AdminUserPage";
import AdminCategoryPage from "./Pages/Admin/Categories/AdminCategoryPage";
import AdminProductPage from "./Pages/Admin/Products/AdminProductPage";
import "./App.css";
import AdminUpdateCategoryPage from "./Pages/Admin/Categories/AdminUpdateCategoryPage";
import AdminCreateCategoryPage from "./Pages/Admin/Categories/AdminCreateCategoryPage";
import AdminCreateProductPage from "./Pages/Admin/Products/AdminCreateProductPage";
import AdminUpdateProductPage from "./Pages/Admin/Products/AdminUpdateProductPage";
import AdminCouponPage from "./Pages/Admin/Coupons/AdminCouponPage";
import AdminCreateCouponPage from "./Pages/Admin/Coupons/AdminCreateCouponPage";
import AdminUpdateCouponPage from "./Pages/Admin/Coupons/AdminUpdateCouponPage";
import SuccessPage from "./Pages/SuccessPage";
import AdminOrderPage from "./Pages/Admin/AdminOrderPage";
// import AdminDashboardPage from "./Pages/Admin/AdminDashboardPage";
import PersonalInfoPage from "./Pages/Profile/PersonalInfoPage";
import CurrentOrderPage from "./Pages/Profile/CurrentOrderPage";
import OrderHistoryPage from "./Pages/Profile/OrderHistoryPage";
import PersonalInfoUpdatePage from "./Pages/Profile/PersonalInfoUpdatePage";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import AddressPage from "./Components/Cart/AddressPage/AddressPage";
import FishProductPage from "./Pages/CategoryPage/Fishing/FishProductPage";
import CampProductPage from "./Pages/CategoryPage/Camping/CampProductPage";
import HikingProductPage from "./Pages/CategoryPage/Hiking/HikingProductPage";
import FootballProductPage from "./Pages/CategoryPage/Football/FootballProductPage";
import BasketballProductPage from "./Pages/CategoryPage/Basketbol/BasketballProductPage";
import AdminSubCategoryPage from "./Pages/Admin/subCategories/AdminSubCategoryPage";
import AdminCreateSubCategoryPage from "./Pages/Admin/subCategories/AdminCreateSubCategoryPage";
// import VerifyEmail from "./Components/Auth/VerifyEmail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      {/* <Route path="/blog" element={<BlogPage />} /> */}
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/categories/*">
        <Route path="outdoor/*">
          <Route path="balık_ürünleri" element={<FishProductPage />} />
          <Route path="kamp_malzemeleri" element={<CampProductPage />} />
          <Route path="doğa_yürüyüşü" element={<HikingProductPage />} />
        </Route>
        <Route path="sports/*">
          <Route path="futbol" element={<FootballProductPage />} />
          <Route path="basketbol" element={<BasketballProductPage />} />
        </Route>
      </Route>
      <Route path="/cart/*">
        <Route index element={<CartPage />} />
        <Route path="address" element={<AddressPage />} />
      </Route>
      <Route path="/auth/*">
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* <Route path="verify" element={<VerifyEmail />} /> */}
      </Route>
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/blog-details/:id" element={<BlogDetailsPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/profile/*">
        <Route path="user_info" element={<PersonalInfoPage />} />
        <Route path="current_order" element={<CurrentOrderPage />} />
        <Route path="history_order" element={<OrderHistoryPage />} />
        <Route path="info_update" element={<PersonalInfoUpdatePage />} />
      </Route>
      <Route path="/admin/*">
        {/* <Route index element={<AdminDashboardPage />} /> */}
        <Route index element={<AdminUserPage />} />
        <Route path="categories" element={<AdminCategoryPage />} />
        <Route
          path="categories/update/:id"
          element={<AdminUpdateCategoryPage />}
        />
        <Route path="categories/create" element={<AdminCreateCategoryPage />} />
        <Route path="subcategories" element={<AdminSubCategoryPage />} />
        <Route
          path="subcategories/create"
          element={<AdminCreateSubCategoryPage />}
        />
        <Route path="products" element={<AdminProductPage />} />
        <Route path="products/create" element={<AdminCreateProductPage />} />
        <Route
          path="products/update/:id"
          element={<AdminUpdateProductPage />}
        />
        <Route path="coupons" element={<AdminCouponPage />} />
        <Route path="coupons/create" element={<AdminCreateCouponPage />} />
        <Route path="coupons/update/:id" element={<AdminUpdateCouponPage />} />
        <Route path="orders" element={<AdminOrderPage />} />
      </Route>
    </Routes>
  );
}

export default App;
