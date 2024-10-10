import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartProvider";
import { useContext, useEffect } from "react";

const SuccessPage = () => {
  const { setCartItems } = useContext(CartContext);

  useEffect(() => {
    setCartItems([]);
  }, [setCartItems]);

  return (
    <div className="success-page">
      <div className="container">
        <Result
          status="success"
          title="Ödeme Başarıyla Tamamlandı"
          subTitle="Sipariş kargoya verildiğinde tarafımızca bilgilendirileceksiniz"
          extra={[
            <Link to={"/"} key="home">
              <Button type="primary">Anasayfa</Button>
            </Link>,
            <Button key="buy">Siparişlerim</Button>,
          ]}
        />
      </div>
    </div>
  );
};

export default SuccessPage;
