import { useState, useContext } from "react";
import Proptypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../../../Context/CartProvider";
import "./Header.css";

const Header = ({ setIsSearch }) => {
  const { cartItems } = useContext(CartContext);
  const location = useLocation();
  const [searchHide] = useState("/profile");
  const user = localStorage.getItem("user");
  const { pathname } = useLocation();

  const handleLogout = () => {
    if (window.confirm("Çıkış yapmak istediğinize emin misiniz?")) {
      localStorage.removeItem("user");
      window.location.href = "/";
    }
  };

  return (
    <header>
      {/* <div className="global-notification">
        <div className="container">
          <p>
            SUMMER SALE FOR ALL SWIM SUITS AND FREE EXPRESS INTERNATIONAL
            DELIVERY - OFF 50%!
            <a href="shop.html"> SHOP NOW</a>
          </p>
        </div>
      </div> */}
      <div className="header-row">
        <div className="container">
          <div className="header-wrapper">
            <div className="header-mobile">
              <i className="bi bi-list" id="btn-menu"></i>
            </div>
            <div className="header-left">
              <Link to={"/"} className="logo">
                LOGO
              </Link>
            </div>
            <div className="header-center" id="sidebar">
              <nav className="navigation">
                <ul className="menu-list">
                  <li className="menu-list-item megamenu-wrapper">
                    <Link
                      to={"/shop"}
                      className={`menu-link ${
                        pathname === "/shop" && "active"
                      }`}
                    >
                      Kategoriler <i className="bi bi-chevron-down"></i>
                    </Link>
                    <div className="menu-dropdown-wrapper">
                      <div className="menu-dropdown-megamenu">
                        <div
                          className="megamenu-links"
                          style={{ display: "flex", gap: "40px" }}
                        >
                          <div
                            className="megamenu-products"
                            style={{ flex: 1 }}
                          >
                            <h3
                              className="megamenu-products-title-outdoor"
                              style={{
                                color: "green",
                                borderBottom: "2px solid green",
                              }}
                            >
                              OUTDOOR
                            </h3>
                            <ul
                              className="megamenu-menu-list"
                              style={{ gap: "10px" }}
                            >
                              <li>
                                <a href="/categories/outdoor/balık_ürünleri">
                                  Balıkçılık
                                </a>
                              </li>
                              <li>
                                <a href="/categories/outdoor/kamp_malzemeleri">
                                  Kamp
                                </a>
                              </li>
                              <li>
                                <a href="/categories/outdoor/doğa_yürüyüşü">
                                  Doğa Yürüyüşü
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div
                            className="megamenu-products"
                            style={{ flex: 1 }}
                          >
                            <h3
                              className="megamenu-products-title-sports"
                              style={{
                                color: "green",
                                borderBottom: "2px solid green",
                              }}
                            >
                              SPORLAR
                            </h3>
                            <ul
                              className="megamenu-menu-list"
                              style={{ gap: "10px" }}
                            >
                              <li>
                                <a href="/categories/sports/futbol">Futbol</a>
                              </li>
                              <li>
                                <a href="/categories/sports/basketbol">
                                  Basketbol
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="megamenu-single">
                          <a href="#">
                            <img
                              src="/img/image00323.jpg"
                              alt=""
                              style={{
                                borderRadius: "0.2rem",
                                width: "450px",
                                height: "auto",
                              }}
                            />
                          </a>
                          <h3 className="megamenu-single-title">
                            DOĞAYI HİSSEDİN
                          </h3>
                          <h4 className="megamenu-single-subtitle">?????</h4>
                          <a
                            href="/"
                            className="megamenu-single-button btn btn-sm"
                          >
                            Alışverişe Dön
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                  {/* <li className="menu-list-item">
                    <Link
                      to={"/blog"}
                      className={`menu-link ${
                        pathname === "/blog" && "active"
                      }`}
                    >
                      Blog
                    </Link>
                  </li> */}
                  <li className="menu-list-item megamenu-wrapper">
                    <Link
                      to={"/project"}
                      className={`menu-link ${
                        pathname === "/project" && "active"
                      }`}
                    >
                      Projelerimiz <i className="bi bi-chevron-down"></i>
                    </Link>
                    <div className="menu-dropdown-wrapper">
                      <div className="menu-dropdown-megamenu">
                        <div
                          className="megamenu-links"
                          style={{ display: "flex", gap: "40px" }}
                        >
                          <div
                            className="megamenu-products"
                            style={{ flex: 1 }}
                          >
                            <h3
                              className="megamenu-products-title-outdoor"
                              style={{
                                color: "green",
                                borderBottom: "2px solid green",
                              }}
                            >
                              3D YAZICI İLE HAZIR BASKI PROJELERİ
                            </h3>
                            <ul
                              className="megamenu-menu-list"
                              style={{ gap: "10px" }}
                            >
                              <li>
                                <a href="/categories/outdoor/balık_ürünleri">
                                  Balıkçılık Kutuları
                                </a>
                              </li>
                              <li>
                                <a href="/categories/outdoor/kamp_malzemeleri">
                                  Figürler
                                </a>
                              </li>
                              <li>
                                <a href="/categories/outdoor/doğa_yürüyüşü">
                                  Alet Edevatlar
                                </a>
                              </li>
                              <li>
                                <a href="/categories/outdoor/doğa_yürüyüşü">
                                  Araç-Gereçler
                                </a>
                              </li>
                              <li>
                                <a href="/categories/outdoor/doğa_yürüyüşü">
                                  Hediyelik Eşyalar
                                </a>
                              </li>
                            </ul>
                          </div>
                          {/* <div
                            className="megamenu-products"
                            style={{ flex: 1 }}
                          >
                            <h3
                              className="megamenu-products-title-sports"
                              style={{
                                color: "green",
                                borderBottom: "2px solid green",
                              }}
                            >
                              SPORLAR
                            </h3>
                            <ul
                              className="megamenu-menu-list"
                              style={{ gap: "10px" }}
                            >
                              <li>
                                <a href="/categories/sports/futbol">Futbol</a>
                              </li>
                              <li>
                                <a href="/categories/sports/basketbol">
                                  Basketbol
                                </a>
                              </li>
                            </ul>
                          </div> */}
                        </div>
                        <div className="megamenu-single">
                          {/* <a href="#">
                            <img
                              src="/img/image00323.jpg"
                              alt=""
                              style={{
                                borderRadius: "0.2rem",
                                width: "450px",
                                height: "auto",
                              }}
                            />
                          </a> */}
                          {/* <h3 className="megamenu-single-title">
                            DOĞAYI HİSSEDİN
                          </h3>
                          <h4 className="megamenu-single-subtitle">?????</h4> */}
                          <h1
                            style={{
                              borderBottom: "1px solid #000",
                              marginTop: "45px",
                            }}
                          >
                            Aklınızda daha farklı fikirler mi var?{" "}
                          </h1>
                          <a
                            href="/contact"
                            className="megamenu-single-button-project btn btn-sm"
                            style={{
                              marginTop: "30px",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            Hemen bizimle iletişime geçin!
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="menu-list-item">
                    <Link
                      to={"/contact"}
                      className={`menu-link ${
                        pathname === "/contact" && "active"
                      }`}
                    >
                      İLETİŞİM
                    </Link>
                  </li>
                </ul>
              </nav>
              {/* <i className="bi-x-circle" id="close-sidebar"></i> */}
            </div>
            <div className="header-right">
              <div className="header-right-links">
                {location.pathname !== searchHide && (
                  <button
                    className="search-button"
                    onClick={() => setIsSearch(true)}
                  >
                    <i className="bi bi-search"></i>
                  </button>
                )}
                <div className="header-cart">
                  <Link to={"/cart"} className="header-cart-link">
                    <i className="bi bi-bag"></i>
                    <span className="header-cart-count">
                      {cartItems.length}
                    </span>
                  </Link>
                </div>
                <div className="header-account">
                  <i
                    className={`bi ${user ? "bi-person-circle" : "bi-person"}`}
                  ></i>
                  <div className="dropdown-content">
                    {!user ? (
                      <>
                        <Link to="/auth/login">Giriş Yap</Link>
                        <Link to="/auth/register">Kayıt Ol</Link>
                      </>
                    ) : (
                      <>
                        <Link to="/profile/user_info">Hesabım</Link>
                        <button onClick={handleLogout}>Çıkış Yap</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  setIsSearch: Proptypes.func,
};

export default Header;
