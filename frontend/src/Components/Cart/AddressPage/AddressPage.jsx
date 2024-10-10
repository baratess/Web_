import { useState, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CartContext } from "../../../Context/CartProvider";
import { message, Form, Input, Button } from "antd";
import "./AddressPage.css";

const AddressPage = () => {
  const { cartItems, subTotals } = useContext(CartContext);
  const stripePublicKey = import.meta.env.VITE_API_STRIPE_PUBLIC_KEY;
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const user = localStorage.getItem("user");
  const [form] = Form.useForm();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const fetchUserAddress = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/users`);

      if (!res.ok) {
        return message.error("Kullanıcı bilgileri alınırken bir hata oluştu.");
      }
      const data = await res.json();

      const mainUser = data.find((info) => info._id === user);

      form.setFieldsValue({
        address: mainUser.address,
        phonenumber: mainUser.phonenumber,
      });

      message.success("Kayıtlı adres başarıyla getirildi.");
    } catch (error) {
      console.error("Adres getirme hatası:", error);
      message.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const handleSubmit = async (values) => {
    try {
      const res = await fetch(`${apiUrl}/api/users/${user}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        return message.error("Adres bilgileri güncellenirken bir hata oluştu.");
      }
      const data = await res.json();

      message.success("Adres bilgileri başarıyla kaydedildi.");

      setIsButtonDisabled(false);
      form.setFieldsValue({
        address: data.address,
        phonenumber: data.phonenumber,
      });
    } catch (error) {
      console.error("Güncelleme hatası:", error);
      message.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const handlePayment = async () => {
    try {
      const stripe = await loadStripe(stripePublicKey);

      const body = {
        products: cartItems,
        user: user,
        cargoFee: 15,
      };

      const res = await fetch(`${apiUrl}/api/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        return message.error("Ödeme işlemi başarısız oldu.");
      }

      const session = await res.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error("Ödeme hatası:", error);
      message.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="address-checkout-page">
      <div className="address-checkout-container">
        <div className="address-right-section">
          <h2>İletişim Bilgileri</h2>
          <br />
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            className="address-form"
          >
            <Form.Item name={"address"} label="Adres Bilgileriniz">
              <Input.TextArea rows={6} maxLength={1000} />
            </Form.Item>
            <Form.Item
              name={"phonenumber"}
              label="Telefon Numarası"
              rules={[{ required: true, message: "Telefon Numarası gerekli!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name={"note"} label="Notunuz">
              <Input.TextArea rows={4} maxLength={1000} />
            </Form.Item>
            <Form.Item
              style={{
                display: "flex",
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                className="address-submit-button"
                style={{ marginRight: "170px" }}
              >
                Adresinizi Onaylayın
              </Button>

              <Button
                type="primary"
                className="address-submit-button"
                style={{ color: "white", backgroundColor: "brown" }}
                onClick={fetchUserAddress}
              >
                Kayıtlı Adresimi Kullan
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="address-left-section">
          <h2>Sepetiniz</h2>
          <div className="address-cart-items">
            {cartItems.map((item, index) => (
              <div className="address-cart-item" key={index}>
                <img
                  src={item.img && item.img[0] ? item.img[0] : "#"}
                  alt={item.name}
                />
                <div className="item-details">
                  <p className="item-name">{item.name}</p>
                  <p className="item-price">₺{item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="address-cart-summary">
            <p>
              <strong>Toplam:</strong> {subTotals.toFixed(2)}
            </p>
            <Button
              className="address-checkout-button"
              onClick={handlePayment}
              disabled={isButtonDisabled}
            >
              Ödeme Yap
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
