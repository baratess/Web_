import { message } from "antd";
import { useState, useContext } from "react";
import { CartContext } from "../../Context/CartProvider";
import { Link } from "react-router-dom";

const CartCoupon = () => {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupons, setAppliedCoupons] = useState([]); // Kullanılmış kupon kodlarını saklayacak liste
  const { cartItems, setCartItems } = useContext(CartContext);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const applyCoupon = async () => {
    if (couponCode.trim().length === 0) {
      return message.warning("Boş değer girilimez.");
    }

    // Kupon kodunun daha önce kullanılıp kullanılmadığını kontrol et
    if (appliedCoupons.includes(couponCode)) {
      return message.warning("Bu kupon kodu zaten kullanılmış!");
    }
    if (appliedCoupons.length === 1) {
      return message.warning("Zaten bir kupon kodu kullanılıyor");
    }

    try {
      const res = await fetch(`${apiUrl}/api/coupons/code/${couponCode}`);

      if (!res.ok) {
        return message.warning("Girdiğiniz kupon kodu yanlış!");
      }

      const data = await res.json();
      const discountPercent = data.discount;

      const updatedCartItems = cartItems.map((item) => {
        const updatePrice = item.price * (1 - discountPercent / 100);
        return { ...item, price: updatePrice };
      });

      setCartItems(updatedCartItems);

      // Kullanılmış kuponlar listesine bu kupon kodunu ekle
      setAppliedCoupons([...appliedCoupons, couponCode]);

      message.success(`${couponCode} kupon kodu başarıyla uygulandı.`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="actions-wrapper">
      <div className="coupon">
        <input
          type="text"
          className="input-text"
          placeholder="Kupon kodu"
          onChange={(e) => setCouponCode(e.target.value)}
          value={couponCode}
        />
        <button className="btn" type="button" onClick={applyCoupon}>
          Kuponu Uygula
        </button>
      </div>
      <div className="update-cart">
        <Link to={"/"}>
          <button className="btn">Alışverişe Devam Et</button>
        </Link>
      </div>
    </div>
  );
};

export default CartCoupon;
