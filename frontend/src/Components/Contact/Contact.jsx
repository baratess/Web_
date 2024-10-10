import { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const password = import.meta.env.VITE_EMAIL_SECRET_PASSWORD;
  const toEmail = import.meta.env.VITE_EMAIL_SECRET_TO;
  const fromEmail = import.meta.env.VITE_EMAIL_SECRET_FROM;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
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

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      alert("Lütfen tüm alanları doldurunuz.");
      return;
    }

    window.Email.send({
      Host: "smtp.elasticemail.com",
      Username: toEmail,
      Password: password,
      To: toEmail,
      From: fromEmail,
      Subject: formData.subject,
      Body: `
        İsim: ${formData.name} <br/>
        E-posta: ${formData.email} <br/> 
        Konu: ${formData.subject} <br/>
        Mesaj: ${formData.message}
      `,
      Port: 2525,
    })
      .then(() => alert("Mesajınız gönderildi!"))
      .catch((error) => console.error("Mail gönderimi başarısız oldu:", error));
  };

  return (
    <section className="contact">
      <div className="contact-top">
        <div className="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23926.423865294117!2d27.916938684049217!3d41.44349640545222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b4d56071472883%3A0xc59c53bd8e58bd64!2zU2FyYXksIFRla2lyZGHEnywgVMO8cmtpeWU!5e0!3m2!1str!2svi!4v1726142399126!5m2!1str!2svi"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className="contact-bottom">
        <div className="container">
          <div className="contact-titles">
            <h4>İLETİŞİM</h4>
            <h2>Bizimle iletişime geçin</h2>
            <p>
              7/24 bizimle iletişime geçebilirsiniz. En hızlı ve en doğru
              şekilde size ulaşmamız için aşağıdaki formları eksiksiz ve detaylı
              şekilde doldurunuz.
            </p>
          </div>
          <div className="contact-elements">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="">
                <label>
                  İsminiz
                  <span>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="">
                <label>
                  E-mail Adresiniz
                  <span>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="">
                <label>
                  Konu
                  <span>*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="">
                <label>
                  Mesaj
                  <span>*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-sm form-button">
                Mesajı Gönder
              </button>
            </form>
            <div className="contact-info">
              <div className="contact-info-item">
                <div className="contact-info-texts">
                  <strong> BA.com </strong>
                  <p className="contact-street">
                    Yeni Mahalle Değirmen Sokak
                    <br />
                    Saray, Tekirdağ
                  </p>
                  <a href="tel:Phone: +1 1234 567 88">
                    Phone: +90 544 768 41 00
                  </a>
                  <a href="mailto:lhejyoner@gmail.com">
                    Email: lhejyoner@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
