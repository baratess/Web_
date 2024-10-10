import { useState } from "react";
import "./Footer.css";

const Footer = () => {
  const password = import.meta.env.VITE_EMAIL_SECRET_PASSWORD;
  const toEmail = import.meta.env.VITE_EMAIL_SECRET_TO;
  const fromEmail = import.meta.env.VITE_EMAIL_SECRET_FROM;

  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if (!formData.email) {
      alert("Lütfen tüm alanları doldurunuz.");
      return;
    }

    window.Email.send({
      Host: "smtp.elasticemail.com",
      Username: toEmail,
      Password: password,
      To: toEmail,
      From: fromEmail,
      Subject: "İndirim Kuponu",
      Body: `
        E-posta: ${formData.email} <br/> 
        Mesaj: Sizden bir indirim kuponu istiyorum.
      `,
      Port: 2525,
    })
      .then(() => alert("Mesajınız gönderildi!"))
      .catch((error) => console.error("Mail gönderimi başarısız oldu:", error));
  };

  return (
    <footer className="footer">
      <div className="subscribe-row">
        <div className="container">
          <div className="footer-row-wrapper">
            <div className="footer-subscribe-wrapper">
              <div className="footer-subscribe">
                <div className="footer-subscribe-top">
                  <h3 className="subscribe-title">
                    Kampayalarımızdan yararlanmak için e-posta adresiniz ile
                    abone olun.
                  </h3>
                  <p className="subscribe-desc">
                    1000 TL ve üzeri alışverişlerinizde 100 TL indirim kuponu
                    hediye edelim!
                  </p>
                </div>
                <div className="footer-subscribe-bottom">
                  <form className="" onSubmit={handleSubmit}>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Lütfen E-mail Adresinizi Giriniz"
                      required
                    />
                    <button type="submit" className="btn">
                      Abone Ol
                    </button>
                  </form>
                  <p className="privacy-text">
                    Yukarıdan sitemize abone olduğunuzda{" "}
                    <a href="#">
                      GİZLİLİK VE ÇEREZ POLİTİKAMIZI kabul etmiş olursunuz.
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="footer-contact-wrapper">
              <div className="footer-contact-top">
                <h3 className="contact-title">
                  Yardıma mı ihtiyacın var ?
                  <br />
                  (+90) 544 768 41 00
                </h3>
                <p className="contact-desc">
                  08.00 ile 17.00 arasında hizmet göstermekteyiz.
                </p>
              </div>
              <div className="footer-contact-bottom">
                <div className="download-app">
                  <a href="#">
                    <img src="/img/footer/app-store.png" alt="" />
                  </a>
                  <a href="#">
                    <img src="/img/footer/google-play.png" alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="widgets-row">
        <div className="container">
          <div className="footer-widgets">
            <div className="brand-info">
              <div className="footer-logo">
                <a href="index.html" className="logo">
                  LOGO
                </a>
              </div>
              <div className="footer-desc">
                <p>
                  {" "}
                  Doğa spor malzemelerini nen ucuz ve en kalitelilerinin
                  bulunduğu sitemize hoşgeldiniz!
                </p>
              </div>
              <div className="footer-contact">
                <p>
                  <a href="tel:555 555 55 55">(+90) 544 768 41 00</a> –{" "}
                  <a href="mailto:info@example.com">lejyoner@outlook.com</a>
                </p>
              </div>
            </div>
            <div className="widget-nav-menu">
              <h4>Hakkımızda</h4>
              <ul className="menu-list">
                <li>
                  <a href="#">Hakkımızda</a>
                </li>
                <li>
                  <a href="#">Gizlilik Politikamız</a>
                </li>
                <li>
                  <a href="#">İade Politikamız</a>
                </li>
                <li>
                  <a href="#">Satış Politikamız</a>
                </li>
              </ul>
            </div>

            <div className="widget-nav-menu">
              <h4>Mağaza</h4>
              <ul className="menu-list">
                <li>
                  <a href="#">En Çok Satanlar</a>
                </li>
                <li>
                  <a href="#">İndirimli Ürünler</a>
                </li>
                <li>
                  <a href="#">Son Eklenenler</a>
                </li>
              </ul>
            </div>
            <div className="widget-nav-menu">
              <h4>Kategoriler</h4>
              <ul className="menu-list">
                <li>
                  <a href="#">Kamp Malzemeleri</a>
                </li>
                <li>
                  <a href="#">Balıkçılık</a>
                </li>
                <li>
                  <a href="#">Doğa Sporları</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-row">
        <div className="container">
          <div className="footer-copyright">
            <div className="site-copyright">
              <p>
                CreatedBy 2024 © E-Commerce Theme. All right reserved. Powered
                by <strong>BA.shop</strong>
              </p>
            </div>
            <a href="#">
              <img src="/img/footer/cards.png" alt="" />
            </a>
            <div className="footer-menu">
              <ul className="footer-menu-list">
                <li className="list-item">
                  <a href="#">Gizlilik Politikamız</a>
                </li>
                <li className="list-item">
                  <a href="#">Şartlarımız ve Kurallarımız</a>
                </li>
                <li className="list-item">
                  <a href="#">İade Politikamız</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
