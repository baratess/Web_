import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartProvider";
import { Link } from "react-router-dom";
import { message } from "antd";
import PropTypes from "prop-types";

const CartTotals = () => {
  const [fastCargoChecked, setFastCargoChecked] = useState(false);
  const { cartItems, setSubTotals } = useContext(CartContext);
  // const [loading, setLoading] = useState(false);
  const user = localStorage.getItem("user");
  // ? user = true)
  // : null;

  const cartItemTotals = cartItems.map((item) => {
    const itemTotal = item.price * item.quantity;

    return itemTotal;
  });

  const subTotals = cartItemTotals.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  }, 0);
  setSubTotals(subTotals);

  const cargoFee = 15;

  const cartTotals = fastCargoChecked
    ? (subTotals + cargoFee).toFixed(2)
    : subTotals.toFixed(2);

  const handleDirect = async () => {
    // setLoading(true);
    if (!user) {
      return message.info("Ödeme yapabilmek için giriş yapmalısınız!");
    }

    // finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="cart-totals">
      <h2>Cart totals</h2>
      <table>
        <tbody>
          <tr className="cart-subtotal">
            <th>Subtotal</th>
            <td>
              <span id="subtotal">${subTotals.toFixed(2)}</span>
            </td>
          </tr>
          <tr>
            <th>Shipping</th>
            <td>
              <ul>
                <li>
                  <label>
                    Fast Cargo: $15.00
                    <input
                      type="checkbox"
                      id="fast-cargo"
                      checked={fastCargoChecked}
                      onChange={() => setFastCargoChecked(!fastCargoChecked)}
                    />
                  </label>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>Total</th>
            <td>
              <strong id="cart-total">${cartTotals}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="checkout">
        <Link
          className="btn btn-lg"
          onClick={handleDirect}
          to={"/cart/address"}
          style={{
            backgroundColor: "red",
            borderRadius: "0.2rem",
            display: "flex",
            marginTop: "20px",
          }}
        >
          <i
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "0 44px",
            }}
          >
            Adres Bilgileri
          </i>
        </Link>
      </div>
    </div>
  );
};

export default CartTotals;

CartTotals.propTypes = {
  setSubTotals: PropTypes.func,
};
